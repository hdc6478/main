namespace game.mod.more {


    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;

    /**虚界矿脉 */
    export class MiningMdr extends EffectMdrBase {
        private _view: MiningView = this.mark("_view", MiningView);
        private _proxy: MiningProxy;

        private readonly _cnt: number = 2;
        private readonly _other: number = 6;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Mining);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_lingbao, TouchEvent.TOUCH_TAP, this.onClickBtn);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);

            this.onNt(MoreEvent.ON_UPDATE_MINING_MASTER_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_UPDATE_MINING_LINGBAO_CNT_INFO, this.onUpdateCnt, this);
        }

        protected onShow(): void {
            this._proxy.c2s_zhandui_kuanzhu_show(2);
            super.onShow();
            this.onUpdateView();
            this.onUpdateSale();
        }

        private onUpdateView(): void {
            let info = this._proxy.my_info;
            for (let i = 0; i < this._cnt; i++) {
                let key: number = i + 1;
                let item: MiningSlaveEftItem = this._view[`modalItem${key}`];
                item.setData(info && info.members && info.members[i] || null, key);
            }

            let list = this._proxy.slave_list;
            for (let i = 0; i < this._other; i++) {
                let modal: MiningModalItem = this._view[`modal${i + 1}`];
                modal.touchEnabled = false;
                modal.visible = !!list[i];
                if (modal.visible) {
                    modal.setModal(list[i]);
                }
            }

            let prop: PropConfig = GameConfig.getPropConfigById(this._proxy.team_kuanmai_item);
            this._view.img_icon.source = this._view.icon.source = prop.icon;
            this._view.lab_count.text = `${this._proxy.total}/小时`;

            this.onUpdateCnt();
        }

        private onUpdateCnt(): void {
            let count: number = BagUtil.getPropCntByIdx(this._proxy.team_kuanmai_item);
            this._view.lab_have.text = `${count}`;

            let num: number = count / this._proxy.team_lingbao_cost[1];
            if (num > 1) {
                num = 1;
            }
            this._view.btn_lingbao.label = `${Math.floor(num * 100)}%`;
            this._view.btn_lingbao.setHint(this._proxy.getHintByLingbao());
        }

        private onUpdateSale(): void {
            let param: ParamConfig = GameConfig.getParamConfigById("team_product_id");
            this._view.btn_sale.updateGift(param.value);
        }

        private onClickBtn(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningLingbao);
        }

        private onClickGift(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.MiningGift);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}