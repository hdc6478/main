namespace game.mod {

    /**
     * 带有属性提升值的list
     */
    export class AttrListAddView extends eui.Component {
        private list: eui.List;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.AttrListAddSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(): void {
            this.list.itemRenderer = AttrItemAddRender;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        /**
         * 更新属性，带有属性提升值
         * @param attr
         * @param next_attr
         */
        public updateShow(attr: msg.attributes, next_attr: msg.attributes): void {
            if (!attr) {
                return;
            }
            let map = {};
            let keys = TextUtil.getAttrOrderKeys(attr);
            for (let key of keys) {
                if (!map[key]) {
                    map[key] = [];
                }
                map[key].push(attr[key] || 0);
            }

            keys = TextUtil.getAttrOrderKeys(next_attr);
            for (let key of keys) {
                if (!map[key]) {
                    map[key] = [0, next_attr[key]];
                } else {
                    map[key][1] = next_attr[key];
                }
            }

            let list: IAttrItemAddData[] = [];
            for (let key in map) {
                list.push({
                    key: key,
                    val: map[key][0] || 0,
                    add_val: map[key][1] || 0
                });
            }
            this._listData.replaceAll(list);
        }
    }

}