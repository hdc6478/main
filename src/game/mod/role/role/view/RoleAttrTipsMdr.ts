namespace game.mod.role {


    import attributes = msg.attributes;
    import FightpowerConfig = game.config.FightpowerConfig;
    import TouchEvent = egret.TouchEvent;

    /**
     * 角色属性
     */
    export class RoleAttrTipsMdr extends EffectMdrBase {
        private _view: RoleAttrTipsView = this.mark('_view', RoleAttrTipsView);

        private _listData: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit() {
            super.onInit();

            this._view.list_attr.itemRenderer = AttrItemRender;
            this._view.list_attr.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.attr.setListGap(18);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow() {
            super.onShow();

            this.updateXianLiAttr();
            this.updateNormalAttr();
        }

        protected onHide() {
            super.onHide();
            this.removeAllEffects();
        }

        private updateXianLiAttr(): void {
            let vo = RoleVo.ins;
            let god = vo.god || 0;
            let godPower = vo && vo.godpower && vo.godpower.toNumber() || 0;
            let font = BmpTextCfg[BmpTextType.CommonPower2];
            this._view.xianliPower.setPowerValue(StringUtil.getPowerNumStr(god));
            this.addBmpFont(StringUtil.getPowerNumStr(godPower, 2, '战力:'), font, this._view.gr_power,
                true, 1, false, -2, true);

            let attr: attributes = new attributes();
            let keyList = [AttrKey.god_atk, AttrKey.god_def, AttrKey.god_hp];
            for (let key of keyList) {
                attr[key] = vo.getValueByKey(key);
            }
            this._view.attr.updateAttr(attr);
        }

        private updateNormalAttr() {
            let vo = RoleVo.ins;
            let power = vo.showpower && vo.godpower ? vo.showpower.sub(vo.godpower) : vo.showpower;
            this.addBmpFont(StringUtil.getPowerNumStr(power ? power.toNumber() : 0, 2, '战力:'),
                BmpTextCfg[BmpTextType.CommonPower2], this._view.gr_power1,
                true, 1, false, -2, true);

            let cfgList: FightpowerConfig[] = getConfigListByName(ConfigName.Fightpower);
            let attr: attributes = new attributes();
            for (let cfg of cfgList) {
                if (cfg.ishide || cfg.specialflag) {
                    //隐藏属性，特殊属性不显示
                    continue;
                }
                attr[cfg.index] = vo.getValueByKey(cfg.index);
            }
            let infos = TextUtil.getAttrTextInfos(attr);
            this._listData.source = infos;
        }

    }

}