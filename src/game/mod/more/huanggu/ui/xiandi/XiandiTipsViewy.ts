namespace game.mod.more {


    export class XiandiTipsView extends eui.Component {

        public img_title: eui.Image;
        public lab_desc: eui.Label;
        public head: Head;
        public closeTips:CloseTips;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiTipsSkin";
        }
    }

}