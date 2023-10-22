namespace game.mod.activity {

    export class PrerogativeWritView extends eui.Component {
        public nameItem: game.mod.AvatarNameSrItem;
        public gr_eff: eui.Group;
        public list_reward: eui.List;
        public btn_do: game.mod.Btn;
        public lb_day: eui.Label;
        public list_btn: eui.List;
        public img_received: eui.Image;
        public img_desc: eui.Image;
        public img_wenan: eui.Image;
        public btnTipsBase: game.mod.BtnTipsBase;

        constructor() {
            super();
            this.skinName = "skins.activity.PrerogativeWritSkin";
        }
    }
}