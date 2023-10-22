namespace game.mod.more {

    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;

    export class XujieTansuoMapView extends eui.Component {
        public map1: game.mod.more.XujieTansuoMapItem;
        public map2: game.mod.more.XujieTansuoMapItem;
        public map3: game.mod.more.XujieTansuoMapItem;
        public map4: game.mod.more.XujieTansuoMapItem;
        public map5: game.mod.more.XujieTansuoMapItem;
        public map6: game.mod.more.XujieTansuoMapItem;
        public map7: game.mod.more.XujieTansuoMapItem;
        public map8: game.mod.more.XujieTansuoMapItem;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoMapSkin";
        }

        /**
         *
         * @param selType 选中的区域
         * @param curType 当前正在探索的区域
         */
        public updateView(selType: number, curType: number): void {
            let cfgs: ZhanduiTansuoTypeConfig[] = getConfigListByName(ConfigName.ZhanduiTansuoType);
            for (let cfg of cfgs) {
                let itemData = {
                    type: cfg.type,
                    isAct: cfg.type <= curType,
                    isSel: cfg.type == selType
                } as IXujieTansuoMapItemData;
                this[`map${cfg.type}`].data = itemData;
            }
        }
    }
}