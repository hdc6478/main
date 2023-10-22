namespace game.mod.more {

    export class XujieTansuoView extends eui.Component {
        public mapView: game.mod.more.XujieTansuoMapView;
        public list_reward: eui.List;
        public btn_tansuo: game.mod.Btn;
        public scroller: eui.Scroller;
        public list_area: eui.List;
        public btn_rule: game.mod.Btn;
        public btn_rank: game.mod.Btn;
        public btn_zhanlipin: game.mod.Btn;
        public btn_zhenrong: game.mod.Btn;
        public btn_yuanzheng: game.mod.Btn;
        public gr_team: eui.Group;
        public lb_desc: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoSkin";
        }
    }
}