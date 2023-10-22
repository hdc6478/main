namespace game.mod.activity {

    export class ZcxItem3 extends eui.Component {
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxItemSkin3";
        }

        updateView(str: string): void {
            this.lb_desc.textFlow = TextUtil.parseHtml(str);
        }
    }
}