namespace game.mod.god {

    import TiandiTianlongJihuoConfig = game.config.TiandiTianlongJihuoConfig;
    import BuffConfig = game.config.BuffConfig;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;

    export class GodDragonoathBuffTipsMdr extends MdrBase {
        private _view: SkillNormalTipsView = this.mark("_view", SkillNormalTipsView);
        /**技能id，等级*/
        public _showArgs: { index: number };
        private _proxy: GodProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = BaseDescItem;
            this._view.list.dataProvider = this._listData;
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list = [];
            let buff: number[] = this._proxy.getBuff(this._showArgs.index);
            let buffcfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buff[1]);
            this._view.skill.setData(buffcfg.index);
            let lineSpacing = 10;
            list.push({desc: buffcfg.des, title: getLanById(LanDef.general9), lineSpacing});
            this._view.currentState = buffcfg.powershow ? "power" : "default";
            if (buffcfg.powershow) {
                this._view.power.setPowerValue(buffcfg.powershow);
            }
            this._view.lab_name.text = buffcfg.name;
            this._view.img_type.visible = false;
            this._view.baseDescItem.visible = false;
            this._view.list.visible = true;

            let cfg: TiandiTianlongJihuoConfig = getConfigByNameId(ConfigName.TiandiTianlongJihuo, this._showArgs.index);
            for (let b of cfg.buffs) {
                if (b[0] == buff[0] + 1) {
                    let nextbuffcfg: BuffConfig = getConfigByNameId(ConfigName.Buff, b[1]);
                    list.push({desc: nextbuffcfg.des, title: getLanById(LanDef.general10), lineSpacing});
                    break;
                }
            }

            this._listData.replaceAll(list);
        }
    }
}