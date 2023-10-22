namespace game.mod.more {

    export class TimeGoddessSpeedUpView extends eui.Component {

        public secondPop: SecondPop;
        public btn_speedup: Btn;
        public lab_name: eui.Label;
        public lab_time: eui.Label;
        public icon: Icon;
        public lab_alltime: eui.Label;
        public lab_havetime: eui.Label;
        public btn_allspeedup: Btn;
        public grp_tips:eui.Group;
        public grp_all:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateSpeedUpSkin";
        }
    }

}