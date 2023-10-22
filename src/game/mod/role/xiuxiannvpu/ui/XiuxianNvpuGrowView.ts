namespace game.mod.role {

    export class XiuxianNvpuGrowView extends eui.Component {
        public nameItem: game.mod.AvatarNameItem;
        public lb_desc: eui.Label;
        public btn_renewal: game.mod.Btn;
        public btn_offline: game.mod.Btn;
        public btn_gift: game.mod.Btn;
        public list: eui.List;
        public btn_guaji: game.mod.Btn;
        public bar: game.mod.ProgressBarComp;
        public btn_like: game.mod.role.XiuxianNvpuLikeBtn;
        public gr_model: eui.Group;
        public gr_day: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuGrowSkin";
        }
    }
}