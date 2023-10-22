namespace game.mod.yijie {

    export class YijieBossView extends eui.Component {
        public grp_eff: eui.Group;
        public btn_goto: Btn;

        constructor() {
            super();
            this.skinName = "skins.yijie.YijieBossSkin";
        }
    }

}