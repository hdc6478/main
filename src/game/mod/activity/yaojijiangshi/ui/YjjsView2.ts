namespace game.mod.activity {

    export class YjjsView2 extends eui.Component {
        public btn_god: game.mod.AttrGodItem;
        public bar: game.mod.ProgressBarComp;
        public barCnt0: game.mod.ProgressBarCntComp;
        public barCnt1: game.mod.ProgressBarCntComp;
        public barCnt2: game.mod.ProgressBarCntComp;
        public icon0: game.mod.IconGot;
        public icon1: game.mod.IconGot;
        public icon2: game.mod.IconGot;
        public list: eui.List;
        public gr_eff: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.YjjsSkin2";
        }
    }
}