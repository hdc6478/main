namespace game.mod {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class BasePreviewRewardItem extends BaseRenderer {
        public img_type: eui.Image;
        public lab_desc: eui.Label;
        public list_reward: eui.List;

        public data: BasePreviewRewardData;
        protected _rewardList: ArrayCollection;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
            // this.list_reward.useVirtualLayout = false;
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.onUpdateType();
            this.onUpdateDesc();
            this.onUpdateReward();
        }

        protected onUpdateType(): void {
            if(this.data.nameStr){
                this.img_type.visible = true;
                this.img_type.source = this.data.nameStr;
            }
            else {
                this.img_type.visible = false;
            }
        }

        protected onUpdateDesc(): void {
            let data: BasePreviewRewardData = this.data;
            if(data.descStr){
                this.lab_desc.textFlow = TextUtil.parseHtml(data.descStr);
                this.lab_desc.x = this.img_type.x;
            }
            else {
                this.lab_desc.x = 140;
                let weight = data.weight || 0;
                let lan: string = getLanById(LanDef.gailv_tips);
                let str: string = TextUtil.addColor(`${weight / 100}%`, WhiteColor.GREEN);
                this.lab_desc.textFlow = TextUtil.parseHtml(`(${lan}:${str})`);
            }
        }

        protected onUpdateReward(): void {
            this._rewardList.replaceAll(this.data.award.concat());
        }
    }
}
