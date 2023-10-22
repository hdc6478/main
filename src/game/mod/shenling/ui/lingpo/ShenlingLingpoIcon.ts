namespace game.mod.shenling {

    export class ShenlingLingpoIcon extends BaseListenerRenderer {
        public redPoint: eui.Image;
        public img_icon: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public img_gray: eui.Image;

        data: IShenlingLingpoIconData;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenlingLingpoIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_gray.visible = !data.level;
            this.lb_num.text = data.level + '';
            this.gr_lv.visible = data.level > 0;
            this.redPoint.visible = !!data.hint;

            let cfg = GameConfig.getPropConfigById(data.index);
            this.img_icon.source = cfg ? cfg.icon : '';
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenlingLingpoTips, this.data);
        }
    }

    export interface IShenlingLingpoIconData {
        id: number;//灵魄id
        level: number;
        hint: boolean;
        index: number;//消耗index
        idx: number;//从1开始
    }
}