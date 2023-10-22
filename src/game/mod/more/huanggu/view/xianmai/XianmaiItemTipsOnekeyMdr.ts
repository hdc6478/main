namespace game.mod.more {

    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    //一键寻脉
    export class XianmaiItemTipsOnekeyMdr extends XianmaiItemTipsMdr {

        protected updateView(): void {
            this._view.currentState = 'notone';

            this._view.lb_title.text = getLanById(LanDef.xianmaizhengduo_tips13);
            let title = this._proxy.getSecondPopTitle(this._proxy.search_stage);
            this._view.secondPop.updateTitleStr(title);

            this._view.infoItem.updateDefaultView(this._proxy.search_stage, this._proxy.search_index);
            this.updateTime();
        }

        //点击按钮
        protected onClickBtndo(): void {
            this._proxy.c2s_xianmai_pvp_oper(XianmaiOperType.Oper4, this._proxy.search_stage, this._proxy.search_index);
            this.hide();
        }

        protected updateTime(): void {
            this.updateCoolTime();

            let leftCoolTime = this._proxy.getLeftCoolTime();
            if (leftCoolTime > 0) {
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                }
            } else {
                if (TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.removeUpdateItem(this);
                }
            }
        }
    }
}