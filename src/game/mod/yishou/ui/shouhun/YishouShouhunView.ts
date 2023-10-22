namespace game.mod.yishou {

    export class YishouShouhunView extends eui.Component {
        public iconListComp: game.mod.yishou.YishouTypeIconListComp;
        public power2: game.mod.Power2;
        public list_skill: eui.List;
        public btn_do: game.mod.Btn;
        public btn_onekey: game.mod.Btn;
        public costIcon: game.mod.CostIcon;
        public bar: game.mod.ProgressBarComp;
        public gr_lv: eui.Group;
        public lb_level: eui.Label;
        public img_icon: eui.Image;
        public img_max: eui.Image;
        public nameItem: game.mod.AvatarNameItem;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouhunSkin";
        }
    }
}