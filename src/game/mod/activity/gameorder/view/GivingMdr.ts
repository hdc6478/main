namespace game.mod.activity {


    export class GivingMdr extends GameOrderMdr {

        protected onInit(): void {
            super.onInit();
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            this._gameOrderType = this._proxy.mdrType;
            super.onShow();
        }

        protected updateView() {
            super.updateView();
        }

        // protected onUpdateView(): void {
        //     super.onUpdateView();
        //
        //     //文本值
        //     let type = this._gameOrderType;
        //     let val: number = this._proxy.getValueByType(type);
        //     let str_val: string = `${val}`;
        //     if (type == GameOrderType.XiuXian) {
        //         str_val = `${RoleUtil.getRebirthLvStrNoZhuan(val)}转`;
        //     }
        //     let str = TextUtil.parseHtml(`当前${GameOrderTypeStr[type]}：` + TextUtil.addColor(`${str_val}`, BlackColor.GREEN));
        //     this._view.lab_cur.textFlow = str;
        // }

        // protected onUpdateIndex(): void {
        //     let type = this._gameOrderType;
        //     let pos: number = this._proxy.getPosByType(type);
        //     let child: number = this._proxy.getListByType(type).length;
        //     callLater(() => {
        //         ScrollUtil.moveVToAssign(this._view.scroller, pos, 134, 200, child);
        //     }, this);
        // }
        //
        // protected clickBtnStatus3(): void {
        //     let type = this._gameOrderType;
        //     ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.GameOrderUnlock,
        //         [type, this._proxy.getReward(type), this._proxy.getRewardCanGet(type)]);
        // }
        //
        // protected onClick(): void {
        //     let type = this._gameOrderType;
        //     let status: number = this._proxy.getBtnStatus(type);
        //     switch (status) {
        //         case 1:
        //             let cfg: GameOrderTypeConfig = getConfigByNameId(ConfigName.GameOrderType, type);
        //             ViewMgr.getIns().showViewByID(cfg.jump);
        //             break;
        //         case 2:
        //             this._proxy.c2s_game_order_get_rewards(type);
        //             break;
        //         case 3:
        //             this.clickBtnStatus3();
        //             break;
        //     }
        // }
        //
        // protected onHide(): void {
        //     TimeMgr.removeUpdateItem(this);
        //     this._view.btn_unlock.clearEffect();
        //     this._view.btn.clearEffect();
        //     super.onHide();
        // }

        // update(time: base.Time): void {
        //     if (!this._endTime) {
        //         TimeMgr.removeUpdateItem(this);
        //         return;
        //     }
        //     this.onUpdateTime();
        // }
        //
        // private onUpdateTime(): void {
        //     let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
        //     this._view.lab_time.text = leftTime < 0 ? getLanById(LanDef.battle_cue29) :
        // TimeUtil.formatSecond(leftTime, "d天H时", true); }

    }
}