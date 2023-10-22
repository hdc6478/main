namespace game.mod.shenling {

    export class ShenlingLingpoView extends eui.Component {
        public listComp: game.mod.shenling.ShenlingLingpoIconListComp;
        public power: game.mod.Power;
        public scroller: eui.Scroller;
        public list: eui.List;
        public typeListComp: game.mod.shenling.ShenLingTypeListView;
        public btn_onekey: game.mod.Btn;
        public suitBtn: game.mod.shenling.ShenlingLingpoSuitBtn;
        public gr_gain: eui.Group;
        public lb_gain: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingpoSkin";
        }
    }
}