namespace game.mod.pass {

    import WorldmapConfig = game.config.WorldmapConfig;
    import facade = base.facade;

    export class WorldMapBtn extends BaseRenderer {

        public btn_bg: WorldMapBtnItem;
        public btn_box: game.mod.Btn;
        public grp_eff: eui.Group;

        public isCurMap: boolean;

        private _mapCfg: WorldmapConfig;

        private _hasAward: boolean;

        private _isSelect: boolean;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapBtnSkin";
        }
        
        public get mapCfg() {
            return this._mapCfg;
        }
        
        public get hasAward() {
            return this._hasAward;
        }
        
        public setData(mapCfg: WorldmapConfig) {
            this._mapCfg = mapCfg;
            let proxy: PassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            this.btn_bg.lab_idx.text = proxy.getChapterByIdx(mapCfg.index) + "";
            this.btn_bg.lab_title.text = mapCfg.name;
            this.btn_bg.lab_title.touchEnabled = false;
        }
        
        public setBox(show: boolean, hint: boolean) {
            this.btn_box.visible = show;
            this.btn_box.redPoint.visible = hint;
            this._hasAward = hint;
            this.removeEft();
            if (this.btn_box.redPoint.visible){
                this.addEftByParent(UIEftSrc.Baoxiang,this.btn_box.group_eft);
            }
        }
        
        public get isSelect(): boolean {
            return this._isSelect;
        }

        public set isSelect(value: boolean) {
            this.btn_bg.isSelect = value;
            this._isSelect = value;
        }

    }
}