namespace game.mod.more {

    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class XujieTansuoExpeditionGridMdr extends MdrBase implements UpdateItem {
        private _view: XujieTansuoExpeditionGridView = this.mark("_view", XujieTansuoExpeditionGridView);
        private _proxy: XujieTansuoProxy;
        /**4_数量_品质_需要挂机时长（秒）_掉落id_展示id*/
        private _data: number[];
        /**格子数据*/
        private _gridItemData: IXujieTansuoGridItemData;
        private _listReward: eui.ArrayCollection;
        private _listAvatar: eui.ArrayCollection;
        private _endTime = 0;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);

            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
            this._view.list_avatar.itemRenderer = AvatarIcon;
            this._view.list_avatar.dataProvider = this._listAvatar = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            addEventListener(this._view.list_avatar, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);

            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this._data = this._gridItemData.grid;

            this.updateListAvatar();
            this.updateView();
            this.updateTimeInfo();
        }

        protected onHide(): void {
            super.onHide();
            this._endTime = 0;
        }

        private onUpdateView(): void {
            // let gridData = this._gridItemData;
            // this._proxy.getGridInfo(gridData.type, gridData.layer, gridData.row, gridData.col);
            let gridInfo = this._proxy.getExpeditionGridInfo();
            if (!gridInfo || (gridInfo && gridInfo.grid_type == XujieTansuoGridStatus.Null)) {
                this.hide();
                return;
            }

            this.updateListAvatar();
            this.updateView();
            this.updateTimeInfo();
        }

        private updateTimeInfo(): void {
            // let gridData = this._gridItemData;
            // this._proxy.getGridInfo(gridData.type, gridData.layer, gridData.row, gridData.col);
            let grid = this._proxy.getExpeditionGridInfo();
            this._view.btn_do.setHint(false);
            if (grid && grid.endtime && grid.endtime.notEquals(Long.ZERO)) {
                let endTime = grid.endtime.toNumber();
                let leftTime = endTime - TimeMgr.time.serverTimeSecond;
                if (leftTime <= 0) {
                    this._view.timeItem.visible = false;
                    this._view.btn_do.visible = true;
                    this._view.btn_do.label = getLanById(LanDef.lingqu);
                    this._view.btn_do.setHint(true);
                    TimeMgr.removeUpdateItem(this);
                    this._endTime = 0;
                } else {
                    this._view.timeItem.visible = true;
                    this._view.btn_do.visible = false;
                    this._endTime = endTime;
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                }
            } else {
                //已领取
                this._view.timeItem.visible = false;
                this._view.btn_do.visible = true;
                this._view.btn_do.label = getLanById(LanDef.xujietansuo_tips22);
                TimeMgr.removeUpdateItem(this);
                this._endTime = 0;
            }
        }

        private updateView(): void {
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this._data[5]);
            if (cfg) {
                this._listReward.replaceAll(cfg.content);
            }
            let desc = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips11), [this._data[1], QualityTypeSrName[this._data[2]]]);
            let satisfy = this.isQualitySatisfy();
            let color = satisfy ? BlackColor.GREEN : BlackColor.GRAY;
            this._view.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(desc, color));
            this._view.checkBox.selected = satisfy;
        }

        //品质是否满足
        private isQualitySatisfy(): boolean {
            let cnt = this._data[1];
            let quality = this._data[2];
            let source: AvatarItemData[] = this._listAvatar.source || [];
            if (source && source.length) {
                let needCnt = 0;
                for (let item of source) {
                    if (!item || !item.cfg) {
                        continue;
                    }
                    if (item.cfg.quality >= quality) {
                        needCnt++;
                    }
                }
                if (needCnt >= cnt) {
                    return true;
                }
            }
            return false;
        }

        private updateListAvatar(): void {
            let cnt = this._data[1];

            //神灵数据
            let list: AvatarItemData[] = [];
            // let gridData = this._gridItemData;
            // this._proxy.getGridInfo(gridData.type, gridData.layer, gridData.row, gridData.col);
            let grid = this._proxy.getExpeditionGridInfo();
            let shenlingList: number[] = [];
            if (grid && grid.unitlist) {
                for (let id of grid.unitlist) {
                    shenlingList.push(id.toNumber());
                }
            }
            for (let i = 0; i < shenlingList.length; i++) {
                list.push({
                    cfg: getConfigByNameId(ConfigName.Shenling, shenlingList[i]),
                    showHint: false,
                    star: 0,
                    isBattle: false
                });
            }
            list.length = cnt;
            this._listAvatar.replaceAll(list);

            this._view.currentState = cnt + '';
        }

        private onClick(): void {
            let data = this._gridItemData;
            if (this._view.btn_do.label == getLanById(LanDef.lingqu)) {
                this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper4, data.type, data.layer, data.row, data.col);
                this.hide();
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoExpeditionShenLing, data);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let item = e.item as AvatarItemData;
            if (!item || !item.cfg) {
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoExpeditionShenLing, this._gridItemData);
                return;
            }
            e.stopPropagation();
            let cfg = item.cfg;
            ViewMgr.getIns().showPropTips(cfg.index);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.updateTimeInfo();
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}