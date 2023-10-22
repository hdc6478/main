namespace game.mod.role {

    import gem_data = msg.gem_data;
    import LanDef = game.localization.LanDef;

    export class RoleGemItem extends eui.Component {
        public nameItem: game.mod.BaseNameItem;
        public gemItem0: game.mod.BaseZhuangShiDescItem;
        public gemItem3: game.mod.BaseZhuangShiDescItem;
        public gemItem1: game.mod.BaseZhuangShiDescItem;
        public gemItem4: game.mod.BaseZhuangShiDescItem;

        private _propData: PropData;
        private _isSelf: boolean;

        constructor() {
            super();
            this.skinName = "skins.role.RoleGemItemSkin";
        }

        /**
         * 更新宝石属性
         */
        public updateView(propData: PropData, isSelf?: boolean): void {
            if (!propData) {
                return;
            }
            this._propData = propData;
            this._isSelf = isSelf;

            let gem_lv = 0;//宝石等级，所镶嵌的宝石等级相加
            let gemInfo = this.getGems();
            let map: { [type: number]: gem_data } = {};
            if (gemInfo) {
                for (let gem of gemInfo) {
                    map[gem.gem_type] = gem;
                    gem_lv += gem.index % 100;
                }
            }

            // 1-4: 白虎，玄武，青龙，朱雀
            for (let i = 1; i <= 4; i++) {
                let info = map[i];
                if (info && info.index) {
                    let propCfg = GameConfig.getPropConfigById(info.index);
                    let title = TextUtil.addColor(propCfg ? propCfg.name : '', ColorUtil.getColorByQuality2(propCfg.quality));
                    let attrStr = TextUtil.getAttrTextAdd(info.attrs, BlackColor.GREEN);
                    attrStr = attrStr.replace(/\n/g, '  ');
                    (this[`gemItem${i}`] as BaseZhuangShiDescItem).updateShow(title, attrStr);
                } else {
                    (this[`gemItem${i}`] as BaseZhuangShiDescItem).updateShow(`[${getLanById(LanDef.unset)}]`, '');
                }
            }
            this.nameItem.setTitle(getLanById(LanDef.gem_attr) + `  (${getLanById(LanDef.gem_level) + gem_lv})`);
        }

        /**宝石列表 */
        private getGems(): gem_data[] {
            if (this._isSelf) {
                let pos = this._propData.index % 10;//装备部位
                let enhanceProxy: IEnhanceProxy = getProxy(ModName.Enhance, ProxyType.Enhance);
                return enhanceProxy.getGemInfo(pos);
            }
            return this._propData.gems || [];
        }
    }
}