namespace game.mod {

    /**
     * 带有属性提升值的item
     * 例子：攻击+5000     向上绿色箭头 +8000
     */
    export class AttrItemAddRender extends eui.ItemRenderer {
        public lb_cur: eui.Label;
        public img_add: eui.Image;
        public lb_add: eui.Label;

        data: IAttrItemAddData;

        constructor() {
            super();
            this.skinName = `skins.common.AttrItemAddSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.setAttr();
        }

        private setAttr(): void {
            let data = this.data;
            let name = TextUtil.getAttrsText(data.key);
            let val = TextUtil.getAttrsPerCent(data.key, data.val);
            this.lb_cur.textFlow = TextUtil.parseHtml(name + TextUtil.addColor(` +${val}`, BlackColor.GREEN));
            this.lb_add.text = `+${data.add_val}`;
            this.img_add.visible = this.lb_add.visible = data.add_val > 0; //默认0不展示提升
        }
    }

    export interface IAttrItemAddData {
        key: string;
        val: number;
        add_val: number;
    }
}