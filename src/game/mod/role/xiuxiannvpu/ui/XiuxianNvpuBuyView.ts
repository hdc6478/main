namespace game.mod.role {

    export class XiuxianNvpuBuyView extends eui.Component {
        public btn_close: game.mod.Btn;
        public list_reward: eui.List;
        public list_desc: eui.List;
        public power: game.mod.Power;
        //public nameItem: game.mod.AvatarNameItem;
        public gr_font: eui.Group;
        public img_gotoact: eui.Image;
        public btn_buy: game.mod.Btn;
        public gr_font0: eui.Group;
        public btn_renewal0: game.mod.Btn;
        public btn_renewal1: game.mod.Btn;
        public gr_fontday: eui.Group;
        public img_goto: eui.Image;
        public gr_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuBuySkin";
        }
    }
}