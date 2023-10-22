namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;

    export class XianjieLuandouSkillTipsMdr extends MdrBase {
        private _view: XianjieLuandouSkillTipsView = this.mark("_view", XianjieLuandouSkillTipsView);
        private _proxy: XianjieLuandouProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCENE_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let bossKillCount = this._proxy.boss_kill_count;
            let cfg = GameConfig.getParamConfigById('xianjieluandou_lingshi_buff');
            let cfgValue = cfg.value as number[][];
            let value = cfgValue[bossKillCount];
            let buffId = value[1];
            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if (!buffCfg) {
                return;
            }
            this._view.img_skill.source = buffCfg.icon;
            this._view.lb_name.text = buffCfg.name;
            this._view.baseQualityTips.updateShow(buffCfg.buff_quality);

            this._view.baseDescItem0.updateShow(buffCfg.des, getLanById(LanDef.dragon_skill_desc));

            let nextValue = cfgValue[bossKillCount + 1];
            this._view.baseDescItem1.visible = !!nextValue;
            if (nextValue) {
                let nextBuffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, nextValue[1]);
                let desc = TextUtil.addColor(nextBuffCfg && nextBuffCfg.des || '', BlackColor.GRAY);
                this._view.baseDescItem1.updateShow(desc, getLanById(LanDef.lingpo_tips3));
            }
        }
    }
}