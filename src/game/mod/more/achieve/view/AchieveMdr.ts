namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import AchievementConfig = game.config.AchievementConfig;
    import Tween = base.Tween;

    export class AchieveMdr extends EffectMdrBase {
        private _view: AchieveView = this.mark("_view", AchieveView);
        private _proxy: AchieveProxy;
        private _taskList: ArrayCollection;
        private _canDraw: boolean;
        private _canAllDraw: boolean;
        private _cfg: AchievementConfig;
        private _eftId_title: number;//特效

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Achieve);

            this._taskList = new ArrayCollection();
            this._view.list_task.itemRenderer = AchieveTaskRender;
            this._view.list_task.dataProvider = this._taskList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
            addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickIcon);
            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(MoreEvent.ON_ACHIEVE_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        //子类重写，调用setAddEft()
        protected updateAddEft(n:GameNT):void{
            let btn: game.mod.Btn = n.body;
            super.setAddEft(this._view, btn.group_eft, this._view.group_eft1);
        }

        protected onShow(): void {
            super.onShow();

            this.updateTaskList();
            this.updateView();
        }

        protected onHide(): void {
            this._cfg = null;
            this.removeTween();
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Achieve) > -1) {
                this.updateTaskList();
            }
        }

        private onInfoUpdate(): void {
            this.updateView();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.chengjiu_jifen) >= 0){
                this.updateView();
            }
        }

        private onClickDraw(): void {
            if(!this._canAllDraw){
                PromptBox.getIns().show(getLanById(LanDef.reward_tips));
                return;
            }
            TaskUtil.drawRewardByType(TaskType.Achieve);
        }

        private onClickIcon(): void {
            if(this._canDraw){
                this._proxy.c2s_achievement_get_big_rewards();
                return;
            }
            let data = this._view.icon.data;
            ViewMgr.getIns().showPropTips(data[0]);
        }

        private updateTaskList(): void {
            let tasks = TaskUtil.getTaskList(TaskType.Achieve, true, true);
            if (this._taskList.source.length > 0) {
                this._taskList.replaceAll(tasks);
            } else {
                this._taskList.source = tasks;
            }
            this._canAllDraw = false;
            for(let task of tasks){
                if(task.status == TaskStatus.Finish){
                    this._canAllDraw = true;
                    break;
                }
            }
            this._view.btn_draw.redPoint.visible = this._canAllDraw;
        }

        private updateView(): void {
            let lv = this._proxy.lv;
            let status = this._proxy.status;

            this._view.lab_lv.text = lv + getLanById(LanDef.lv);

            let cfg: AchievementConfig = getConfigByNameId(ConfigName.Achievement, lv);
            if(!cfg || !cfg.value){
                //取不到配置，取上一等级的配置
                cfg = getConfigByNameId(ConfigName.Achievement, lv - 1);
            }

            if(!this._cfg || this._cfg.order_level != cfg.order_level){
                //配置不一致时候
                let reward = cfg.rewards[0];
                let index = reward[0];
                this._view.icon.setData(reward, IconShowType.NotTips);
                this.removeEftTitle();
                this._eftId_title = this.addEftByParent(ResUtil.getTitleSrc(index), this._view.grp_title);

                this.removeTween();
                this._view.grp_title.y = 190;
                Tween.get(this._view.grp_title, {loop: true})
                    .to({y: 220}, 800)
                    .to({y: 190}, 800);
            }
            this._cfg = cfg;

            let curVal = RoleVo.ins.getValueByKey(RolePropertyKey.chengjiu_jifen);//成就积分
            let maxVal = cfg && cfg.value || 0;
            this._view.bar.show(curVal,maxVal, false, 0, false);

            let hasDraw = status == TaskStatus.Draw;
            this._canDraw = !hasDraw && curVal >= maxVal;
            this._view.icon.setHint(this._canDraw);//可领取时候
            this._view.img_draw.visible = hasDraw;
        }

        private removeTween(): void {
            Tween.remove(this._view.grp_title);
        }

        private removeEftTitle(): void {
            if (this._eftId_title) {
                this.removeEffect(this._eftId_title);
                this._eftId_title = null;
            }
        }

    }
}