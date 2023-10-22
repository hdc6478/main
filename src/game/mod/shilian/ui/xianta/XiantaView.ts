namespace game.mod.shilian {

    export class XiantaView extends eui.Component {
        public grp_lv: eui.Group;
        public rankFirstItem: game.mod.RankFirstItem;
        public icon: game.mod.Icon;
        public bar: game.mod.ProgressBarComp;
        public list_reward: eui.List;
        public btn_sweep: game.mod.Btn;
        public lab_sweepCnt: eui.Label;
        public btn_challenge: game.mod.Btn;
        public list_type: eui.List;
        public grp_font: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.shilian.XiantaSkin";
        }
    }

}