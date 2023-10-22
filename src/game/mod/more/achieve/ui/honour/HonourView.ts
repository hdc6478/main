namespace game.mod.more {

    export class HonourView extends eui.Component {
        public list: eui.List;
        public lb_limitcnt: eui.Label;
        public head: game.mod.Head;
        public lb_date: eui.Label;
        public lb_desc: eui.Label;
        public icon: game.mod.Icon;
        public lb_taskdesc: eui.Label;
        public bar: game.mod.ProgressBarComp;
        public btn_go: game.mod.Btn;
        public img_status: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.HonourSkin";
        }
    }
}