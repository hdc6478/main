namespace game.mod.activity {


    import act_reward = msg.act_reward;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;

    export class CaiyunbangRankItem extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_num: eui.Label;
        public list_reward: eui.List;

        data: ICaiyunbangRankItemData;
        private _proxy: CaiyunbangProxy;
        private _listData: eui.ArrayCollection;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.lab_num.visible = false;
            this.list_reward.visible = true;
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = getProxy(ModName.Activity, ProxyType.Caiyunbang);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_name, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankRange = data.rankRange;
            let rankNo = rankRange[0];
            if (rankNo <= 3) {
                this.currentState = rankNo == 1 ? "first" : "default";
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + rankNo;
                this.lab_rank.text = "";
                let mate = data.teammate;
                this.lab_name.text = mate ? mate.name : getLanById(LanDef.tishi_2);
                this.lab_power.text = mate && mate.value && mate.value.toString() || '0';
            } else {
                this.currentState = "default";
                this.img_rank.visible = false;
                if (rankRange.length == 1) {
                    this.lab_rank.text = rankNo + '+';
                    this.lab_name.text = '';
                } else {
                    this.lab_rank.text = rankRange[0] + '-' + rankRange[1];
                    this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12)));
                }
                this.lab_power.text = '';
            }
            this._listData.replaceAll(data.actReward.rewards);
        }

        private onClick(): void {
            if (this.lab_name.visible && this.lab_name.text == getLanById(LanDef.tongtiange_tips12)) {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.CaiyunbangRankSection, this.data.rankRange);
            }
        }
    }

    export interface ICaiyunbangRankItemData {
        actReward: act_reward;
        teammate: teammate;
        rankRange: number[];//排名范围 [0]==[1] 则是前三，[1]==undefined为最后
    }
}