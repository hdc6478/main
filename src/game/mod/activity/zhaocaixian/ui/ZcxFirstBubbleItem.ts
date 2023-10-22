namespace game.mod.activity {

    export class ZcxFirstBubbleItem extends eui.Component {
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxFirstBubbleItem";
        }

        updateView(txt: string): void {
            this.lb_desc.textFlow = TextUtil.parseHtml(txt);
        }
    }
}