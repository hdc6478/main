namespace game.mod.more {

    export class XujieJitanSpeedUpView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public grp_tips: eui.Group;
        public lab_name: eui.Label;
        public lab_time: eui.Label;
        public btn_speedup: game.mod.Btn;
        public icon: game.mod.Icon;
        public grp_all: eui.Group;
        public lab_alltime: eui.Label;
        public btn_allspeedup: game.mod.Btn;
        public lab_havetime: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.consecrate.ConsecrateSpeedUpSkin";
        }
    }
}