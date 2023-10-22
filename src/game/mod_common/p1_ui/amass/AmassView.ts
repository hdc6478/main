namespace game.mod {

    export class AmassView extends eui.Component {

        public list_item: eui.List;
        public img_type: eui.Image;
        public bar: ProgressBarComp;
        public btn_up: Btn;
        public lab_goto: eui.Label;
        public list_suit: eui.List;
        public btn_last: Btn;
        public btn_next: Btn;
        public scr_type: eui.Scroller;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.consecrate.AmassSkin";
        }
    }

}