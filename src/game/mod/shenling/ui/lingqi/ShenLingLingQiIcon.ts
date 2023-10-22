namespace game.mod.shenling {


    export class ShenLingLingQiIcon extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public redPoint: eui.Image;
        public gr_star: eui.Group;
        public lb_starcnt: eui.Label;
        public starView: game.mod.StarListView;

        data: IShenLingLingQiIconData;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingLingQiIconSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged() {
            if (!this.data) {
                this.icon.defaultIcon();
                this.redPoint.visible = false;
                this.gr_star.visible = false;
                return;
            }
            let data = this.data;
            let cfg = GameConfig.getEquipmentCfg(data.index);
            if (!cfg) {
                return;
            }
            this.icon.setData(data.index, IconShowType.NotTips);
            if (data.isAct) {
                this.icon.setImgGray('');
            } else {
                this.icon.setImgGray();
            }

            this.updateStarView();
            this.redPoint.visible = !!data.hint;
        }

        private updateStarView(): void {
            this.gr_star.visible = true;
            let star = this.data.star || 0;
            if (star <= 5) {
                this.lb_starcnt.text = '';
                this.starView.updateStar(star, star);
                return;
            }
            this.starView.updateStar(1, 1);
            this.lb_starcnt.text = star + '';
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Shenling, ShenLingViewType.ShenlingLingqiTips, {...this.data});
        }
    }

    export interface IShenLingLingQiIconData {
        slIndex: number;//神灵index
        index: number;//灵器index
        idx: number;//灵器索引 1,2,3
        hint: boolean;
        isAct: boolean;
        star: number;
    }
}