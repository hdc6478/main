namespace game.mod.yijie {

    export class YijieView extends eui.Component {
        public grp_eff: eui.Group;
        public list_boss: eui.List;
        public avatarNameItem: AvatarNameItem;
        public btn_gift: Btn;
        public btn_magic: Btn;
        public btn_rule: Btn;
        public btn_auction: Btn;
        public btn_demon: Btn;
        public timeItem: game.mod.TimeItem;
        public grp_good: eui.Group;
        public grp_goodCnt: eui.Group;
        public grp_cnt: eui.Group;
        public btn_reward: Btn;
        public list_reward: eui.List;
        public cost: CostIcon;
        public btn_challenge: Btn;
        public checkbox: eui.CheckBox;
        public checkBoxNvpu: game.mod.XiuxianNvpuCheckBox;

        constructor() {
            super();
            this.skinName = "skins.yijie.YijieSkin";
        }
    }

}