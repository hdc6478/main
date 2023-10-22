namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import SpecialAttrConfig = game.config.SpecialAttrConfig;

    export class GoddessGodMdr extends EffectMdrBase {
        private _view: GoddessGodView= this.mark("_view", GoddessGodView);
        private _proxy: HuangguProxy;
        private _canAct: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Huanggu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAct(): void {
            if(this._canAct){
                this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Act);
            }
            else {
                ViewMgr.getIns().showView(ModName.More, MoreViewType.GoddessTargetMain);
            }
            this.hide();
        }

        private updateView(): void {
            //let attr = this._proxy.attr;
            //let god = attr && attr.god || 0;

            let specialAttrId = this._proxy.getSpecialAttrId();
            let cfg:SpecialAttrConfig = getConfigByNameId(ConfigName.SpecialAttr,specialAttrId);

            let lv = this._proxy.lv;
            let godStr = "" + cfg.god * lv;
            this.addBmpFont(godStr, BmpTextCfg[BmpTextType.CommonPower], this._view.grp_god, true, 1, false, 0, true);


            //let addGod = god / lv;
            let addGod = cfg.god;
            let descStr = getLanById(LanDef.huanggu_nvshen_tips7) + "，" +
                TextUtil.addColor(TextUtil.getAttrsText(AttrKey.god) + "+" + addGod,BlackColor.GREEN);
            this._view.lab_desc.textFlow = TextUtil.parseHtml(descStr);

            let lvStr = "（" + getLanById(LanDef.huanggu_nvshen_tips8) + "：" + lv + "）";
            this._view.lab_lv.text = lvStr;

            this._view.btn_act.visible = this._view.lab_act.visible = !this._proxy.isAct;
            if(this._view.btn_act.visible){
                let cfg: ParamConfig = GameConfig.getParamConfigById("huanggu_qiyue");
                let index = cfg && cfg.value && cfg.value[0];
                let costCnt = cfg && cfg.value && cfg.value[1];
                this._canAct = BagUtil.checkPropCnt(index, costCnt);
                this._view.btn_act.redPoint.visible = this._canAct;
                let actStr = this._canAct ? LanDef.huanggu_nvshen_tips18 : LanDef.huanggu_nvshen_tips19;
                this._view.btn_act.labelDisplay.text = getLanById(actStr);
            }
        }
    }
}