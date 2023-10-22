namespace game.mod.activity {

    export class ZeroBuyMainView extends eui.Component {

        public scr: eui.Scroller;
        public list: eui.List;
        public img_next: eui.Image;
        public img_before: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.ZeroBuyMainSkin";
        }
    }

}