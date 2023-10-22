namespace game.mod.union {


    export class UnionFirstView extends eui.Component {

        public img_bg: eui.Image;
        public head: Head;
        public lab_name: eui.Label;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.union.UnionFirstSkin";
        }
    }

}