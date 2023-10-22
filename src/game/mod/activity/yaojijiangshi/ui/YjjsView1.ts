namespace game.mod.activity {

    export class YjjsView1 extends eui.Component {
        public bar: game.mod.ProgressBarComp;
        public barCnt0: game.mod.ProgressBarCntComp;
        public barCnt1: game.mod.ProgressBarCntComp;
        public barCnt2: game.mod.ProgressBarCntComp;
        public barCnt3: game.mod.ProgressBarCntComp;
        public lb_time: eui.Label;
        public list_day: eui.List;
        public list_item: eui.List;
        public icon0: game.mod.IconGot;
        public icon1: game.mod.IconGot;
        public icon2: game.mod.IconGot;
        public icon3: game.mod.IconGot;
        public timeItem: game.mod.TimeItem;
        public gr_font: eui.Group;
        public scroller: eui.Scroller;

        public barCntComp0: game.mod.ProgressBarCntComp2;
        public barCntComp1: game.mod.ProgressBarCntComp2;
        public barCntComp2: game.mod.ProgressBarCntComp2;
        public barCntComp3: game.mod.ProgressBarCntComp2;

        constructor() {
            super();
            this.skinName = "skins.activity.YjjsSkin1";
        }
    }
}