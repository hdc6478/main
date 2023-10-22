namespace game.mod.god {

    export class GodRoadView extends eui.Component {
        public name_item: AvatarNameItem;
        public btn_once: Btn;
        public btn_ten: Btn;
        public bar: ProgressBarComp;
        public grp_eff: eui.Group;
        public btn_left: Btn;
        public btn_reward: Btn;
        public icon: Icon;
        public cost_once: CostIcon;
        public cost_ten: CostIcon;
        public grp_desc: eui.Group;
        public lab_desc: eui.Label;
        public lab_tips: eui.Label;
        public btn_prop: Btn;
        public btn_tiandi: Btn;

        constructor() {
            super();
            this.skinName = "skins.god.GodRoadSkin";
        }
    }

}