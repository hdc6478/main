namespace game.mod.union {

    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;
    import GuildXianshouConfig = game.config.GuildXianshouConfig;

    export class UnionBeastBuffTipsMdr extends MdrBase {
        private _view: SkillNormalTipsView = this.mark("_view", SkillNormalTipsView);
        private _proxy: UnionProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _list: {
            desc: string;
            title: string;
            lineSpacing?: number;
            color?: number;
        }[] = [];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = BaseDescItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.currentState = "power";
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._list = [];

            let lineSpacing = 10;
            let base_attrs = this._proxy.base_attrs;
            let desc_title: string = "全员获得：\n";
            let desc_attr: string = TextUtil.getAttrText(base_attrs, WhiteColor.GREEN, "\n", "+") + "\n";

            let extra_attrs = this._proxy.extra_attrs;
            let extra_desc: string = TextUtil.addColor(`${this._proxy.getExtraAttrJob()}可额外获得：\n`, 0xfff053);
            let extra_attr: string = TextUtil.addColor(TextUtil.getAttrText(extra_attrs, 0xea9e3b, "\n", "+"), 0xea9e3b);
            let desc: string = desc_title + desc_attr;
            if (extra_attrs) {
                desc += extra_desc + extra_attr;
            }
            if (base_attrs || extra_attrs) {
                this._list.push({ desc, title: getLanById(LanDef.general9), lineSpacing });
            }
            this._view.power.setPowerValue(base_attrs && base_attrs.showpower || 0);
            this._view.lab_name.text = `仙兽光环 ${this._proxy.beast_stage}阶`;
            this._view.skill.img_icon.source = "xianshouzhufutubiao";
            this._view.img_type.visible = false;
            this._view.baseDescItem.visible = false;
            this._view.list.visible = true;

            let stage: number = this._proxy.beast_stage;
            let cfg: GuildXianshouConfig = getConfigByNameId(ConfigName.GuildXianshou, stage + 1);
            if (cfg) {
                let next_base_attrs = RoleUtil.getAttr(cfg.attr_id);
                let next_extra_attrs = RoleUtil.getAttr(cfg.extra_attr_id);

                let next_desc_title: string = "全员获得：\n";
                let next_desc_attr: string = TextUtil.getAttrText(next_base_attrs, WhiteColor.GRAY, "\n", "+") + "\n";
                let next_extra_desc: string = TextUtil.addColor(`${this._proxy.getExtraAttrJob()}可额外获得：\n`, WhiteColor.GRAY);
                let next_extra_attr: string = TextUtil.addColor(TextUtil.getAttrText(next_extra_attrs, WhiteColor.GRAY, "\n", "+"), WhiteColor.GRAY);
                let next_desc: string = next_desc_title + next_desc_attr + next_extra_desc + next_extra_attr;
                next_desc = TextUtil.addColor(next_desc, WhiteColor.GRAY);
                this._list.push({ desc: next_desc, title: getLanById(LanDef.general10), lineSpacing });
            }

            this._listData.replaceAll(this._list);
        }
    }
}