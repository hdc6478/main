namespace game.mod.shenling {

    export class ShenLingUpStarView extends eui.Component {
        public power: game.mod.Power2;
        public btn_shenji: game.mod.Btn;
        public skill_normal: game.mod.ShenLingSkillIcon;
        public list_talent: eui.List;
        public scroller: eui.Scroller;
        public list: eui.List;
        public moItem: game.mod.shenling.ShenLingModelItem;
        public btn_up: game.mod.UpStarBtn;
        public starCom: game.mod.StarListView;
        public btn_god: game.mod.AttrGodItem;
        public typeListComp: game.mod.shenling.ShenLingTypeListView;
        public evolveItem: game.mod.shenling.ShenlingEvolveItem;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingUpStarSkin";
            this.touchEnabled = false;
        }
    }
}