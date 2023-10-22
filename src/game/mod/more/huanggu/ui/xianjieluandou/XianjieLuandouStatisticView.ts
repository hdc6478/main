namespace game.mod.more {

    export class XianjieLuandouStatisticView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public img_type3: eui.Image;
        public img_type4: eui.Image;
        public img_type5: eui.Image;
        public list_rank: eui.List;
        public item: game.mod.more.XianjieLuandouStatisticItem;
        public list_btn: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.XianjieLuandouStatisticSkin";
        }
    }
}