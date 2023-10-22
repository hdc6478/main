namespace game.mod.activity {

    export class ChengshenTaskView extends eui.Component {
        public baseSurfaceItem: BaseSurfaceItem;
        public img_reward: eui.Image;
        public lab_tips: eui.Label;
        public img_draw: eui.Image;
        public btn_draw: Btn;
        public task0: ChengshenTaskItem;
        public task1: ChengshenTaskItem;
        public task2: ChengshenTaskItem;
        public lab_cnt: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.ChengshenTaskSkin";
        }
    }

}