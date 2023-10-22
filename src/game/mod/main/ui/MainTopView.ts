namespace game.mod.main {

    export class MainTopView extends eui.Component {
        public img_di: eui.Image;
        public expItem: game.mod.main.MainExpItem;
        public power: game.mod.Power;
        public head_icon: game.mod.Head;
        public lb_level: eui.Label;
        public item1: game.mod.TopCoinItem;
        public item2: game.mod.TopCoinItem;
        public vipIcon: game.mod.main.VipIcon;
        public btn_rank: game.mod.Btn;
        public btn_stronger: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.main.MainTopSkin";
        }
    }
}
