namespace game.mod.activity {

    export class ZcxView3 extends eui.Component {
        public list: eui.List;
        public btn_challenge: game.mod.Btn;
        public gr: eui.Group;
        public timeItem: game.mod.TimeItem;

        constructor() {
            super();
            this.skinName = "skins.activity.ZcxSkin3";
        }
    }
}