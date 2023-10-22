namespace game.mod.role {


    import LanDef = game.localization.LanDef;

    export class SuitStageTipsMdr extends MdrBase {
        private _view: SuitStageTipsView = this.mark("_view", SuitStageTipsView);
        private _proxy: SuitProxy;

        protected _showArgs: SuitType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
            this._view.baseDesc1.visible = false;
            this._view.img_line.visible = this._view.btn_up.visible = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            let info = this._proxy.getSuitTypeInfo(this._showArgs);
            this._view.icon.img_icon.source = `jinjieanniu`;
            let suit_lv = info && info.suit_lv > 0 ? info.suit_lv : 0;
            this._view.lb_name.text = SuitTypeName[this._showArgs] + getLanById(LanDef.advance_suit)
                + ` ${suit_lv}` + getLanById(LanDef.tishi_43);
            this._view.power.setPowerValue(info && info.suit_attr && info.suit_attr.showpower || 0);

            let nextCfg = this._proxy.getSuitStageCfg(this._showArgs, suit_lv + 1);//下一阶配置
            // 0阶
            if (suit_lv == 0) {
                this._view.baseDesc1.visible = false;

                let satisfyCnt = this._proxy.getSuitLvNotLess(this._showArgs, nextCfg.stage);
                let titleStr = this.getStageStr(nextCfg.stage, true) + TextUtil.addColor(` (${satisfyCnt}/${SuitEquipPosAry.length})`, BlackColor.RED);
                this._view.baseDesc0.updateShow(this.getShowStr(nextCfg.buff_id), titleStr);
                return;
            }
            //满阶
            if (!nextCfg) {
                this._view.baseDesc1.visible = false;

                nextCfg = this._proxy.getSuitStageCfg(this._showArgs, info.suit_lv);
                let titleStr = this.getStageStr(nextCfg.stage);
                this._view.baseDesc0.updateShow(this.getShowStr(nextCfg.buff_id), titleStr);
                return;
            }

            let curCfg = this._proxy.getSuitStageCfg(this._showArgs, suit_lv);
            let titleStr = this.getStageStr(curCfg.stage);
            this._view.baseDesc0.updateShow(this.getShowStr(curCfg.buff_id), titleStr);

            this._view.baseDesc1.visible = true;
            let satisfyCnt = this._proxy.getSuitLvNotLess(this._showArgs, nextCfg.stage);
            let nextTitleStr = this.getStageStr(nextCfg.stage, true) +
                TextUtil.addColor(` (${satisfyCnt}/${SuitEquipPosAry.length})`, BlackColor.RED);
            let str = this.getShowStr(nextCfg.buff_id).replace('#G', '');
            this._view.baseDesc1.updateShow(TextUtil.addColor(str, BlackColor.GRAY), nextTitleStr);
        }

        private getStageStr(stage: number, isNext = false, color = BlackColor.WHITE): string {
            let preStr = getLanById(LanDef.cur_step);
            if (isNext) {
                preStr = getLanById(LanDef.maid_cue13);
            }
            return preStr + ' ' + TextUtil.addColor(`全身${stage}阶以上`, color);
        }

        private getShowStr(buff_id: number): string {
            return this._proxy.getBuffDesc(buff_id);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}