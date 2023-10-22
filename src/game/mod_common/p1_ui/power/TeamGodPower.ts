namespace game.mod {

    /**战队军团仙力组件*/
    export class TeamGodPower extends eui.Component {
        public img_bg: eui.Image;
        public img_xianli: eui.Image;
        public gr_power: eui.Group;
        private _hub: UIEftHub;

        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
            this.skinName = `skins.common.TeamGodPower`;
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
         * 设置军团仙力等
         * @param value
         */
        public setPowerValue(value: Long | string | number): void {
            let powerValue = value ? value.toString() : "0";
            this._hub.addBmpFont(powerValue, BmpTextCfg[BmpTextType.CommonPower2], this.gr_power,
                true, 1, false, 0, true);
        }
    }

}