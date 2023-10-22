namespace game.mod.more {

    export class XujieJitanLingbaoView extends eui.Component {
        public list_item: eui.List;
        public img_type: eui.Image;
        public bar: game.mod.ProgressBarComp;
        public btn_up: game.mod.Btn;
        public list_suit: eui.List;
        public img_goto: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.XujieJitanLingbaoSkin";
        }
    }
}