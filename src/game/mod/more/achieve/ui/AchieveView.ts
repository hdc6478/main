namespace game.mod.more {

    export class AchieveView extends eui.Component {
        public grp_title: eui.Group;
        public bar: ProgressBarComp;
        public lab_lv: eui.Label;
        public icon: Icon;
        public img_draw: eui.Image;
        public list_task: eui.List;
        public btn_draw: Btn;
        public group_eft1:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.more.AchieveSkin";
        }
    }

}