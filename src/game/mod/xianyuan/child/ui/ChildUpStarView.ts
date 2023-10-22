namespace game.mod.xianyuan {

    export class ChildUpStarView extends eui.Component {
        public gr_eff: eui.Group;
        public power: game.mod.Power2;
        public nameItem: game.mod.AvatarNameSrItem;
        public godItem: game.mod.AttrGodItem;
        public skillItem0: game.mod.SkillItemRender;
        public skillItem1: game.mod.SkillItemRender;
        public skillItem2: game.mod.SkillItemRender;
        public skillItem3: game.mod.SkillItemRender;
        public list_star: game.mod.StarListView;
        public btn_up: game.mod.UpStarBtn;
        public scroller: eui.Scroller;
        public list: eui.List;
        public specialAttr: game.mod.SpecialAttrView;
        public btn_jiban: game.mod.Btn;
        public btn_huanzhuang: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildUpStarSkin";
        }
    }
}