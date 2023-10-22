namespace game.mod.pass {


    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import PreviewConfig = game.config.PreviewConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;

    export class PreviewMdr extends EffectMdrBase {
        private _view: PreviewView = this.mark("_view", PreviewView);
        private _proxy: PassProxy;
        private _cfg: PreviewConfig;
        private _selectIndex: number;

        private _listData: ArrayCollection = new ArrayCollection();
        private _listRewards: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Pass);

            this._view.list.itemRenderer = PreviewItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_rewards.itemRenderer = Icon;
            this._view.list_rewards.dataProvider = this._listRewards;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
            addEventListener(this._view.btn_jump, TouchEvent.TOUCH_TAP, this.onJump);
            addEventListener(this._view.btn_lock, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect);

            this.onNt(PassEvent.ON_UPDATE_PREVIEW_INFO, this.onUpdateTab, this);
            this.onNt(PassEvent.ON_UPDATE_PREVIEW_SELECT, this.onUpdateSelect, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onInitTab();
        }

        private onInitTab(): void {
            this.onUpdateList();

            let index: number = this._selectIndex || this._proxy.getModel().index || 0;
            this.onUpdateIndex(index);
        }

        private onUpdateTab(): void {
            this.onUpdateList();

            this.onUpdateView();
        }

        private onUpdateList(): void {
            let cfgArr: PreviewConfig[] = getConfigListByName(ConfigName.Preview);
            this._listData.replaceAll(cfgArr);
        }

        private onUpdateSelect(n: GameNT): void {
            let index: number = n.body;

            this.onUpdateList();
            this.onUpdateIndex(index);
        }

        private onUpdateIndex(index: number): void {
            this._view.list.selectedIndex = index;
            this._selectIndex = index;
            this.onUpdateView()
        }

        private onClickSelect(e: ItemTapEvent): void {
            this.onUpdateIndex(e.itemIndex);
        }

        private onUpdateView(): void {
            this._cfg = this._listData.source[this._view.list.selectedIndex];
            this._listRewards.replaceAll(this._cfg.reward);

            let bool: boolean = ViewMgr.getIns().checkMainLine(this._cfg.scence_limit);
            let bought: boolean = this._proxy.checkBought(this._cfg.index);
            let enough: boolean = BagUtil.checkPropCnt(this._cfg.cost[0][0], this._cfg.cost[0][1]);
            this._view.img_state.visible = bool && bought;
            this._view.btn_get.visible = bool && !bought;
            this.removeEft();
            if (this._view.btn_get.visible) {
                this._view.btn_get.setCost(this._cfg.cost[0]);
                this._view.btn_get.setHint(enough);
                this.addEftByParent(UIEftSrc.Tiaozhan,this._view.btn_get.group_eft);
            }

            this._view.btn_lock.visible = !bool;

            this._view.btn_jump.icon = this._cfg.icon;
        }

        private onClick(): void {
            let model: PassModel = this._proxy.getModel();
            let bought: boolean = model.indexs.indexOf(this._cfg.index) > -1;
            if (bought) {
                return;
            }
            if (!BagUtil.checkPropCnt(this._cfg.cost[0][0], this._cfg.cost[0][1], PropLackType.Dialog)) {
                return;
            }
            this._proxy.c2s_preview(this._cfg.index);
        }

        private onJump(): void {
            ViewMgr.getIns().showViewByID(this._cfg.jumpid);
        }

        private onClickFight(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Pass, true)) {
                return;
            }
            ViewMgr.getIns().showView(ModName.Pass, PassViewType.PassMain);
        }
    }
}