namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;

    export class ZhanduiFlagMdr extends MdrBase {
        private _view: ZhanduiFlagView = this.mark("_view", ZhanduiFlagView);
        private _proxy: ZhanduiProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx: number = 0;
        private _selCfg: ZhanduiQizhiConfig;
        private _btnType: number = 0;//1使用，2购买

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list.itemRenderer = ZhanduiFlagItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_use, egret.TouchEvent.TOUCH_TAP, this.onClickUse, this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._selIdx = 0;
            this._btnType = 0;
            this._selCfg = null;
        }

        private updateView(): void {
            this.udpateListData();
            this.updateTopInfo();
            this.updateBottomInfo();
        }

        private udpateListData(): void {
            let list: IZhanduiFlagItemData[] = [];
            let cfgs: ZhanduiQizhiConfig[] = getConfigListByName(ConfigName.ZhanduiQizhi);
            let usingIndex = this._proxy.flag_index;
            let actedList = this._proxy.flag_list;
            for (let cfg of cfgs) {
                let type = 0;
                if (usingIndex == cfg.index) {
                    type = 2;
                } else if (actedList.indexOf(cfg.index) > -1) {
                    type = 1;
                }
                let itemData: IZhanduiFlagItemData = {
                    cfg,
                    type
                };
                list.push(itemData);
            }
            list.sort((a, b) => {
                let typeA = a.type;
                let typeB = b.type;
                if (typeA != typeB) {
                    return typeB - typeA;
                }
                return a.cfg.index - b.cfg.index;
            });

            this._listData.replaceAll(list);

            if (this._selCfg) {
                let size = list.length;
                for (let i = 0; i < size; i++) {
                    let cfg = list[i].cfg;
                    if (cfg && cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                this._selCfg = list[this._selIdx] && list[this._selIdx].cfg || null;
            }

            this._view.list.selectedIndex = this._selIdx;
        }

        private updateTopInfo(): void {
            if (!this._selCfg) {
                return;
            }
            this._view.img_flag.source = ResUtil.getZhanduiFlag(this._selCfg.index);
            this._view.lb_name.text = this._selCfg.name;

            let level = this._proxy.team_level;
            let nextCfg = this._proxy.getLevelCfg(level + 1);
            if (!nextCfg) {
                this._view.lb_desc.visible = false;
                this._view.img_di.visible = false;
                return;
            }
            let curExp = this._proxy.team_point;
            let diffExp = nextCfg.point - curExp;
            let str = StringUtil.substitute(getLanById(LanDef.zhandui_tips27), [diffExp]);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(str);
        }

        private updateBottomInfo(): void {
            this._view.img_used.visible = this._view.btn_use.visible = this._view.lb_actCond.visible = false;
            if (!this._selCfg) {
                return;
            }
            //正在使用
            if (this._selCfg.index == this._proxy.flag_index) {
                this._view.img_used.visible = true;
                return;
            }
            //激活未使用
            if (this._proxy.flag_list.indexOf(this._selCfg.index) > -1) {
                this._view.btn_use.visible = true;
                this._view.btn_use.label = getLanById(LanDef.use1);
                this._view.btn_use.resetCost();
                this._btnType = 1;
                return;
            }
            //未激活的，通过战队等级条件解锁
            let level = this._proxy.team_level;
            let condLv = this._selCfg.cond;
            if (condLv && condLv > level) {
                this._view.lb_actCond.visible = true;
                this._view.lb_actCond.text = StringUtil.substitute(getLanById(LanDef.zhandui_tips28), [condLv]);
                return;
            }
            if (this._selCfg.costs) {
                this._view.btn_use.visible = true;
                this._view.btn_use.label = '';
                this._view.btn_use.setCost(this._selCfg.costs[0]);
                this._btnType = 2;
                return;
            }
        }

        private onClickUse(): void {
            if (!this._selCfg) {
                return;
            }
            //使用
            if (this._btnType == 1 && !this._proxy.isCaption()) {
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips10));
                return;
            }
            let cost = this._selCfg.costs && this._selCfg.costs[0] || null;
            if (this._btnType == 2 && cost && !BagUtil.checkPropCntUp(cost[0], cost[1])) {
                return;
            }
            let type = this._btnType == 1 ? ZhanduiOperType.Oper8 : ZhanduiOperType.Oper2;//8使用，2购买
            this._proxy.sendButtonClickQizhi(type, this._selCfg.index);
        }

        private onClickList(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            this._selCfg = (e.item as IZhanduiFlagItemData).cfg;
            this.updateTopInfo();
            this.updateBottomInfo();
        }
    }
}