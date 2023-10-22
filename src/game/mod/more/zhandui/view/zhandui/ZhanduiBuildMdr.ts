namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class ZhanduiBuildMdr extends MdrBase {
        private _view: ZhanduiBuildView = this.mark("_view", ZhanduiBuildView);
        private _proxy: ZhanduiProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_create, egret.TouchEvent.TOUCH_TAP, this.onClickCreate, this);
            addEventListener(this._view.btn_join, egret.TouchEvent.TOUCH_TAP, this.onClickJoin, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.sendButtonClick(ZhanduiOperType.Oper100);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let num = this._proxy.total_team_count;
            let str = StringUtil.substitute(getLanById(LanDef.zhandui_tips4), [TextUtil.addColor(num + '', BlackColor.GREEN)]);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
            this.onTeam();
        }

        private onClickCreate(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiCreate);
        }

        private onClickJoin(): void {
            //从聊天频道点击跳转的，只需要展示一条，此打开请求数据放到这里
            this._proxy.sendButtonClick(ZhanduiOperType.Oper3);
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.ZhanduiJoin);
        }

        private onTeam(): void {
            let team = this._proxy.haveTeam();
            if (team) {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.ZhanduiMain);
            }
        }
    }
}