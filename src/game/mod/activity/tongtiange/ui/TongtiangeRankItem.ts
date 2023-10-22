namespace game.mod.activity {

    import prop_tips_data = msg.prop_tips_data;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;

    export class TongtiangeRankItem extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_num: eui.Label;
        private list_reward: eui.List;

        data: ITongtiangeRankItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: TongtiangeProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Tongtiange);
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_name, this.onClick, this);

            this.lab_num.visible = false;
            this.list_reward.visible = true;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if (data.rankNo && data.rankNo <= 3) {
                //1-3名展示
                this.currentState = data.rankNo == 1 ? "first" : "default";
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + data.rankNo;
                this.lab_rank.text = "";
                let name = getLanById(LanDef.tishi_2);
                let cnt = 0;
                if (data.teammate) {
                    if (data.type == TongtiangeRankType.Personal) {
                        name = data.teammate.name;
                    } else {
                        name = StringUtil.substitute(getLanById(LanDef.tongtiange_tips11), [data.teammate.guild_name, data.teammate.name]);
                    }
                    cnt = data.teammate.value ? data.teammate.value.toNumber() : 0;
                }
                this.lab_name.textFlow = TextUtil.parseHtml(name);
                this.lab_power.text = cnt + '';
            } else {
                this.currentState = "default";
                //其余展示
                this.img_rank.visible = false;
                let rankRange = data.rankRange;
                if (rankRange && rankRange.length == 1) {
                    this.lab_rank.text = rankRange[0] + '+';
                } else if (rankRange && rankRange.length == 2) {
                    this.lab_rank.text = rankRange[0] + '-' + rankRange[1];
                }
                if (!!data.isShow) {
                    this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12)));
                } else {
                    this.lab_name.text = '';
                }
                this.lab_power.text = '';
            }

            this._listData.replaceAll(data.rewards);
        }

        //查看排名
        private onClick(): void {
            if (!!this.data.isShow) {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TongtiangeRankSection, [this.data.type, this.data.rankRange]);
            }
        }
    }

    export interface ITongtiangeRankItemData {
        rewards: prop_tips_data[];
        type: TongtiangeRankType; //1个人，2宗门
        teammate?: teammate;
        rankNo?: number;        //排名1,2,3
        rankRange?: number[];   //名次范围[4,10],[11,20],[21,]等
        isShow?: boolean;       //显示查看排名
    }
}