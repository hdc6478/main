namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import GuildStudyConfig = game.config.GuildStudyConfig;
    import ItemTapEvent = eui.ItemTapEvent;

    /**书斋 */
    export class UnionBookMdr extends MdrBase {
        private _view: UnionBookView = this.mark("_view", UnionBookView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _cost: number[];
        private _init: boolean;
        private readonly nodes: number = 10;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionBookItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.bookItem, TouchEvent.TOUCH_TAP, this.onClickTips);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect);
            addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);

            this.onNt(UnionEvent.ON_UPDATE_BOOK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            // this._proxy.c2s_guild_study_show();
            super.onShow();
            this._init = false;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let cfgArr: GuildStudyConfig[] = getConfigListByName(ConfigName.GuildStudy);
            this._listData.replaceAll(cfgArr);
            if (!this._init) {
                this._view.list.selectedIndex = 0;
                this._init = true;
            }
            this.onUpdateStatus();
        }

        private onUpdateStatus(): void {
            let cfg = this.getData;
            let index: number = cfg.index;

            let buff: number = this._proxy.getBuff(index);
            let info = this._proxy.getBookInfo(index);
            let stage: number = info && info.stage || 0;
            let level: number = info && info.level || 0;
            let show_stage: number = info && info.stage || 1;
            this._view.bookItem.setData(buff, show_stage);

            this._view.nameItem.visible = !!stage;
            this._view.nameItem.updateShow(`第${StringUtil.getCNBynumber(stage)}重`);

            let power = info && info.attrs && info.attrs.showpower;
            this._view.power.setPowerValue(power);

            for (let i = 1; i <= this.nodes; i++) {
                let node: eui.Image = this._view[`node_${i}`];
                let line: eui.Image = this._view[`line_${i}`];
                let bool: boolean = this.is_max || level >= i;
                if (node) {
                    node.source = bool ? "lanseyuan" : "huiseyuan";
                }
                if (line) {
                    line.source = bool ? "lansexian" : "huisexian";
                }
            }

            if (cfg.activate_condition > this._proxy.union_level) {
                this._view.img_max.visible = this._view.icon.visible = this._view.btn_up.visible = false;
                this._view.lab_limit.visible = true;
                this._view.lab_limit.text = `仙宗${cfg.activate_condition}级可修炼`;
                return;
            }
            this._view.lab_limit.visible = false;

            this._view.icon.visible = this._view.btn_up.visible = !this.is_max;
            this._view.img_max.visible = this.is_max;
            if (this.is_max) {
                this._view.btn_up.setHint(false);
                return;
            }

            this._view.icon.setData(this._cost);
            this._view.icon.updateCostLab(this._cost);

            if (!stage) {
                this._view.btn_up.label = getLanById(LanDef.active);
            } else if (level == 10) {
                this._view.btn_up.label = getLanById(LanDef.weapon_tips34);
            } else {
                this._view.btn_up.label = getLanById(LanDef.uplv);
            }
            let root: string[] = this._proxy.getBookRoots(index);
            this._view.btn_up.setHint(HintMgr.getHint(root));
        }

        private onClickTips(): void {

        }

        private onClickBtn(): void {
            if (!BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_guild_study_oper(this.getData.index);
        }

        private onClickSelect(e: ItemTapEvent): void {
            this.onUpdateIndex(e.itemIndex);
        }

        private onClickAttr(): void {
            if (!this.getData) {
                return;
            }
            let info = this._proxy.getBookInfo(this.getData.index);
            let attr = info && info.attrs;
            ViewMgr.getIns().showAttrTipsWithoutGod('属性', attr);
        }

        private onUpdateIndex(index: number): void {
            this._view.list.selectedIndex = index;
            this.onUpdateStatus();
        }

        private get getData(): GuildStudyConfig {
            return this._listData.source[this._view.list.selectedIndex];
        }

        protected onHide(): void {
            super.onHide();
        }

        private get is_max(): boolean {
            this._cost = this._proxy.getCost(this.getData.index);
            return !this._cost || !this._cost.length
        }
    }
}