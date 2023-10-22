namespace game.mod {

    export class WndBaseView extends eui.Component {
        public img_bg: eui.Image;
        public grp_top: eui.Group;
        public lab_title: eui.Label;
        public list_menu: eui.List;
        public btn_close: Btn;
        public btn_back: Btn;
        public item1: TopCoinItem;
        public item2: TopCoinItem;
        /**特殊的道具展示*/
        public item0: TopCoinItem;

        constructor() {
            super();
            this.skinName = "skins.common.WndBaseSkin";
        }
    }

}