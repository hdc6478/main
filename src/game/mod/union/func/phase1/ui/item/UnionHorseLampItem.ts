namespace game.mod.union {


    export class UnionHorseLampItem extends BaseRenderer {

        public lab: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.union.UnionHorseLampItemSkin";
        }

        setData(str: string): void {
            this.lab.textFlow = TextUtil.parseHtml(str);
        }

    }

}