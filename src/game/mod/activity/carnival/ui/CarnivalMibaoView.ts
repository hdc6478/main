namespace game.mod.activity {

    export class CarnivalMibaoView extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public img_line1: eui.Image;
        public img_line2: eui.Image;
        public img_line3: eui.Image;
        public img_line4: eui.Image;
        public img_line5: eui.Image;
        public img_line6: eui.Image;
        public img_line7: eui.Image;
        public img_line8: eui.Image;
        public item1: CarnivalMibaoRender;
        public item2: CarnivalMibaoRender;
        public item3: CarnivalMibaoRender;
        public item4: CarnivalMibaoRender;
        public item5: CarnivalMibaoRender;
        public item6: CarnivalMibaoRender;
        public item7: CarnivalMibaoRender;
        public item8: CarnivalMibaoRender;
        public item9: CarnivalMibaoRender;
        public costItem: TopCoinItem;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.CarnivalMibaoSkin";
        }
    }

}