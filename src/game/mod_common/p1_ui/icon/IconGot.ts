namespace game.mod {

    export class IconGot extends BaseListenerRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public gr_got: eui.Group;
        public img_gou: eui.Image;
        public img_gray: eui.Image;

        public data: IconRewardData;

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged(): void {
            if (this.data == null) {
                this.icon.defaultIcon();
                this.gr_got.visible = this.redPoint.visible = false;
                return;
            }
            if (this.data.showHint !== undefined) {
                this.redPoint.visible = this.data.showHint;
            }
            if (this.data.prop != undefined) {
                this.icon.setData(this.data.prop, IconShowType.NotTips);
            }
            if (this.data.isGot !== undefined) {
                this.gr_got.visible = this.data.isGot;
            }
            if (this.data.isLock != undefined) {
                this.img_gray.visible = this.data.isLock;
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: IconRewardData): void {
            this.data = data;
            // this.dataChanged();
        }

        public onClick(): void {
            let data = this.data;
            if (!data || !data.showTips) {
                return;
            }
            let prop = data.prop;
            if (Array.isArray(prop)) {
                ViewMgr.getIns().showPropTips(prop[0]);
            } else {
                ViewMgr.getIns().showPropTips(prop);
            }
        }
    }

}