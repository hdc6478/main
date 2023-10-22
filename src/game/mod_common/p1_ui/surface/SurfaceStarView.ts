namespace game.mod {

    export class SurfaceStarView extends eui.Component {
        public grp_eff: eui.Group;
        public power2: game.mod.Power2;
        public name_item: AvatarNameSrItem;
        public btn_battle: game.mod.Btn;
        public god_item: game.mod.AttrGodItem;
        public item_pill0: SurfacePillItemRender;
        public item_pill1: SurfacePillItemRender;
        public item_pill2: SurfacePillItemRender;
        public list_star: game.mod.StarListView;
        public btn_up: game.mod.UpStarBtn;
        public list_item: eui.List;
        public list_type: eui.List;
        public special_attr: game.mod.SpecialAttrView;
        public grp_skill: eui.Group;
        public item_skill: BattleSkillItemRender;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceStarSkin";
        }
    }

}