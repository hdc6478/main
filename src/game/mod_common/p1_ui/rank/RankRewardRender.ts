namespace game.mod {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TextEvent = egret.TextEvent;

    /**
     * 带奖励的排行榜组件
     */
    export class RankRewardRender extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_num: eui.Label;
        private list_reward: eui.List;
        public lab_look: eui.Label;

        private _rewardList: ArrayCollection;
        public data: RankRewardRenderData;//排行榜数据

        constructor() {
            super();
            this.skinName = "skins.common.RankItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
            this.list_reward.visible = true;
            this.lab_num.text = "";
            this.lab_power.text = "";
            this.lab_look.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, ""));
            this.addEventListenerEx(TextEvent.LINK, this.lab_look, this.onClickRank, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankNo = data.rank;
            this.currentState = rankNo == 1 ? "first" : "default";
            if (rankNo <= 3) {
                //前三名显示图标
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + rankNo;
                this.lab_rank.text = "";
            } else {
                this.img_rank.visible = false;
                this.lab_rank.text = this.data.rankStr ? this.data.rankStr : "" + rankNo;//优先显示外部文本
            }
            this.lab_name.textFlow = TextUtil.parseHtml(data.name);

            // this.lab_power.text = data.hurtStr;

            this._rewardList.source = data.reward || [];

            //若没有奖励，hurtStr展示在右边；否则展示在中间
            if (data.reward && data.reward.length) {
                this.lab_power.text = data.hurtStr;
            } else {
                this.lab_num.text = data.hurtStr;
            }

            let lookHandler = data.lookHandler;
            this.lab_look.visible = !!lookHandler;
        }

        private onClickRank(): void {
            if (this.data && this.data.lookHandler) {
                this.data.lookHandler.exec();
            }
        }
    }
}