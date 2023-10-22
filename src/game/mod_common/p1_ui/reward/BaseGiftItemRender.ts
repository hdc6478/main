namespace game.mod {

    /**
     * 通用的奖励领取项
     * 弹窗类使用：skins.common.BaseGiftItemSkin
     * 一级界面使用：skins.common.BaseGiftItemSkin2
     * (todo width不一致，看下能不能统一起来)
     */
    export class BaseGiftItemRender extends BaseListenerRenderer {
        protected lb_desc: eui.Label;
        protected list: eui.List;
        protected img_bought: eui.Image;
        protected btn_buy: game.mod.Btn;

        protected _listData: eui.ArrayCollection;

        data: any;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {

        }

        /**点击购买*/
        protected onClick(): void {

        }
    }
}