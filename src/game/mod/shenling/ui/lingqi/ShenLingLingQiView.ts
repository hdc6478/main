namespace game.mod.shenling {

    export class ShenLingLingQiView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;
        public gr_eff: eui.Group;
        public power: game.mod.Power;
        public suitComp: game.mod.shenling.ShenLingLingQiSuitComp;
        public icon0: game.mod.shenling.ShenLingLingQiIcon;
        public icon1: game.mod.shenling.ShenLingLingQiIcon;
        public icon2: game.mod.shenling.ShenLingLingQiIcon;
        public btn_onekey: game.mod.Btn;
        public typeListComp: game.mod.shenling.ShenLingTypeListView;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingLingQiSkin";
        }
    }
}