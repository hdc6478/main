namespace game.mod.yishou {


    import LanDef = game.localization.LanDef;

    export class YishouShouguEquipTipsMdr2 extends YishouShouguEquipTipsMdr {

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_replace, egret.TouchEvent.TOUCH_TAP, this.onClickReplace, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.currentState = 'dress';
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateBaseAttr(): void {
            if (!(this._showArgs instanceof PropData)) {
                return;
            }
            let prop = this._showArgs;

            this._view.propTips.updateShow(prop.index);
            let attr = prop.regular_attrs;
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);

            let attrDesc = TextUtil.getAttrTextAdd(attr, BlackColor.GREEN);
            this._view.descItem0.updateShow(attrDesc, getLanById(LanDef.base_attr));
        }

        protected updateView() {
            super.updateView();

            let index: number;
            if (this._showArgs instanceof PropData) {
                index = this._showArgs.index;
            } else {
                index = this._showArgs;
            }
            // [品质,星级,部位,类型]
            let ary = this._proxy.getAryByParserIndex(index);
            let equipInfo = this._proxy.getEquipInfo(ary[3], ary[2]);
            this._view.btn_replace.label = equipInfo ? getLanById(LanDef.weapon_tips25) : getLanById(LanDef.soul1);
        }

        private onClickReplace(): void {
            if (!(this._showArgs instanceof PropData)) {
                return;
            }
            let prop = this._showArgs;
            // [品质,星级,部位,类型]
            let index = prop.index;
            let ary = this._proxy.getAryByParserIndex(index);
            let canDress = this._proxy.canDressByTypeAndPos(ary[3], ary[2], true);
            if (!canDress) {
                PromptBox.getIns().show(`条件不足`);
                return;
            }
            this._proxy.c2s_yishou_equip_operate(ary[3], 1, prop.prop_id);
            this.hide();
        }
    }
}