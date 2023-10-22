namespace game.mod.more {

    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import LanDef = game.localization.LanDef;

    export class XujieTansuoRankMdr extends MdrBase {
        private _view: XujieTansuoRankView = this.mark("_view", XujieTansuoRankView);
        private _proxy: XujieTansuoProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list_rank.itemRenderer = XujieTansuoRankItem;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            // let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper7);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            this.updateTopThree();
            this.updateListData();
            this.updateView();
        }

        //第几名数据
        private getRankInfo(rankNo: number): { rankNo: number, rankInfo: msg.zhandui_legion_rank_struct } {
            let info = this._proxy.getRankInfo(rankNo);
            return {rankNo, rankInfo: info};
        }

        //更新前三名
        private updateTopThree(): void {
            this._view.rankItem0.data = this.getRankInfo(1);
            this._view.rankItem1.data = this.getRankInfo(2);
            this._view.rankItem2.data = this.getRankInfo(3);
        }

        //todo
        private updateListData(): void {
            let list: IXujieTansuoRankItemData[] = [];
            //1-5
            for (let i = 1; i <= 5; i++) {
                let rankNoInfo = this._proxy.getRankInfo(i);//服务端排行数据
                let progress = rankNoInfo ? this._proxy.getRankProgressByRow(rankNoInfo.map_index, rankNoInfo.layer, rankNoInfo.row) : 0;
                list.push({
                    rank: [i, i],
                    info: rankNoInfo,
                    progress: progress
                });
            }
            //6-10
            list.push({
                rank: [6, 10],
                info: null,
                progress: null
            });
            //11-20
            list.push({
                rank: [11, 20],
                info: null,
                progress: null
            });
            //20+
            // list.push({
            //     rank: [20],
            //     info: null,
            //     progress: null
            // });
            this._listData.replaceAll(list);
        }

        private updateView(): void {
            let myRankInfo = this._proxy.my_team_rank;
            let rankNo = myRankInfo ? myRankInfo.rank_num : 0;
            let rankNoStr = getLanById(LanDef.compete_mars_16);
            if (rankNo > 0 && rankNo <= MAX_RANK_NUM) {
                rankNoStr = rankNo + '';
            } else if (rankNo > MAX_RANK_NUM) {
                rankNoStr = MAX_RANK_NUM + '+';
            }
            this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.xujietansuo_tips20), [rankNoStr]));

            let progress = myRankInfo ? this._proxy.getRankProgressByRow(myRankInfo.map_index, myRankInfo.layer, myRankInfo.row) : 0;
            let type = myRankInfo ? myRankInfo.map_index : 0;
            let cfg: ZhanduiTansuoTypeConfig = this._proxy.getTypeCfg(type);
            this._view.lab_num.textFlow = TextUtil.parseHtml((cfg && cfg.name || '') + '：' + progress + '%');
        }
    }
}