namespace game.mod.more {

    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class XujieTansuoMdr extends MdrBase {
        private _view: XujieTansuoView = this.mark("_view", XujieTansuoView);
        private _proxy: XujieTansuoProxy;
        private _listReward: eui.ArrayCollection;
        private _listArea: eui.ArrayCollection;
        private _selIdx: number = 0;//当前选中的区域

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
            this._view.list_area.itemRenderer = XujieTansuoAreaItem;
            this._view.list_area.dataProvider = this._listArea = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
            addEventListener(this._view.btn_zhanlipin, egret.TouchEvent.TOUCH_TAP, this.onClickZhanlipin, this);
            addEventListener(this._view.btn_yuanzheng, egret.TouchEvent.TOUCH_TAP, this.onClickYuanzheng, this);
            addEventListener(this._view.btn_tansuo, egret.TouchEvent.TOUCH_TAP, this.onClickTansuo, this);
            addEventListener(this._view.btn_zhenrong, egret.TouchEvent.TOUCH_TAP, this.onClickZhenrong, this);
            addEventListener(this._view.list_area, eui.ItemTapEvent.ITEM_TAP, this.onClickArea, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RECORDS_INFO, this.onUpdateZhanlipin, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RANK_INFO, this.onUpdateTopTeam, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateZhenrong, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper7);

            let nowType = this._proxy.now_type;
            let nowLayer = this._proxy.now_layer || 1;
            this._proxy.c2s_zhandui_xujietansuo_quyu_info(nowType, nowLayer);

            this.onUpdateZhanlipin();
            this.onUpdateZhenrong();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
        }

        private onUpdateView(): void {
            this.updateListData();
            this.onUpdateTopTeam();
            this.updateView();
        }

        //战利品按钮红点
        private onUpdateZhanlipin(): void {
            let hint = this._proxy.getZhanlipinHint();
            this._view.btn_zhanlipin.setHint(hint);
        }

        //阵容红点
        private onUpdateZhenrong(): void {
            this._view.btn_zhenrong.setHint(this._proxy.getZhenrongHint());
        }

        private onUpdateTopTeam(): void {
            this._view.mapView.updateView(this._selIdx + 1, this._proxy.now_type);
        }

        private updateListData(): void {
            let list: IXujieTansuoAreaItemData[] = [];
            let cfgs: ZhanduiTansuoTypeConfig[] = getConfigListByName(ConfigName.ZhanduiTansuoType);
            let nowType = this._proxy.now_type;
            let selIdx: number;
            for (let i = 0; i < cfgs.length; i++) {
                let cfg = cfgs[i];
                if (cfg.type == nowType) {
                    selIdx = i;//最新的探索的区域
                }
                list.push({
                    cfg,
                    isActed: this._proxy.isActedByType(cfg.type),
                    progress: this._proxy.getProgressByType(cfg.type)
                });
            }
            this._listArea.replaceAll(list);

            if (this._proxy.seledArea != null) {
                selIdx = this._proxy.seledArea;//正在探索的区域
            } else {
                this._proxy.seledArea = selIdx || 0;
            }
            this._view.list_area.selectedIndex = this._selIdx = selIdx;
        }

        private updateView(): void {
            let itemData = this._listArea.source[this._selIdx] as IXujieTansuoAreaItemData;
            let cfg = itemData.cfg;
            if (!cfg) {
                return;
            }
            this._listReward.replaceAll(cfg.rewards);

            //todo 远征按钮处理
            let expeditionInfo = this._proxy.getExpeditionGridInfo();
            this._view.btn_yuanzheng.visible = !!expeditionInfo;
            let expeditionHint = this._proxy.getExpeditionHint();
            if (this._view.btn_yuanzheng.visible) {
                this._view.btn_yuanzheng.setHint(expeditionHint);
            }

            this._view.btn_tansuo.setHint(this._proxy.getTansuoHint());

            let cnt = this._proxy.team_count;
            this._view.gr_team.visible = cnt > 0;
            let str = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips3), [cnt]);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xujietansuo_tips4));
        }

        //todo
        private onClickRank(): void {
            let itemData = this._listArea.source[this._selIdx] as IXujieTansuoAreaItemData;
            let type = itemData && itemData.cfg ? itemData.cfg.type : 1;
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XujieTansuoRankMain, ['01', type]);
        }

        private onClickZhanlipin(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoZhanlipin);
        }

        //todo
        private onClickYuanzheng(): void {
            let data: IXujieTansuoGridItemData = this._proxy.getExpeditionGridItemData();
            facade.showView(ModName.More, MoreViewType.XujieTansuoExpeditionGrid, data);
        }

        //todo
        private onClickTansuo(): void {
            let itemData = this._listArea.source[this._selIdx] as IXujieTansuoAreaItemData;
            let type = itemData && itemData.cfg ? itemData.cfg.type : 1;
            // WndBaseMdr参数处理，需要这么传入
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XujieTansuoLayerMain, ['01', type]);
        }

        private onClickZhenrong(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.Zhenrong);
        }

        private onClickArea(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            let cfg = (e.item as IXujieTansuoAreaItemData).cfg;
            if (!this._proxy.isActedByType(cfg.type, true)) {
                this._view.list_area.selectedIndex = this._selIdx;
                return;
            }
            this._selIdx = itemIdx;
            this._proxy.seledArea = itemIdx;
            this.onUpdateTopTeam();
            this.updateView();
        }
    }
}