namespace game.mod {

    /**仙力战力组件*/
    export class XianLiPower extends eui.Component {
        public img_bg: eui.Image;
        public gr_power: eui.Group;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
            this.skinName = `skins.common.XianLiPowerSkin`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._hub = new UIEftHub(this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this._hub.clearFont(this.gr_power, true);
        }

        /**
         * 设置仙力等
         * @param value 战力值
         * @param prefixStr 数值前面文本，默认：当前仙力:
         * @param gap 间距，默认-2
         */
        public setPowerValue(value: Long | string | number, prefixStr = '当前仙力:', gap: number = -2): void {
            let powerValue = value ? value.toString() : "0";
            this._hub.addBmpFont(prefixStr + powerValue, BmpTextCfg[BmpTextType.CommonPower2], this.gr_power,
                true, 1, false, gap, true);
        }

    }

}