namespace game.mod.shenling {

    import facade = base.facade;

    export class ShenlingLingliSkillListComp extends eui.Component {
        public line_left: game.mod.shenling.ShenlingLingliLine;
        public line_right: game.mod.shenling.ShenlingLingliLine;
        public line_middle0: game.mod.shenling.ShenlingLingliLine;
        public line_middle1: game.mod.shenling.ShenlingLingliLine;

        private _proxy: ShenlingLingliProxy;
        private _selIcon: ShenlingLingliSkillIcon;//当前选中的icon
        private _leftAry: number[] = [1, 3, 5, 8, 11, 14, 17, 20, 23, 26, 27];
        private _middleAry: number[] = [null, 6, 9, 12, 15, 18, 21, 24];
        private _rightAry: number[] = [2, 4, 7, 10, 13, 16, 19, 22, 25];

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingliSkillListCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingli);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            let i = 0;
            while (this[`icon${i}`]) {
                this[`icon${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                i++;
            }
            facade.onNt(ShenLingEvent.ON_LING_LI_MAIN_ICON_SELECT, this.onUpdateSel, this);
            this.line_left.setMax(this._leftAry.length - 1);
            this.line_middle0.setMax(1);
            this.line_middle1.setMax(this._middleAry.length - 1);
            this.line_right.setMax(this._rightAry.length - 1);
        }

        private onRemoveFromStage(): void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            let i = 0;
            while (this[`icon${i}`]) {
                this[`icon${i}`].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                i++;
            }
            facade.offNt(ShenLingEvent.ON_LING_LI_MAIN_ICON_SELECT, this.onUpdateSel, this);
            this._selIcon = null;
            this.resetLineView();
        }

        private resetLineView(): void {
            this.line_left.updateLine(0);
            this.line_middle0.updateLine(0);
            this.line_middle1.updateLine(0);
            this.line_right.updateLine(0);
        }

        public updateView(type: ShenLingType): void {
            this.resetLineView();
            let cfg = this._proxy.getConfig(type, 1);
            if (!cfg) {
                return;
            }
            let buffAry = cfg.buff_skills || [];
            for (let i = 0; i < buffAry.length; i++) {
                let skillData = this._proxy.getSkillData(type, i + 1);
                let data: ILingliSkillIconData = {
                    type,
                    index: buffAry[i],
                    idx: i + 1,
                    lv: skillData && skillData.level || 0,
                    isMaxLv: this._proxy.isMaxLevel(type, i + 1),
                    hint: this._proxy.canActOrUp(type, i + 1)
                };
                this.setIconData(i, data);
            }
        }

        private setIconData(i: number, data: ILingliSkillIconData): void {
            let icon = this[`icon${i}`] as ShenlingLingliSkillIcon;
            if (icon) {
                icon.data = data;
                this.updateLineView(data);
            }
        }

        private updateLineView(data: ILingliSkillIconData): void {
            if (!data || !data.lv) {
                return;
            }
            let idx = data.idx;
            if (this._leftAry.indexOf(idx) > -1) {
                let val = this._leftAry.indexOf(idx);
                this.line_left.updateLine(val);
            } else if (this._middleAry.indexOf(idx) > -1) {
                let val = this._middleAry.indexOf(idx);
                this.line_middle1.updateLine(val);
                this.line_middle0.updateLine(1);
            } else if (this._rightAry.indexOf(idx) > -1) {
                let val = this._rightAry.indexOf(idx);
                this.line_right.updateLine(val);
            }
        }

        private onClickIcon(e: egret.TouchEvent): void {
            let icon = e.currentTarget as ShenlingLingliSkillIcon;
            if (!icon || icon.isSeled()) {
                return;
            }
            icon.setSel(true);
            if (this._selIcon) {
                this._selIcon.setSel(false);
            }
            this._selIcon = icon;
            if (icon.data) {
                facade.sendNt(ShenLingEvent.ON_LING_LI_ICON_SELECT, [icon.data.type, icon.data.idx]);
            }
        }

        private onUpdateSel(): void {
            if (this._selIcon) {
                this._selIcon.setSel(false);
            }
            this._selIcon = null;
        }
    }
}