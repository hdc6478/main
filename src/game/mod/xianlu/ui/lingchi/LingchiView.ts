namespace game.mod.xianlu {

    export class LingchiView extends eui.Component {
        public item1: LingchiItemRender;
        public item2: LingchiItemRender;
        public item3: LingchiItemRender;
        public item4: LingchiItemRender;
        public btn_draw: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.LingchiSkin";
        }
    }

}