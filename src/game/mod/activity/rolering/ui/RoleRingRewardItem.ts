namespace game.mod.activity {

    import YaodiRandomConfig = game.config.YaodiRandomConfig;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class RoleRingRewardItem extends BaseRenderer {
        public img_type: eui.Image;
        public lab_desc: eui.Label;
        public list_reward: eui.List;

        public data: YaodiRandomConfig;
        private _rewardList: ArrayCollection;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let index = cfg.index;
            this.img_type.source = "rolering_reward_type" + index;
            let weight = cfg.weight;
            if(index <= 1){
                weight = weight / 2;//显示假的概率
            }
            let weightStr = (weight / 100) + "%";
            let descStr = "(" + getLanById(LanDef.gailv_tips) + "：" + TextUtil.addColor(weightStr, WhiteColor.GREEN)  + ")";
            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);

            let rewards: number[][] = [];
            for(let i of cfg.award){
                let reward = i.slice(0,2);
                rewards.push(reward);
            }
            this._rewardList.source = rewards;
        }
    }
}
