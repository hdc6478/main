namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;

    export class XiandiTreasureMdr extends EffectMdrBase {
        private _view: XiandiTreasureView = this.mark("_view", XiandiTreasureView);

        private _proxy: XiandiProxy;
        private _listData: eui.ArrayCollection = new eui.ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);

            this._view.list.itemRenderer = XiandiTreasureItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            this.onNt(HuangguEvent.ON_UPDATE_XIANDI_TREASURE, this.onUpdateCount, this);
            this.onNt(ActivityEvent.ON_UPDATE_EXCHANGE_SHOP_INFO, this.onUpdateList, this);
            // this.onNt(RoleEvent.ON_SERVER_DAY_UPDATE, this.onUpdateList, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
        }

        protected onShow(): void {
            StoreUtil.c2s_exchange_shop_info(StoreType.Xiandi);
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            if (this._proxy.tiandi_info) {
                let tiandi: teammate = this._proxy.tiandi_info;
                this._view.lab_name.text = tiandi.name;
                this.updateUIRole(this._view.grp_eft, tiandi.fashion, tiandi.weapon, tiandi.wing, tiandi.sex, 0.5);
            }

            this.onUpdateCount();
            this.onUpdateList();
            this.onUpdateCoin();
        }

        private onUpdateCoin(): void {
            this._view.coin1.setData(PropIndex.Xianyu);
            this._view.coin2.setData(PropIndex.Yuanbao);
        }

        private onUpdateList(): void {
            this._listData.replaceAll(this._proxy.list);
        }

        private onUpdateCount(): void {
            let count: number = this._proxy.count;
            this.addBmpFont(`${count}`, BmpTextCfg[BmpTextType.MainVip], this._view.grp_font, true, 1.5, true);

            let rate: string = "";
            let rates: number[] = this._proxy.tiandi_box_have;
            let num: number = 0;
            if (this._proxy.is_king) {
                rate = TextUtil.addColor(`${rates[1] / 100}%`, BlackColor.GREEN);
                num = count * rates[1] / 10000;
            } else {
                rate = TextUtil.addColor(`${rates[0] / 100}%`, BlackColor.GREEN);
                num = count * rates[0] / 10000;
            }
            this._view.lab_rate.textFlow = TextUtil.parseHtml(`当前税率：${rate}`);
            this._view.prop.setData([this._proxy.tiandi_box_iteam, num]);
        }

        private onClickFight(): void {
            this._proxy.onCheckJockey();
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xiandi_tips26));
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(PropIndexToKey[PropIndex.Xianyu]) > -1 || keys.indexOf(PropIndexToKey[PropIndex.Yuanbao]) > -1) {
                this.onUpdateCoin();
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}