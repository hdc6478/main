namespace game.mod.more {

    export class TimeGoddessEventView extends eui.Component {
        public secondPop: SecondPop;
        public img_line1: eui.Image;
        public img_line2: eui.Image;
        public img_line3: eui.Image;
        public img_line4: eui.Image;
        public img_line5: eui.Image;
        public item1: TimeGoddessEventItem;
        public item2: TimeGoddessEventItem;
        public item3: TimeGoddessEventItem;
        public item4: TimeGoddessEventItem;
        public item5: TimeGoddessEventItem;
        public item6: TimeGoddessEventItem;

        constructor() {
            super();
            this.skinName = "skins.more.TimeGoddessEventSkin";
        }
    }

}