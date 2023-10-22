namespace game.mod.more {

    import facade = base.facade;

    export class HunkaItem extends BaseRenderer {

        private img_bg: eui.Image;
        private item: HunkaScoreItem;
        private btn_gongming: Btn;
        private redPoint: eui.Image;

        public data: number;//魂卡类型
        private _proxy: GoddessRecordProxy;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_gongming, this.onClickGongming, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_bg, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let type = this.data;
            let bgStr = "hunka_" + type;
            this.img_bg.source = ResUtil.getUiPng(bgStr);
            this.btn_gongming.icon = "hunka_gongming" + type;
            let hintType = this._proxy.getHunkaHintType(type);
            this.redPoint.visible = HintMgr.getHint(hintType);
            this.btn_gongming.redPoint.visible = this._proxy.canHuankaGongmingAct(type);

            this.item.setData(type);
        }

        private onClick(): void {
            let data = this.data;
            if(!data){
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.HunkaTypeMain, data);
        }

        private onClickGongming(): void {
            let data = this.data;
            if(!data){
                return;
            }
            facade.showView(ModName.More, MoreViewType.HunkaGongming, data);
        }
    }

}