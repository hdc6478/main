namespace game.mod.main {

    export class MainPreviewItemView extends eui.Component {

        public lab_limit: eui.Label;
        public btn_preview: Btn;

        constructor() {
            super();
            this.skinName = "skins.main.MainPreviewItemSkin";
        }
    }

}