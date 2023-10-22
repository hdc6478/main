namespace game.mod {

    export class IconReward extends BaseListenerRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public img_sel: eui.Image;
        public gr_got: eui.Group;
        public img_get: eui.Image;
        public img_reward: eui.Image;

        public data: IconRewardData;

        constructor() {
            super();
            this.skinName = "skins.common.IconRewardSkin";
            this.touchEnabled = false;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_sel, this.onClick, this);
        }

        protected dataChanged(): void {
            if (this.data == null) {
                this.icon.defaultIcon();
                this.img_sel.visible = this.redPoint.visible = false;
                return;
            }
            if (this.data.showHint != undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.prop != undefined) {
                this.icon.setData(this.data.prop);
            }
            if (this.data.sel != undefined) {
                this.img_sel.visible = this.data.sel;
            }
            if (this.data.isGot != undefined) {
                this.gr_got.visible = this.data.isGot;
            }
            if (this.data.isReward != undefined) {
                this.img_reward.visible = this.data.isReward;
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: IconRewardData): void {
            this.data = data;
        }

        //选中框点击
        private onClick(): void {
            if (!this.data || !this.data.prop) {
                return;
            }
            let propData: PropData;
            if (!(this.data.prop instanceof PropData)) {
                let prop = this.data.prop;
                propData = PropData.create(prop[0], prop[1]);
            } else {
                propData = this.data.prop;
            }
            ViewMgr.getIns().showPropTips(propData);
        }
    }

}