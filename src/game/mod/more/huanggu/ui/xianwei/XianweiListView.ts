namespace game.mod.more {


    export class XianweiListView extends eui.Component {
        public secondPop: SecondPop;
        public list: eui.List;
        public list_prop: eui.List;
        public img_title: eui.Image;
        public timeItem: TimeItem;

        constructor() {
            super();
            this.skinName = "skins.more.XianweiListSkin";
        }
    }

}