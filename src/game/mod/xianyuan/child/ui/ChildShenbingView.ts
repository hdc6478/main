namespace game.mod.xianyuan {

    export class ChildShenbingView extends eui.Component {
        public gr_eff: eui.Group;
        public power: game.mod.Power2;
        public nameItem: game.mod.AvatarNameSrItem;
        public godItem: game.mod.AttrGodItem;
        public starComp: game.mod.StarListView;
        public btn_up: game.mod.UpStarBtn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public specialAttr: game.mod.SpecialAttrView;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildShenbingSkin";
        }
    }
}