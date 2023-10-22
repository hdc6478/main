namespace game.mod.more {
    export class HuanjingGrowView extends eui.Component {
        public power2: game.mod.Power2;
        public name_item: game.mod.AvatarNameItem;
        public list_item: eui.List;
        public stageSkillItem: game.mod.more.HuanjingStageSkillItem;
        public img_name: eui.Image;
        public img_bg: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.HuanjingGrowSkin";
        }
    }
}