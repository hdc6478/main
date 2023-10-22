namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    //上期排名
    export class TongtiangeLastRankMdr extends MdrBase {
        private _view: RankSectionView = this.mark("_view", RankSectionView);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        //0排行榜类型，1展示的排名数量
        _showArgs: any[];
        private _maxRankNo: number;//当前展示的最大名次

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = RankSectionItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_type2.source = `jianzaocishu`;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.scroller.viewport, eui.PropertyEvent.PROPERTY_CHANGE, this.onListChange, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_LAST_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.secondPop.updateTitleStr(getLanById(LanDef.compete_mars_26));
            let type = this._showArgs[0];
            this._proxy.c2s_attic_done_rank_show(type);
            this._maxRankNo = 10;
        }

        protected onHide(): void {
            super.onHide();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
        }

        private onUpdateView(): void {
            let model = this._proxy.model;
            let listMap = this._showArgs[0] == TongtiangeRankType.Personal ? model.last_role_list : model.last_guild_list;
            let list: IRankSectionData[] = [];
            for (let i = 0; i < this._maxRankNo; i++) {
                let teammate = listMap[i + 1];
                let itemData: IRankSectionData = {
                    rank: i + 1,
                    name: teammate ? teammate.name : getLanById(LanDef.tishi_2),
                    value: teammate && teammate.value ? teammate.value.toNumber() : 0
                };
                list.push(itemData);
            }
            this._listData.replaceAll(list);

            this.updateView();
        }

        private updateView(): void {
            let isGuild = this._showArgs[0] == TongtiangeRankType.Guild;//是宗门
            let model = this._proxy.model;
            let lastRankNo = model.last_rank_no;
            let lastBuildCnt = model.last_build_cnt;

            let rankDesc = TextUtil.addColor(lastRankNo ? lastRankNo + '' : getLanById(LanDef.tishi_13), WhiteColor.GREEN);
            let lanDesc = isGuild ? getLanById(LanDef.tongtiange_tips15) : getLanById(LanDef.tongtiange_tips16);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(lanDesc, [rankDesc]));

            let cntDesc = TextUtil.addColor(lastBuildCnt + '', WhiteColor.GREEN);
            lanDesc = isGuild ? getLanById(LanDef.tongtiange_tips17) : getLanById(LanDef.tongtiange_tips18);
            this._view.lab_score.textFlow = TextUtil.parseHtml(StringUtil.substitute(lanDesc, [cntDesc]));

        }

        //list滚动，请求下一页数据
        private onListChange(e: eui.PropertyEvent): void {
            //已到达最大名次
            if (this._maxRankNo >= this._showArgs[1]) {
                return;
            }
            if (e.property == "scrollV" || e.property == "contentWidth") {
                let viewport = this._view.scroller.viewport;
                let contentH = viewport.contentHeight;
                let scrollV = viewport.scrollV;
                let scrollerH = this._view.scroller.height;
                if (scrollV >= contentH - scrollerH) {
                    //每次请求10名
                    this._proxy.c2s_attic_done_rank_show(this._showArgs[0], this._maxRankNo, this._maxRankNo + 10);
                    this._maxRankNo += 10;
                }
            }
        }
    }
}