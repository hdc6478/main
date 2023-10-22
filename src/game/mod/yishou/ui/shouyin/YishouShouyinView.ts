namespace game.mod.yishou {

    export class YishouShouyinView extends eui.Component {
        public power: game.mod.Power;
        public nameItem: game.mod.AvatarNameSrItem;
        public btn_god: game.mod.AttrGodItem;
        public btn_upstar: game.mod.UpStarBtn;
        public btn_jiban: game.mod.Btn;
        public scroller: eui.Scroller;
        public list: eui.List;
        //public gr_eft: eui.Group;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouyinSkin";
        }
    }
}