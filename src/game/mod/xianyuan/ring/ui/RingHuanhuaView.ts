namespace game.mod.xianyuan {

    export class RingHuanhuaView extends eui.Component {
        public gr_eft: eui.Group;
        public power: game.mod.Power2;
        public nameItem: game.mod.AvatarNameSrItem;
        public starComp: game.mod.StarListView;
        public btn_up: game.mod.UpStarBtn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public specialAttr: game.mod.SpecialAttrView;
        public btn_reward: game.mod.Btn;
        public btn_huanhua: game.mod.Btn;
        public img_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.RingHuanhuaSkin";
        }
    }
}