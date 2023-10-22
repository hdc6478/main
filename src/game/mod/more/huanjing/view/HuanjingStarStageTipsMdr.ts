namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;

    export class HuanjingStarStageTipsMdr extends MdrBase {
        private _view: HuanjingStarStageTipsView = this.mark("_view", HuanjingStarStageTipsView);
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
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(MoreEvent.ON_UPDATE_HUANJING_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this._showArgs;
            if (!this._systemId) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let starLv = this._proxy.getStarLv(this._systemId);
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            let starBuffId = cfg.star_buff[starLv == 0 ? starLv : starLv - 1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, starBuffId);
            this._view.baseQualityTips.updateShow(buffCfg.buff_quality);
            this._view.skillItem.setIcon(buffCfg.icon);
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(buffCfg.name + ' ' + starLv + '阶', ColorUtil.getColorByQuality2(buffCfg.buff_quality)));

            if (this._proxy.isMaxStarLv(this._systemId)) {
                this._view.currentState = 'max';
                this._view.starstageItem1.visible = false;
                let title = getLanById(LanDef.general9);
                let actDesc = StringUtil.substitute(getLanById(LanDef.huanjing_tips10), [starLv]) + `(已激活)`;
                this._view.starStageItem0.updateShow(title, TextUtil.addColor(actDesc, BlackColor.GREEN), TextUtil.addColor(buffCfg.des, BlackColor.DEFAULT));
                return;
            }

            this._view.currentState = 'default';
            this._view.btn_do.setHint(this._proxy.canActOrUpStar(this._systemId));

            if (starLv == 0) {
                this._view.starstageItem1.visible = false;
                let actNum = this._proxy.getStarActNum(this._systemId, starLv + 1);
                let title = getLanById(LanDef.lingpo_tips3);
                let actDesc = StringUtil.substitute(getLanById(LanDef.huanjing_tips10), [starLv + 1]) + `(${actNum}/${cfg.star_max_pos})`;
                this._view.starStageItem0.updateShow(title, TextUtil.addColor(actDesc, actNum >= cfg.star_max_pos ? BlackColor.GREEN : BlackColor.RED), TextUtil.addColor(buffCfg.des, BlackColor.GRAY));
                return;
            }

            //当前
            let curTitle = getLanById(LanDef.general9);
            let actDesc = StringUtil.substitute(getLanById(LanDef.huanjing_tips10), [starLv]) + `(已激活)`;
            this._view.starStageItem0.updateShow(curTitle, TextUtil.addColor(actDesc, BlackColor.GREEN), TextUtil.addColor(buffCfg.des, BlackColor.DEFAULT));
            //下阶
            this._view.starstageItem1.visible = true;
            let nextActNum = this._proxy.getStarActNum(this._systemId, starLv + 1);
            let nextTitle = getLanById(LanDef.lingpo_tips3);
            let nextActDesc = StringUtil.substitute(getLanById(LanDef.huanjing_tips10), [starLv + 1]) + `(${nextActNum}/${cfg.star_max_pos})`;//todo
            let nextBuffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, cfg.star_buff[starLv]);
            this._view.starstageItem1.updateShow(nextTitle, TextUtil.addColor(nextActDesc, nextActNum >= cfg.star_max_pos ? BlackColor.GREEN : BlackColor.RED), TextUtil.addColor(nextBuffCfg && nextBuffCfg.des || '', BlackColor.GRAY));
        }

        private onClick(): void {
            if (this._proxy.canActOrUpStar(this._systemId, true)) {
                this._proxy.c2s_huanjin_oper(this._systemId, 3);
            }
        }
    }
}