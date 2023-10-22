namespace game.mod {
    import LanDef = game.localization.LanDef;
    import jipin_attrs_data = msg.jipin_attrs_data;

    /**
     * 极品属性组件
     */
    export class BaseJipinAttrItem extends eui.Component {
        private baseNameItem: BaseNameItem;
        private list_attr: AttrListImgView;

        constructor() {
            super();
            this.skinName = "skins.common.BaseJipinAttrItemSkin";
        }

        /**
         * 更新极品属性
         * @param attr 属性
         * @param title 描述标题，默认：基础属性
         */
        public updateShow(attr: jipin_attrs_data[], title: string = getLanById(LanDef.ywl_baseAttr)): void {
            this.baseNameItem.setTitle(title);
            this.list_attr.updateAttr(this.getJiPinAttr(attr));
        }

        /**极品属性文本*/
        private getJiPinAttr(attr: jipin_attrs_data[]): IAttrItemImgData[] {
            if (!attr || !attr.length) {
                return [];
            }
            attr.sort((a, b) => b.quality - a.quality);
            let result: IAttrItemImgData[] = [];
            for (let attrItem of attr) {
                result.push(...this.getSingleJiPinAttr(attrItem));
            }
            return result;
        }

        /**单条极品属性数据，品质6才需要在属性文本前加图片标识*/
        private getSingleJiPinAttr(attr: jipin_attrs_data): IAttrItemImgData[] {
            if (!attr || !attr.jipin_attrs) {
                return [];
            }
            let rst: IAttrItemImgData[] = [];
            let keys = TextUtil.getAttrOrderKeys(attr.jipin_attrs);
            let quality = attr.quality;
            for (let key of keys) {
                let name = TextUtil.getAttrsText(key);
                let val = TextUtil.getAttrsPerCent(key, attr.jipin_attrs[key]);
                rst.push({
                        attrStr: TextUtil.addColor(`${name} +${val}`, ColorUtil.getColorByQuality2(quality)),
                        img: quality >= QualityType.GOLD ? 'star_6' : ''
                    }
                );
            }
            return rst;
        }

        /**
         * 更新装备极品文本
         * @param index 装备id
         * @param title 默认:极品属性
         */
        public updateEquipJipinDesc(index: number, title: string = getLanById(LanDef.jipinshuxing)): void {
            let equipCfg = GameConfig.getEquipmentCfg(index);
            if (!equipCfg || !equipCfg.jiping) {
                return;
            }
            let rst: IAttrItemImgData[] = [];
            for (let item of equipCfg.jiping) {
                let num = item[1];
                if (!num) {
                    continue;
                }
                for (let i = 0; i < num; i++) {
                    rst.push({
                        attrStr: TextUtil.addColor('随机一条极品属性', ColorUtil.getColorByQuality2(item[0])),
                        img: item[0] >= QualityType.GOLD ? 'star_6' : ''
                    });
                }
            }
            this.baseNameItem.setTitle(title);
            this.list_attr.updateAttr(rst);
        }
    }
}