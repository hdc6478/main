namespace game.mod.main {


    export class PowerChange extends eui.Component {
        public grp_show: eui.Group;
        public grp_cur: eui.Group;
        public grp_add: eui.Group;
        public grp_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.main.PowerChangeSkin";
        }
    }
}
