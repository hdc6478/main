namespace game.mod.role {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import SuitStrengthConfig = game.config.SuitStrengthConfig;

    export class SuitStageStrengthenTipsMdr extends MdrBase {
        private _view: SuitStageTipsView = this.mark("_view", SuitStageTipsView);
        private _proxy: SuitProxy;

        _showArgs: SuitType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Suit);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(SuitEvent.ON_SUIT_EQUIP_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.lb_name.text = SuitTypeName[this._showArgs] + getLanById(LanDef.advance_suit)
                + getLanById(LanDef.enhance_1);
            this._view.icon.img_icon.source = 'taozhuangqianghua';
            this.updateView();
        }

        private updateView(): void {
            let info = this._proxy.getSuitTypeInfo(this._showArgs);
            if (info && info.master_attr && info.master_attr.showpower) {
                this._view.power.setPowerValue(info.master_attr.showpower);
            } else {
                this._view.power.setPowerValue(0);
            }
            let isAct = info && info.master_lv > 0;
            let curLv = isAct ? info.master_lv : 1;
            let curCfg = this._proxy.getSuitStrengthenCfg(this._showArgs, curLv);
            let nextCfg: SuitStrengthConfig;
            let lb: string;
            let lbBtn: string;
            if (isAct) {
                lbBtn = LanDef.rank_up;
                nextCfg = this._proxy.getSuitStrengthenCfg(this._showArgs, curLv + 1);
                lb = getLanById(LanDef.cur_step);
            } else {
                lbBtn = LanDef.active;
                lb = getLanById(LanDef.maid_cue13);
            }

            this._view.btn_up.label = getLanById(lbBtn);

            let size = SuitEquipPosAry.length;
            // 当前阶段
            let str = `${lb} ${TextUtil.addColor(getLanById(LanDef.all_strength) + '+' + curCfg.strength, BlackColor.WHITE)}`;
            let satisfy = this._proxy.getMasterLvNotLess(this._showArgs, curLv);
            str += TextUtil.addColor(` (${satisfy}/${size})`, satisfy >= size ? BlackColor.GREEN : BlackColor.RED);
            let buffDesc = this._proxy.getBuffDesc(curCfg.buff_id);
            this._view.baseDesc0.updateShow(buffDesc, `${str}`);

            // 下一阶段
            if (!nextCfg) {
                this._view.btn_up.setHint(!isAct && satisfy >= size);//激活红点
                this._view.baseDesc1.visible = false;
                return;
            }
            let str1 = getLanById(LanDef.maid_cue13) + ` ${TextUtil.addColor(getLanById(LanDef.all_strength) + '+' + nextCfg.strength,
                BlackColor.WHITE)}`;
            let satisfy1 = this._proxy.getMasterLvNotLess(this._showArgs, curLv + 1);
            str1 += TextUtil.addColor(` (${satisfy1}/${size})`, satisfy1 >= size ? BlackColor.GREEN : BlackColor.RED);
            this._view.baseDesc1.visible = true;
            this._view.baseDesc1.updateShow(this._proxy.getBuffDesc(nextCfg.buff_id), str1);
            this._view.btn_up.setHint(satisfy1 >= size);//升阶红点
        }

        private onClick(): void {
            if (!this._proxy.canMasterUp(this._showArgs, true)) {
                return;
            }
            this._proxy.c2s_suit_equip_master_lvup(this._showArgs);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}