namespace game.mod.more {


    export class HuanjingZhushenMdr extends EffectMdrBase {
        private _view: HuanjingZhushenView = this.mark("_view", HuanjingZhushenView);
        private _proxy: HuanjingProxy;
        private _systemId: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }
            this.updateView();
            this.updateAttr();
        }

        private updateAttr(): void {

            let cfg = getConfigByNameId(ConfigName.HuanJingParam, this._systemId);
            let stageLv = this._proxy.getZhushenStageLv(this._systemId);

            let strAttr1 = "0" + "%";
            let strAttr2 = "0" + "%";

            if (stageLv > 0) {
                let attrIndex = cfg.zushen_attr[stageLv - 1];
                let attr = RoleUtil.getAttr(attrIndex);
                strAttr1 = attr.miemo_ratio / 10000 * 100 + "" + "%" || "0" + "%";
                strAttr2 = attr.jewelry_atk_add_rate / 10000 * 100 + "" + "%" || "0" + "%";
            }

            this.addBmpFont(strAttr1 + "", BmpTextCfg[BmpTextType.HuanJingFont], this._view.gr_font1, true, 1, false, 0, true);
            this.addBmpFont(strAttr2 + "", BmpTextCfg[BmpTextType.HuanJingFont], this._view.gr_font2, true, 1, false, 0, true);
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let stageLv = this._proxy.getZhushenStageLv(this._systemId);
            this._view.lb_lv.text = stageLv + '阶';

            this.updateSkill();
        }

        private updateSkill(): void {

            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            for (let i = 0; i < cfg.zushen_skill.length; i++) {
                let skillItem = this._view[`skillItem${i}`];
                if (!skillItem) {
                    continue;
                }
                skillItem.data = {
                    systemId: this._systemId,
                    pos: i + 1,
                    skillId: cfg.zushen_skill[i]
                } as IHuanjingZhushenSkillItemData;
            }
        }
    }
}