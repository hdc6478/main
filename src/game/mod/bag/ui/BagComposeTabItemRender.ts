namespace game.mod.bag {

    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class BagComposeTabItemRender extends BaseRenderer {
        public lab_name: eui.Label;
        public redPoint: eui.Image;

        private _proxy: BagProxy;
        public data: number;//星级

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
        }

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let isProp = this.data == 0;//0星表示道具
            let nameStr = isProp ? getLanById(LanDef.cailiao) : this.data + getLanById(LanDef.soul2);
            this.lab_name.text = nameStr;
            //星级红点
            this.redPoint.visible = this._proxy.canComposeByStar(this._proxy.selTypeCfg.index, this.data);
        }
    }
}