namespace game.mod.role {

    export class SuitStageTipsView extends eui.Component {
        public icon: game.mod.SkillItemRender;
        public lb_name: eui.Label;
        public power: game.mod.Power;
        public baseDesc0: game.mod.BaseDescItem;
        public baseDesc1: game.mod.BaseDescItem;
        public img_line: eui.Image;
        public btn_up: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.role.SuitStageTipsSkin";
        }
    }
}