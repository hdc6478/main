namespace game.mod.more {

    export class HuanjingCollectItemTipsView extends eui.Component {
        public gr_eft: eui.Group;
        public nameItem: game.mod.AvatarNameSrItem;
        public btn_god: game.mod.AttrGodItem;
        public power2: game.mod.Power2;
        public btn_shenji: game.mod.Btn;
        public btn_shangzhen: game.mod.Btn;
        public btn_upstar: game.mod.UpStarBtn;
        public specialAttrView: game.mod.SpecialAttrView;
        public btn_shenlingskill: game.mod.ShenLingSkillIcon;
        public starListView: game.mod.StarListView;
        public item_pill0: game.mod.SurfacePillItemRender;
        public item_pill1: game.mod.SurfacePillItemRender;
        public item_pill2: game.mod.SurfacePillItemRender;
        public item_skill0: game.mod.ShenLingSkillIcon;
        public item_skill1: game.mod.ShenLingSkillIcon;
        public item_skill2: game.mod.ShenLingSkillIcon;
        public item_skill3: game.mod.ShenLingSkillIcon;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingCollectItemTipsSkin";
        }
    }
}