namespace game.mod.more {

    export class XujieJitanHuanhuaView extends eui.Component {
        public gr_eft: eui.Group;
        public btn_upstar: game.mod.UpStarBtn;
        public btn_huanhua: game.mod.Btn;
        public lb_desc: eui.Label;
        public img_name: eui.Image;
        public nameItem: game.mod.AvatarNameItem;
        public starListView: StarListView;
        public scroller: eui.Scroller;
        public list: eui.List;
        public lb_buff: eui.Label;
        public coin: game.mod.CoinItem;

        constructor() {
            super();
            this.skinName = "skins.more.XujieJitanHuanhuaSkin";
        }
    }
}