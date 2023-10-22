namespace game.mod.xianyuan {

    import marry_rank_info = msg.marry_rank_info;
    import LanDef = game.localization.LanDef;

    export class ShilianRankItem extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_power: eui.Label;
        public lab_num: eui.Label;
        public list_reward: eui.List;

        data: marry_rank_info;
        private _proxy: XianlvShilianProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.RankItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.XianlvShilian);
            this.lab_num.visible = false;
            this.list_reward.visible = true;
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected dataChanged(): void {
            let data = this.data;
            let rank_no = this.itemIndex + 1;//名次
            this.currentState = rank_no == 1 ? 'first' : 'default';

            let name = getLanById(LanDef.tishi_2);
            if (data && data.role_name) {
                name = data.role_name + (data.role_name_2 ? '\n' + data.role_name_2 : '');
            }
            this.lab_name.text = name;

            let score = data && data.score ? StringUtil.getHurtNumStr(data.score) : 0;
            this.lab_power.text = score + '';

            if (rank_no <= 3) {
                this.img_rank.visible = true;
                this.img_rank.source = `rank` + rank_no;
                this.lab_rank.text = '';
            } else {
                this.img_rank.visible = false;
                let lastRankNo = this._proxy.getRankShow();
                if (rank_no == lastRankNo + 1) {
                    this.lab_rank.text = lastRankNo + '+';
                    this.lab_name.text = '';
                    this.lab_power.text = '';
                } else {
                    this.lab_rank.text = rank_no + '';
                }
            }

            let rewards = this._proxy.getRankReward(rank_no);
            this._listData.source = rewards;
        }
    }
}