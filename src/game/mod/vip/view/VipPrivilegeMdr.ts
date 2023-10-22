namespace game.mod.vip {

    import VipConfig = game.config.VipConfig;
    import Tween = base.Tween;

    export class VipPrivilegeMdr extends EffectMdrBase {
        private _view: VipPrivilegeView = this.mark("_view", VipPrivilegeView);
        private _proxy: VipProxy;
        private _listData: eui.ArrayCollection;
        private _listDesc: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Vip);
            this._view.list.itemRenderer = VipPrivilegeBtn;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.list_desc.itemRenderer = VipPrivilegeItem;
            this._view.list_desc.dataProvider = this._listDesc = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();

            let idx = this._proxy.model.idx;
            if (!this._proxy.isMaxVip()) {
                idx += 1;
            }
            let cfg = this._proxy.getVipCfg(idx);
            this._view.barComp.updateView(cfg);

            let cfgs: VipConfig[] = this._proxy.getShowVipCfgList();
            let listData: number[] = [];
            for (let cfg of cfgs) {
                if (cfg && VipUtil.getShowVipLv(cfg.index) != 0) {
                    listData.push(cfg.index);
                }
            }
            this._listData.replaceAll(listData);
            let selIdx = VipUtil.getShowVipLv(idx) - 1;
            this._view.list.selectedIndex = selIdx;
            if (selIdx > 9) {
                egret.callLater(() => {
                    ScrollUtil.moveVToAssign(this._view.scroller, selIdx, 84);
                }, this);
            }

            this.updateRightView(idx);//todo
        }

        private updateRightView(idx: number): void {
            let cfg = this._proxy.getVipCfg(idx);
            let descAry = cfg && cfg.explain && cfg.explain.split('#N') || [];
            this._listDesc.replaceAll(descAry);
            this.addBmpFont(`V${VipUtil.getShowVipLv(idx)}`, BmpTextCfg[BmpTextType.Vip1], this._view.gr_vip, true, 1, false, 0, true);
        }

        protected onHide(): void {
            Tween.remove(this._view.scroller.viewport);
            super.onHide();
        }

        private onClick(e: eui.ItemTapEvent): void {
            let index = e.item as number;
            this.updateRightView(index);
        }
    }
}