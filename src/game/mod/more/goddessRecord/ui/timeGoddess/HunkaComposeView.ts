namespace game.mod.more {

    export class HunkaComposeView extends eui.Component {
        public item0: HunkaComposeItem;
        public item1: HunkaComposeItem;
        public item_preview: HunkaPreviewItem;
        public btn_preview: Btn;
        public btn_compose: Btn;
        public btn_oneKey: Btn;


        constructor() {
            super();
            this.skinName = "skins.more.HunkaComposeSkin";
        }
    }

}