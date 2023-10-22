namespace game.mod.main {

    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;

    export class MainTopMdr extends EffectMdrBase {
        private _view: MainTopView = this.mark("_view", MainTopView);
        private _oldPower: number;
        private _mainProxy: MainProxy;
        private _delayPower: number;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            this._view.top = 0;
            this._view.horizontalCenter = 0;

            this._mainProxy = this.retProxy(ProxyType.Main);
            this._view.img_di.source = ResUtil.getUiPng("ui_png_topBg");
            // this._view.img_exp.fillMode = egret.BitmapFillMode.REPEAT;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            addEventListener(this._view.vipIcon, TouchEvent.TOUCH_TAP, this.onClickVip);
            addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
            addEventListener(this._view.btn_stronger, TouchEvent.TOUCH_TAP, this.onClickStronger);
            addEventListener(this._view.head_icon, TouchEvent.TOUCH_TAP, this.onClickHead);

            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);//场景切换
            this.onNt(PassEvent.CHALLENGE_HANGUP_BOSS, this.updateShow, this);//挑战boss
            this.onNt(MainEvent.ON_OPEN_FUNC_UPDATE, this.onOpenFuncUpdate, this);//功能开启

            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateLv();
            this.updateCoin();
            this.updatePower();
            this.updateHead();
            this.onVipUpdate();
            this.onUpdateExp();
            this.updateShow();
            this.updateHint();
            this.updateStronger();
            this.updateRank();
        }

        private onClickVip(): void {
            ViewMgr.getIns().openVipView();
        }

        private onClickRank(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Rank, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Rank, RankViewType.NewRankMain);
        }

        private updateRank(): void {
            this._view.btn_rank.visible = ViewMgr.getIns().checkBtnShow(OpenIdx.Rank);
        }

        /**--------------------------我要变强*------------------————————————*/
        private updateStronger(): void {
            this._view.btn_stronger.visible = ViewMgr.getIns().checkBtnShow(OpenIdx.Stronger);
        }

        private onClickStronger(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Stronger, true)) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Main, MainViewType.Stronger);
        }

        /**--------------------------我要变强*------------------————————————*/

        private onClickHead(): void {
            //todo
            ViewMgr.getIns().showSecondPop(ModName.Setting, SettingViewType.SettingMain, {});
        }


        /**更新等级显示*/
        private updateLv(): void {
            this._view.lb_level.text = "【" + RoleUtil.getRebirthStr() + "】" + "Lv." + RoleVo.ins.level;
        }

        /**更新货币显示*/
        private updateCoin(): void {
            this._view.item1.setData(PropIndex.Xianyu);
            this._view.item2.setData(PropIndex.Yuanbao);
        }

        private updateHead() {
            this._view.head_icon.updateMyHead();
        }

        private onVipUpdate() {
            this._view.vipIcon.setText(RoleVo.ins.vip_lv);
        }

        /** 更新角色信息 */
        private onRoleUpdate(n: GameNT) {
            let keys: string[] = n.body;
            let key1 = PropIndexToKey[this._view.item1.index];
            if (keys.indexOf(key1) >= 0) {
                this._view.item1.updateShow(true);
            }
            let key2 = PropIndexToKey[this._view.item2.index];
            if (keys.indexOf(key2) >= 0) {
                this._view.item2.updateShow(true);
            }

            if (keys.indexOf(RolePropertyKey.level) > -1 || keys.indexOf(RolePropertyKey.reincarnate) > -1) {
                this.updateLv();
            }
            if (keys.indexOf(RolePropertyKey.showpower) > -1) {
                let power = RoleVo.ins.showpower.toNumber();
                if (power != this._oldPower) {
                    if (this._delayPower) {
                        clearDelay(this._delayPower);
                    }
                    this._delayPower = delayCall(Handler.alloc(this, this.updateShowPower), 400);
                }
            }
            if (keys.indexOf(RolePropertyKey.head) > -1 || keys.indexOf(RolePropertyKey.sex) > -1 || keys.indexOf(RolePropertyKey.head_frame) > -1) {
                this.updateHead();
            }
            if (keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                this.onVipUpdate();
            }
            if (keys.indexOf(RolePropertyKey.exp) > -1 || keys.indexOf(RolePropertyKey.levelup_exp) > -1) {
                this.onUpdateExp();
            }
        }

        /** 展示战力变化特效 */
        private updateShowPower() {
            this._delayPower = 0;
            if (this._oldPower && RoleVo.ins.showpower.toNumber() > this._oldPower) {
                this.showView(MainViewType.PowerChange, this._oldPower);
            }
            this.updatePower();
        }

        /** 更新战力 */
        private updatePower() {
            let power = RoleVo.ins.showpower ? RoleVo.ins.showpower.toNumber() : 0;
            if (power != this._oldPower) {
                this._view.power.setPowerValue(RoleVo.ins.showpower);
            }
            this._oldPower = power;
        }

        protected onHide(): void {
            this._oldPower = 0;
            super.onHide();
        }

        /**经验条*/
        private onUpdateExp() {
            this._view.expItem.updateExp();
        }

        //----------------------------------------切换场景 start----------------------------------------
        /** 切换场景 */
        private onSceneChange() {
            this.updateShow();
        }

        //----------------------------------------切换场景 end----------------------------------------
        //--------------------显示主界面-----------------------
        private updateShow(): void {
            let isShow = SceneUtil.isShowMain();
            this._view.visible = isShow;
        }

        /**更新红点*/
        private updateHint(): void {
            if (!this._view.visible) {
                return;
            }
            this._view.vipIcon.setRedPoint(HintMgr.getHint([ModName.Vip, VipViewType.VipMain]));
            this._view.btn_rank.setHint(HintMgr.getHint([ModName.Rank, RankViewType.NewRankMain]));
        }

        /**红点事件更新红点*/
        private onUpdateHint(n: GameNT): void {
            let data = n.body as IHintData;
            if (!data) {
                return;
            }
            if (data.node == HintMgr.getType([ModName.Vip, VipViewType.VipMain])) {
                this._view.vipIcon.setRedPoint(data.value);
            }
            if (data.node == HintMgr.getType([ModName.Rank, RankViewType.NewRankMain])) {
                this._view.btn_rank.setHint(data.value);
            }
        }

        /**功能开启刷新按钮*/
        private onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.Stronger) > -1) {
                this.updateStronger();
            }
            if (addIdx.indexOf(OpenIdx.Rank) > -1) {
                this.updateRank();
            }
        }
    }

}
