namespace game.mod.xianyuan {

    export class ChildView extends eui.Component {
        public power: game.mod.Power2;
        public btn_check: game.mod.Btn;
        public skillItem: game.mod.SkillItemRender;
        public list_skill: eui.List;
        public scroller: eui.Scroller;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildSkin";
        }
    }
}