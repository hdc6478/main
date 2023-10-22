namespace game.mod.daily {

    export class LivenessView extends eui.Component {
        public model_item: game.mod.daily.LivenessItem;
        public power: game.mod.Power;
        public lab_name: eui.Label;
        public btn_left: game.mod.Btn;
        public btn_right: game.mod.Btn;

        public lab_lv: eui.Label;
        public progressComp: ProgressBarComp;
        public lab_curAttr: eui.Label;
        public img_arrow: eui.Image;
        public lab_nextAttr: eui.Label;

        public img_box_prog1: eui.Image;
        public img_box_prog2: eui.Image;
        public lab_my_liveness: eui.Label;
        public box1: game.mod.daily.LivenessBoxItem;
        public box2: game.mod.daily.LivenessBoxItem;
        public box3: game.mod.daily.LivenessBoxItem;
        public box4: game.mod.daily.LivenessBoxItem;
        public box5: game.mod.daily.LivenessBoxItem;

        public src_task: eui.Scroller;
        public list_task: eui.List;

        public grp_icon: eui.Group;
        public reward:LivenessProgressReward;

        constructor() {
            super();
            this.skinName = "skins.daily.LivenessSkin";
        }
    }

}