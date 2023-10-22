namespace game.mod.surface {

    export class LingChongView extends eui.Component {
        public power: game.mod.Power2;
        public nameItem: game.mod.AvatarNameSrItem;
        public starCom: game.mod.StarListView;
        public special_attr: game.mod.SpecialAttrView;
        public btn_up: game.mod.UpStarBtn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_award: game.mod.surface.LingChongAwardBtn;
        public gr_eft: eui.Group;

        public gr_treasure: eui.Group;
        public btn_task: game.mod.Btn;
        public lb_desc: eui.Label;
        public btn_treasure: game.mod.surface.LingChongAwardBtn;

        constructor() {
            super();
            this.skinName = "skins.surface.LingChongSkin";
        }
    }
}