namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class XianmaiListItem extends BaseListenerRenderer {
        public lb_layer: eui.Label;
        public lb_num: eui.Label;
        public lb_earn: eui.Label;
        public btn_do: game.mod.Btn;

        data: msg.xianmai_stage_data;
        private _proxy: XianmaiProxy;

        constructor() {
            super();
            this.skinName = `skins.more.XianmaiListItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.Xianmai);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_layer.text = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips14), [data.stage]);
            this.lb_num.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips9), [data.guild_num]));
            this.lb_earn.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.xianmaizhengduo_tips10), [this._proxy.getEarnCnt(data.guild_num) + '%']));
        }

        //跳转到对应层数
        private onClick(): void {
            facade.sendNt(MoreEvent.ON_XIANMAI_LIST_VIEW_CLOSE);
            if (!this._proxy.isActTime()) {
                PromptBox.getIns().show(getLanById(LanDef.huodongzanweikaiqi));
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XianmaiMain, [MdrTabBtnType.TabBtnType01, this.data.stage - 1]);
        }
    }
}