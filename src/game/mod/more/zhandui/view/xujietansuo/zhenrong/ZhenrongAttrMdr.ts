namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import attributes = msg.attributes;
    import LegionBuffConfig = game.config.LegionBuffConfig;
    import HuashenConfig = game.config.HuashenConfig;

    export class ZhenrongAttrMdr extends MdrBase {
        private _view: ZhenrongAttrView = this.mark("_view", ZhenrongAttrView);
        private _proxy: XujieTansuoProxy;
        private _listData: eui.ArrayCollection;
        private _slProxy: IShenLingProxy;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._slProxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._view.listAttr1.itemRenderer = AttrItemRender;
            this._view.listAttr1.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.xujietansuo_tips23));
            this._view.name0.setTitle(TextUtil.getAttrsText(AttrKey.legion_god));
            this._view.name1.setTitle(getLanById(LanDef.passive_skill));

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let legionAttr = this._proxy.legion_attr;
            let attrs = new attributes();
            if (legionAttr) {
                let keys = Object.keys(legionAttr);
                for (let key of keys) {
                    if (key == AttrKey.legion_god) {
                        continue;
                    }
                    attrs[key] = legionAttr[key];
                }
            }
            this._view.listAttr0.updateAttr(attrs);
            let legionGod = legionAttr[AttrKey.legion_god] || 0;
            this._view.power.setPowerValue(legionGod, '军团仙力:');

            let list: string[] = [];
            for (let type of LegionTypeAry) {
                let idList = this._proxy.getShangzhenIdList(type);
                if (type == LegionType.Shenling) {
                    for (let id of idList) {
                        let info = this._slProxy.getInfoByIndex(id);
                        let slCfg = this._slProxy.getShenLingCfg(id);
                        let starCfg = this._slProxy.getStarCfg(id, info && info.star);
                        if (starCfg && starCfg.legion_buff) {
                            list.push(slCfg.name + ': ' + this.getLegionBuffDesc(starCfg.legion_buff));
                        }
                    }
                } else if (type == LegionType.Huashen) {
                    for (let id of idList) {
                        let huashenCfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, id);
                        if (huashenCfg && huashenCfg.legion_buff) {
                            list.push(huashenCfg.name + ': ' + this.getLegionBuffDesc(huashenCfg.legion_buff));
                        }
                    }
                } else {
                    // todo 女神的
                }
            }
            this._listData.replaceAll(list);
        }

        //军团buff描述
        private getLegionBuffDesc(buffId: number): string {
            let legionBuffCfg: LegionBuffConfig = getConfigByNameId(ConfigName.LegionBuff, buffId);
            return TextUtil.addColor(legionBuffCfg && legionBuffCfg.desc || '', WhiteColor.GREEN);
        }
    }
}