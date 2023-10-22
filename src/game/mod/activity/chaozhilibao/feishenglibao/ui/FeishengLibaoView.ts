namespace game.mod.activity {

    export class FeishengLibaoView extends eui.Component {
        public btn_close: game.mod.Btn;
        public btn_buy: game.mod.Btn;
        public list: eui.List;
        public nameItem: game.mod.AvatarNameSrItem;
        public gr_eft: eui.Group;
        public power: game.mod.Power;
        public img_title: eui.Image;
        public gr_font: eui.Group;
        public img_desc: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.activity.FeishengLibaoSkin";
        }
    }
}