namespace game.mod {

    export class RankView extends eui.Component {
        public timeItem: game.mod.TimeItem;
        public img_type1: eui.Image;
        public img_type2: eui.Image;
        public img_type3: eui.Image;
        public img_myRank: eui.Image;
        public grp_eff: eui.Group;
        public list_rank: eui.List;
        public lab_rank: eui.Label;
        public lab_num: eui.Label;
        public lab_tips: eui.Label;
        public btn_god: Btn;
        public grp_eff0: eui.Group;
        public btn_lastRank: game.mod.Btn;//上一次排行榜
        public btn_rule: game.mod.Btn;
        public masterItem: UnionMasterItem;
        public img_tips: eui.Image;
        public btn_reward: Btn;//全民奖励
        public scr: eui.Scroller;

        constructor() {
            super();
            this.skinName = "skins.common.RankSkin";
            this.scr['$hasScissor'] = true; //奖励list_rank加上scroller了，所以src需设定此
        }

        /**
         * 更新 img_type3 和 img_type2 的 horizontalCenter位置。
         * img_type3 不展示，则 img_type2 展示到 img_type3 的位置
         * @param isShowType3 是否展示 img_type3，默认展示true
         */
        public updateImgTypeHorizontal(isShowType3 = true): void {
            if (isShowType3) {
                this.img_type3.visible = true;
                this.img_type2.horizontalCenter = 0;
            } else {
                this.img_type3.visible = false;
                this.img_type2.horizontalCenter = 205;
            }
        }
    }

}