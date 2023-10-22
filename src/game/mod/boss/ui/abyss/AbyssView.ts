namespace game.mod.boss {

    export class AbyssView extends eui.Component {
        public lab_name: eui.Label;
        public btn_reward: Btn;
        public list_reward: eui.List;
        public btn_add: Btn;
        public timeItem: TimeItem;
        public btn_challenge: Btn;
        public nameItem: AvatarNameItem;
        public lab_tips: eui.Label;
        public costIcon:CostIcon;
        public icon:Icon;

        constructor() {
            super();
            this.skinName = "skins.boss.AbyssSkin";
        }
    }

}