namespace game.mod {
    import Event = egret.Event;

    /**
     * 战力组件
     */
    export class Power extends eui.Component {
        public group_power: eui.Group;
        public group_flame: eui.Group;
        public img_bg: eui.Image;

        private _effIdx: number;
        private _effHub: UIEftHub;

        constructor() {
            super();
            this.touchChildren = false;
            this.touchEnabled = false;
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this._effHub = new UIEftHub(this);
        }

        protected createChildren(): void {
            // this.showFlameEff();
        }

        private showFlameEff() {
            let self = this;
            if (self.group_flame) {
                if (this._effIdx) {
                    return;
                }
                //this._effIdx = self._effHub.add(UIEftSrc.CommPower, 0, 0, null, 0, self.group_flame, -1, 1, true, 1);
            }
        }

        private removeFlameEff(): void {
            if (this._effIdx) {
                this._effHub.removeEffect(this._effIdx);
                this._effIdx = null;
            }
        }

        protected onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this)
            this.onHide();
        }

        private onHide(): void {
            this.removeFlameEff();
            this._effHub.clearAllFont();
            this._effHub.removeAllEffects();
        }

        /**
         * 添加字体
         * @param text 显示的文本
         * @param expandParent 默认不设置container大小
         */
        public setPowerValue(text: Long | string | number, expandParent: boolean = false): void {
            let powerValue = text ? text.toString() : "0";
            this._effHub.addBmpFont(powerValue, BmpTextCfg[BmpTextType.CommonPower], this.group_power, true,1, false, 0, expandParent);
        }
    }

}