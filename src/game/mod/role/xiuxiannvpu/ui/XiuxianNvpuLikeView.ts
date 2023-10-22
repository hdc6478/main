namespace game.mod.role {

    export class XiuxianNvpuLikeView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public nameItem: game.mod.AvatarNameItem;
        public likeBtn: game.mod.role.XiuxianNvpuLikeBtn;
        public btn_huanhua: game.mod.Btn;
        public gr_eft: eui.Group;
        public list_arrow: eui.List;
        public list_btn: eui.List;
        public scroller: eui.Scroller;
        public list_tequan: eui.List;

        constructor() {
            super();
            this.skinName = "skins.role.XiuxianNvpuLikeSkin";
        }
    }
}