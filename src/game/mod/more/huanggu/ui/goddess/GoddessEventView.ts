namespace game.mod.more {

    export class GoddessEventView extends eui.Component {
        public secondPop: SecondPop;
        public img_line1: eui.Image;
        public img_line2: eui.Image;
        public img_line3: eui.Image;
        public img_line4: eui.Image;
        public img_line5: eui.Image;
        public item1: GoddessEventItem;
        public item2: GoddessEventItem;
        public item3: GoddessEventItem;
        public item4: GoddessEventItem;
        public item5: GoddessEventItem;
        public item6: GoddessEventItem;

        constructor() {
            super();
            this.skinName = "skins.more.GoddessEventSkin";
        }
    }

}