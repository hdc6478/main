namespace game.mod.more {


    export class XiandiInfoView extends eui.Component {

public img_bg:eui.Image;

        public item1: XiandiInfoItem;
        public item2: XiandiInfoItem;
        public item3: XiandiInfoItem;

        public lab_desc: eui.Label;

        public item: XiandiXianhouItem;

        constructor() {
            super();
            this.skinName = "skins.more.XiandiInfoSkin";
        }
    }

}