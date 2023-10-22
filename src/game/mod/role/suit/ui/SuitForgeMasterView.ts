namespace game.mod.role {

    export class SuitForgeMasterView extends eui.Component {
        public power: game.mod.Power;
        public btn_up: game.mod.Btn;
        public descItem0: game.mod.BaseDescItem;
        public descItem1: game.mod.BaseDescItem;
        public lb_name: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.role.SuitForgeMasterSkin";
        }
    }
}