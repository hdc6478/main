namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class AbyssSceneMdr extends MdrBase implements UpdateItem {
        private _view: AbyssSceneView = this.mark("_view", AbyssSceneView);
        private _proxy: BossProxy;
        private _costIdx: number;
        private _endTime: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit();
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
            addEventListener(this._view.btn_team, TouchEvent.TOUCH_TAP, this.onClickTeam);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);

            this.onNt(BossEvent.ON_ABYSS_HURT_UPDATE, this.onUpdateTeam, this);
            this.onNt(BossEvent.ON_ABYSS_SCENE_UPDATE, this.updateInfo, this);
            this.onNt(SceneEvent.ON_SCENE_MAX_HURT_UPDATE, this.onUpdateHead, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.endTime;
            this.updateInfo();
            this.updateCost();
            this.onUpdateTeam();
            this.onUpdateHead();
            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickReward(): void {
            this._proxy.c2s_zhuimo_show_reward();
        }

        private onClickBoss(): void {
            ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssList);
        }

        private onClickTeam(): void {
            // if (this._proxy.my_team && this._proxy.my_team.length > 1) {
            //     ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssMyTeam);
            // } else {
            //     ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssNoTeam);
            // }
            this._proxy.c2s_zhuimo_army_ui_show(3);
        }

        private onClickAdd(): void {
            // let param:ParamConfig = GameConfig.getParamConfigById("")
            ViewMgr.getIns().showGainWaysTips(this._costIdx);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if (indexs.indexOf(this._costIdx) < 0) {
                return;
            }
            this.updateCost();
        }

        private updateInfo(): void {
            let peopleStr = "副本人数：" + TextUtil.addColor(`${this._proxy.total}`, BlackColor.GREEN);
            this._view.lab_people.textFlow = TextUtil.parseHtml(peopleStr);

            let cntStr = getLanById(LanDef.yijie_tips4) + "：" + TextUtil.addColor(`${this._proxy.memberNum}`, BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
        }

        private onUpdateTeam(): void {
            this._view.lab_hurt.text = `伤害+${this._proxy.team_add_hurt / 100}%`;
        }

        private onUpdateHead(): void {
            let info = SceneUtil.getMaxHurt();
            this._view.grp_hurt.visible = !!info;
            if (info) {
                this._view.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                this._view.lab_name.text = info.name;
            }
        }

        private updateCost(): void {
            // let cost = this._proxy.getCost();

            let index = this._proxy.zhuimo_cost[0];
            let cnt = this._proxy.zhuimo_cost[1];
            this._costIdx = index;
            this._view.cost.updateShow([index, cnt]);
        }

        update(time: base.Time): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}