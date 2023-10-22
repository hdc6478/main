namespace game.mod.more {

    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    //我的仙脉
    export class XianmaiItemTipsMineMdr extends XianmaiItemTipsMdr {

        protected updateView() {
            this._view.currentState = 'my';
            this._view.lb_title.text = getLanById(LanDef.xiuxiannvpu_tips12);
            this._view.secondPop.updateTitleStr(getLanById(LanDef.xianmaizhengduo_tips3));

            this._view.btn_do.visible = true;
            this._proxy.c2s_xianmai_my_show();
        }

        protected onUpdateMyShow() {
            let myData = this._proxy.my_data;
            if (!myData) {
                return;
            }

            let cfg = this._proxy.getStageCfg(myData.stage, myData.index);
            let cfg0 = GameConfig.getPropConfigById(cfg.score_item[0]);
            this._view.lb_mydesc0.text = cfg0.name + '：';
            this._view.lb_mynum0.text = this._proxy.penglai_score + '';
            let cfg1 = GameConfig.getPropConfigById(cfg.lingshi_item[0]);
            this._view.lb_mydesc1.text = cfg1.name + '：';
            this._view.lb_mynum1.text = this._proxy.lingshi + '';

            this._view.infoItem.updateRoleView(myData);

            if (!TimeMgr.hasUpdateItem(this)) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
        }

        protected onUpdateStageShow(): void {
            this.updateCoolTime();
        }

        //点击按钮
        protected onClickBtndo(): void {
            let myData = this._proxy.my_data;
            this._proxy.c2s_xianmai_pvp_oper(XianmaiOperType.Oper1, myData.stage, myData.index);
            this.hide();
        }

        protected updateTime() {
            this._view.infoItem.updateRoleView(this._proxy.my_data);
        }
    }
}