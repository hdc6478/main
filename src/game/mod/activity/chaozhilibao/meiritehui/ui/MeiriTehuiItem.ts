namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class MeiriTehuiItem extends BaseListenerRenderer {
        public list: eui.List;
        public btn: game.mod.Btn;
        public img_bought: eui.Image;

        data: IMeiriTehuiItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: MeiriTehuiProxy;

        constructor() {
            super();
            this.skinName = `skins.activity.MeiriTehuiItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.MeiriTehui);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this._listData.replaceAll(data.rewards);

            this.img_bought.visible = data.status == RewardStatus.Draw;
            this.btn.visible = !this.img_bought.visible;

            if (this.btn.visible) {
                let str = getLanById(LanDef.lingqu);
                if (data.productId && data.status != RewardStatus.Finish) {
                    str = PayUtil.getRmbValue(data.productId) + PayUtil.getRmbUnit();
                }
                this.btn.label = str;

                this.btn.setHint(data.status == RewardStatus.Finish);
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if (data.status == RewardStatus.Finish) {
                this._proxy.c2s_daily_tehui_get_reward(data.productId);
            } else if (data.productId) {
                PayUtil.pay(data.productId);
            }
        }
    }

    export interface IMeiriTehuiItemData {
        productId: number;//商品id，为0表示免费
        rewards: number[][];//奖励
        status: RewardStatus;//状态
    }
}