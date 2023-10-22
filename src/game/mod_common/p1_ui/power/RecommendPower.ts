namespace game.mod {

    /**推荐战力 */
    export class RecommendPower extends eui.Component {
        public grp_font: eui.Group;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
            this.skinName = `skins.common.RecommendPowerSkin`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._hub = new UIEftHub(this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this._hub.clearFont(this.grp_font, true);
        }

        /**
         * 设置推荐战力
         * @param value 战力值
         */
        public setPowerValue(value: Long | string | number): void {
            let powerValue = value ? value.toString() : "0";
            this._hub.addBmpFont(powerValue, BmpTextCfg[BmpTextType.CommonPower], this.grp_font, true, 1, false, 0, true);
        }

    }

}