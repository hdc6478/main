namespace game.mod.activity {

    export class LotteryView extends eui.Component {

        public img_bg: eui.Image;
        public img_banner: eui.Image;
        public img_sel: eui.Image;
        public btn_lottery: game.mod.Btn;
        public btn_recharge: game.mod.Btn;
        public lab_cur: eui.Label;//当前战力
        public lab_tar: eui.Label;//目标战力
        public icon: game.mod.IconBigReward;
        /**概率公示 */
        public lab_tips: eui.Label;
        public grp_eff: eui.Group;

        public icon_1: game.mod.IconReward;
        public icon_2: game.mod.IconReward;
        public icon_3: game.mod.IconReward;
        public icon_4: game.mod.IconReward;
        public icon_5: game.mod.IconReward;
        public icon_6: game.mod.IconReward;
        public icon_7: game.mod.IconReward;
        public icon_8: game.mod.IconReward;
        public icon_9: game.mod.IconReward;
        public icon_10: game.mod.IconReward;
        public icon_11: game.mod.IconReward;
        public icon_12: game.mod.IconReward;
        public grp_eft: eui.Group;
        public grp_eft2: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.activity.LotterySkin";
        }
    }

}