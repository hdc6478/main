namespace game.mod.rank {

    export class RankFirstNameItem extends eui.Component {
        public lb_name: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.rank.RankFirstNameItemSkin";
        }

        public updateShow(name: string): void {
            this.lb_name.textFlow = TextUtil.parseHtml(name);
        }
    }
}