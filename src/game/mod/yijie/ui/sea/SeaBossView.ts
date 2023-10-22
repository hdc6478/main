namespace game.mod.yijie {

    export class SeaBossView extends eui.Component {
        public scr: eui.Scroller;
        public scene1: SeaBossSceneView;
        public scene2: SeaBossSceneView;
        public timeItem: TimeItem;
        public item0: SeaBossPosItem;
        public item1: SeaBossPosItem;
        public item2: SeaBossPosItem;
        public item3: SeaBossPosItem;
        public item4: SeaBossPosItem;
        public head: Head;
        public lab_name: eui.Label;
        public btn_rank: game.mod.Btn;
        public grp_gift: eui.Group;
        public lab_gift: eui.Label;
        public btn_gift: game.mod.Btn;
        public btn_ling: game.mod.Btn;
        public btn_rule: game.mod.Btn;
        public bar: game.mod.ProgressBarComp;
        public grp_eff: eui.Group;
        public grp_eff_shenling0: eui.Group;
        public grp_eff_shenling1: eui.Group;
        public grp_eff_shenling2: eui.Group;
        public grp_eff_shenling3: eui.Group;
        public btn_attack: game.mod.Btn;
        public lab_tips: eui.Label;
        public costItem: TopCoinItem;

        constructor() {
            super();
            this.skinName = "skins.yijie.SeaBossSkin";
        }
    }

}