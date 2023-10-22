namespace game.mod.daily {

    import ArrayCollection = eui.ArrayCollection;
    import AdventureMedalConfig = game.config.AdventureMedalConfig;
    import task_data = msg.task_data;
    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Point = egret.Point;
    import Pool = base.Pool;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;
    import ActiveAwardConfig = game.config.ActiveAwardConfig;
    import delayCall = base.delayCall;

    export class LivenessMdr extends EffectMdrBase implements UpdateItem {

        private _view: LivenessView = this.mark("_view", LivenessView);

        private _proxy: DailyProxy;
        private _model: DailyModel;

        private _listTaskData: ArrayCollection;
        private _medalCfgs: AdventureMedalConfig[];
        private _oldCup: number = 0;
        private _start: Point;
        private _showIdx: number;

        protected onInit(): void {
            super.onInit();

            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Daily);
            this._model = this._proxy.getModel();

            this._listTaskData = new ArrayCollection();
            this._view.list_task.itemRenderer = LivenessTaskRender;
            this._view.list_task.dataProvider = this._listTaskData;

            this._proxy.c2s_medal_info();
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(LivenessEvent.MEDAL_INFO_UPDATE, this.updateInfo, this);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(LivenessEvent.MEDAL_AWARD_UPDATE, this.updateBoxAwd, this);
            //this.onNt(LivenessEvent.MEDAL_PLAY_TWEEN, this.onPlayTween, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onLast);
            addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onNext);
            addEventListener(this._view.box1, TouchEvent.TOUCH_TAP, this.onBoxClick);
            addEventListener(this._view.box2, TouchEvent.TOUCH_TAP, this.onBoxClick);
            addEventListener(this._view.box3, TouchEvent.TOUCH_TAP, this.onBoxClick);
            addEventListener(this._view.box4, TouchEvent.TOUCH_TAP, this.onBoxClick);
            addEventListener(this._view.box5, TouchEvent.TOUCH_TAP, this.onBoxClick);
        }

        //子类重写，调用setAddEft()
        protected updateAddEft(n:GameNT):void{
            let btn: game.mod.Btn = n.body;
            super.setAddEft(this._view.reward, btn.group_eft, this._view.reward.group_eft1);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._medalCfgs) {
                this._medalCfgs = getConfigListByName(ConfigName.AdventureMedal);
            }

            this.updateInfo();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            while (this._view.grp_icon.numChildren) {
                let target: eui.Image = this._view.grp_icon.removeChildAt(0) as eui.Image;
                if (target) {
                    Tween.remove(target);
                    Pool.release(target);
                    target.parent && target.parent.removeChild(target);
                    target = null;
                }
            }
            this._showIdx = 0;
            this._view.grp_icon.visible = false;
            super.onHide();
        }

        private updateInfo(): void {
            this._view.power.setPowerValue(this._proxy.allPower);

            this._showIdx = this._model.curIndex;
            this._view.lab_lv.text = "Lv. " + (this._model.curLv ? this._model.curLv + "" : "0");
            this._view.progressComp.show(this._model.sumCup, this._model.nextCup, false);
            
            this.updateMedal();
            this.updateAttr();
            this.updateBoxAwd();
            this.updateTask();
        }

        private updateMedal(): void {
            let cfg: AdventureMedalConfig = getConfigByNameId(ConfigName.AdventureMedal, this._showIdx);
            this._view.lab_name.text = cfg ? cfg.name : "";
            
            this._view.model_item.data = {medalId: this._showIdx, curLv: this._model.curLv};
            this._view.btn_left.visible = this._showIdx > 1;
            this._view.btn_right.visible = this._showIdx < this._medalCfgs.length;
        }

        private updateAttr(): void {
            let curAttr = this._model.curAttr || this._model.nextAttr;
            this._view.lab_curAttr.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(curAttr, WhiteColor.GREEN, " "));
            if (this._model.nextAttr) {
                this._view.currentState = "default";
                this._view.lab_nextAttr.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(this._model.nextAttr, WhiteColor.GREEN, " "));
            } else {
                this._view.currentState = "maxLv";
                this._view.lab_nextAttr.text = "";
            }
        }

        private updateBoxAwd(): void {
            let cfgArr: ActiveAwardConfig[] = getConfigListByName(ConfigName.ActiveAward);
            if(!cfgArr || cfgArr.length == 0) {
                return;
            }
            
            let maxNeed = cfgArr[cfgArr.length - 1].activation;
            this._view.lab_my_liveness.text = this._model.curExp + "";
            this._view.img_box_prog2.width = 560 * this._model.curExp / maxNeed;

            for (let i: number = 0, len = cfgArr.length; i < len && i < 5; i++) {
                let rewardItem: LivenessBoxItem = this._view["box" + (i + 1)] as LivenessBoxItem;
                let cfg = cfgArr[i];
                let isGot: boolean = this._proxy.checkActRewardIsGot(cfg.index);
                rewardItem.setRewardBox(cfg, this._model.curExp, isGot);
            }

            this._view.reward.setData(this._model.curExp );
        }

        private updateTask(): void {
            let tasks: task_data[] = TaskUtil.getTaskList(TaskType.Liveness, true, true);
            this._listTaskData.replaceAll(tasks);
        }

        /** 设置奖杯数增加动画*/
        update(time: base.Time): void {
            this._oldCup++;
            if (this._oldCup >= this._model.sumCup) {
                this._oldCup = this._model.sumCup;
                TimeMgr.removeUpdateItem(this);
            }
            this._view.progressComp.show(this._oldCup, this._model.nextCup, false);
        }

        /** 升级动画*/
        private onPlayTween(n: GameNT): void {
            this._view.grp_icon.visible = true;
            TimeMgr.addUpdateItem(this, 20);
            this._start = n.body;
            this._view.globalToLocal(this._start.x, this._start.y, this._start);

            for (let i = 0, len = this._model.sumCup - this._oldCup; i < len; i++) {
                let target: eui.Image = Pool.alloc(eui.Image);
                target.source = "liveness_lvsetubiao1";
                this._view.grp_icon.addChild(target);
                this.setTween(target, i);
            }
        }

        /** 设置动画*/
        private setTween(target: eui.Image, idx: number): void {
            let firstX = this._start.x + this.randomPos();
            let firstY = this._start.y + this.randomPos();
            let num = this._model.sumCup - this._oldCup;
            target.x = firstX;
            target.y = firstY;
            Tween.get(target).to({x: this._view.progressComp.x + this._view.progressComp.width / 2, y: this._view.progressComp.y - 40 }
                , 50 * (idx + num)).exec(
                    Handler.alloc(this, () => {
                        Tween.remove(target);
                        Pool.release(target);
                        target.parent && target.parent.removeChild(target);
                        target = null;
                    }));
        }

        private randomPos(): number {
            let sign = Math.random() > 0.5 ? 1 : -1;
            return sign * Math.random() * 30;
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Liveness) == -1) {
                return;
            }
            this.updateTask();
        }

        private onLast() {
            this._showIdx--;
            if (this._showIdx <= 0) {
                this._showIdx = 1;
            }
            this.updateMedal();
        }

        private onNext() {
            this._showIdx++;
            if (!this._medalCfgs[this._showIdx]) {
                this._showIdx = this._medalCfgs.length;
            }
            this.updateMedal();
        }

        private onBoxClick(e: TouchEvent) {
            let item: LivenessBoxItem = e.currentTarget;
            let cfg = item.cfg;
            if (!cfg || item.isGot) {
                return;
            }
            if (item.isCanGet) {
                this._proxy.c2s_medal_daily_reward(cfg.index);
            } else {
                let tips = `活跃度达到${cfg.activation}可领取奖励`;
                ViewMgr.getIns().showBoxReward(tips, cfg.award);
            }
        }

    }
}