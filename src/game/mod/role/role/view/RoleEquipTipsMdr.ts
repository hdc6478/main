namespace game.mod.role {

    import attributes = msg.attributes;
    import gem_data = msg.gem_data;
    import advanced_master_data = msg.advanced_master_data;
    import EquipmentConfig = game.config.EquipmentConfig;
    import LanDef = game.localization.LanDef;

    export class RoleEquipTipsMdr extends MdrBase {
        private _view: RoleEquipTipsView = this.mark("_view", RoleEquipTipsView);

        protected _showArgs: { data: PropData | number, isSelf?: boolean, isBag?: boolean };
        private _propData: PropData;
        private _isSelf: boolean;
        private _isBag: boolean;//在背包点击的（只展示基础+极品属性）
        private _enhanceProxy: IEnhanceProxy;

        private baseAttr: BaseDescItem;//基础属性
        private jipinAttr: BaseJipinAttrItem;//极品属性
        private baseStrengthen: BaseDescItem;//强化属性
        private roleGemItem: RoleGemItem;//宝石属性
        private baseSuit: BaseDescItem;//套装属性

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
            this._enhanceProxy = getProxy(ModName.Enhance, ProxyType.Enhance);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.onUpdateCommonAttr, this);
            this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            let data = this._showArgs.data;
            this._isSelf = this._showArgs.isSelf;
            this._isBag = this._showArgs.isBag;
            if (data instanceof PropData) {
                this._propData = data;
            } else if (typeof data === 'number') {
                this._propData = PropData.create(data);
            }
            if (!this._propData) {
                return;
            }
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._view.gr_attr.removeChildren();
            this.baseAttr = null;
            this.jipinAttr = null;
            this.baseStrengthen = null;
            this.roleGemItem = null;
            this.baseSuit = null;
        }

        private onUpdateCommonAttr(): void {
            this.updateBaseAttr();
            this._view.baseRoleEquipTips.updatePower(this.getPower());
        }

        private updateView(): void {
            this._view.baseRoleEquipTips.updateTopInfo(this._propData);
            this._view.baseRoleEquipTips.updateBottomInfo(this._propData);

            this.updateScroller();
            this._view.baseRoleEquipTips.updatePower(this.getPower());
        }

        //自动添加组件，自适应布局
        private updateScroller(): void {
            this._view.gr_attr.removeChildren();

            // 基础属性
            this.updateBaseAttr();
            // 极品属性
            this.updateJipinAttr();
            // 强化属性
            this.updateStrengthenAttr();
            // 宝石属性
            this.updateGemAttr();
            // 套装属性
            this.updateSuitAttr();
        }

        private addToGroup(item: eui.Component): void {
            if (!item || item.parent) {
                return;
            }
            this._view.gr_attr.addChild(item);
        }

        //基础属性
        private updateBaseAttr(): void {
            if (!this.baseAttr) {
                this.baseAttr = new BaseDescItem();
            }
            this.addToGroup(this.baseAttr);

            let desc = '';
            let regular_attrs = this._propData.regular_attrs;
            let zengfu_attrs = this._propData.zengfu_attrs;
            if (regular_attrs && Object.keys(regular_attrs).length) {
                let keys = TextUtil.getAttrOrderKeys(regular_attrs);
                for (let i = 0, len = keys.length; i < len; i++) {
                    let key = keys[i];
                    let name = TextUtil.getAttrsText(key);
                    let val = TextUtil.getAttrsPerCent(key, regular_attrs[key]);
                    let zengfuDesc = this.getZengFuAttrDesc(zengfu_attrs, key);
                    desc += (name + TextUtil.addColor(' +' + val, BlackColor.GREEN) + zengfuDesc)
                        + (i == len - 1 ? '' : '\n');
                }
            } else {
                let cfg: EquipmentConfig = this._propData.cfg;
                let attr = RoleUtil.getAttr(cfg.attr_id);
                desc = TextUtil.getAttrTextAdd(attr, BlackColor.GREEN);
            }
            this.baseAttr.updateShow(desc, getLanById(LanDef.ywl_baseAttr));
        }

        //极品属性
        private updateJipinAttr(): void {
            if (!this.jipinAttr) {
                this.jipinAttr = new BaseJipinAttrItem();
            }

            let jipinList = this._propData.jipin_list;
            if (jipinList && jipinList.length) {
                let jipinList = this._propData.jipin_list;
                let haveJipinAttr = jipinList && jipinList.length > 0;
                if (haveJipinAttr) {
                    this.addToGroup(this.jipinAttr);
                    this.jipinAttr.updateShow(jipinList, getLanById(LanDef.jipinshuxing));
                }
                return;
            }

            let cfg = this._propData.cfg as EquipmentConfig;
            if (cfg && cfg.jiping) {
                this.addToGroup(this.jipinAttr);
                this.jipinAttr.updateEquipJipinDesc(this._propData.index);
            }
        }

        // 强化属性
        private updateStrengthenAttr(): void {
            if (!this.baseStrengthen) {
                this.baseStrengthen = new BaseDescItem();
            }
            let strength_attr = this.getStrengthAttrs();
            let haveStrengthAttr = this._isBag ? false : strength_attr && Object.keys(strength_attr).length > 0;
            if (haveStrengthAttr) {
                let strength_lv = this.getStrength();
                this.baseStrengthen.updateShow(TextUtil.getAttrTextAdd(strength_attr, BlackColor.GREEN),
                    getLanById(LanDef.strength_attr) + `  ${TextUtil.addColor('(+' + strength_lv + ')', BlackColor.GREEN)}`);
                this.addToGroup(this.baseStrengthen);
            }
        }

        //宝石属性
        private updateGemAttr(): void {
            if (!this.roleGemItem) {
                this.roleGemItem = new RoleGemItem();
            }
            let haveGem = !this._isBag;
            if (haveGem) {
                this.roleGemItem.updateView(this._propData, this._isSelf);
                this.addToGroup(this.roleGemItem);
            }
        }

        // 套装属性
        private updateSuitAttr(): void {
            if (!this.baseSuit) {
                this.baseSuit = new BaseDescItem();
            }
            let suitAttr = this.getSuitAttr();
            let haveSuit = this._isBag ? false : suitAttr && Object.keys(suitAttr).length > 0;
            if (haveSuit) {
                this.baseSuit.updateShow(TextUtil.getAttrTextAdd(suitAttr, BlackColor.GREEN), getLanById(LanDef.allmap3));
                this.addToGroup(this.baseSuit);
            }
        }

        private getPower(): number {
            let power = 0;
            if (this.baseAttr && this.baseAttr.parent) {
                let regular_attrs = this._propData.regular_attrs;
                let zengfu_attrs = this._propData.zengfu_attrs;
                if (regular_attrs && Object.keys(regular_attrs).length) {
                    if (regular_attrs && regular_attrs.showpower) {
                        power += regular_attrs.showpower.toNumber();
                    }
                    if (zengfu_attrs && zengfu_attrs.showpower) {
                        power += zengfu_attrs.showpower.toNumber();
                    }
                } else {
                    let attr = RoleUtil.getAttr(this._propData.cfg.attr_id);
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                }
            }
            if (this.jipinAttr && this.jipinAttr.parent) {
                let jipinList = this._propData.jipin_list || [];
                for (let item of jipinList) {
                    if (item && item.jipin_attrs && item.jipin_attrs.showpower) {
                        power += item.jipin_attrs.showpower.toNumber();
                    }
                }
            }
            if (this.baseStrengthen && this.baseStrengthen.parent) {
                let strength_attr = this.getStrengthAttrs();
                if (strength_attr && strength_attr.showpower) {
                    power += strength_attr.showpower.toNumber();
                }
            }
            if (this.roleGemItem && this.roleGemItem.parent) {
                let gemInfo = this.getGems() || [];
                for (let gem of gemInfo) {
                    if (gem && gem.index && gem.attrs && gem.attrs.showpower) {
                        power += gem.attrs.showpower.toNumber();
                    }
                }
            }
            if (this.baseSuit && this.baseSuit.parent) {
                let suitAttr = this.getSuitAttr();
                if (suitAttr && suitAttr.showpower) {
                    power += suitAttr.showpower.toNumber();
                }
            }
            return power;
        }

        /**增幅属性描述*/
        private getZengFuAttrDesc(attrs: attributes, key: string): string {
            let str = '';
            if (attrs && attrs[key]) {
                str = TextUtil.getAttrsPerCent(key, attrs[key]);
            }
            if (!str) {
                return '';
            }
            return TextUtil.addColor(`  (${getLanById(LanDef.zengfu)}+${str})`, BlackColor.BLUE);
        }

        /**强化等级*/
        private getStrength(): number {
            if (this._isSelf) {
                let strength_data: msg.equip_strength_data = this._enhanceProxy.getStrengthInfo(this._propData.index % 10);
                return strength_data && strength_data.strength_lv || 0;
            }
            return this._propData.strength || 0;
        }

        /**强化属性*/
        private getStrengthAttrs(): attributes {
            if (this._isSelf) {
                let strength_data: msg.equip_strength_data = this._enhanceProxy.getStrengthInfo(this._propData.index % 10);
                return strength_data && strength_data.attrs ? strength_data.attrs : null;
            }
            return this._propData.strength_attrs || null;
        }

        /**宝石列表 */
        private getGems(): gem_data[] {
            if (this._isSelf) {
                let pos = this._propData.index % 10;//装备部位
                return this._enhanceProxy.getGemInfo(pos);
            }
            return this._propData.gems || [];
        }

        /**套装属性*/
        private getSuitAttr(): attributes {
            if (this._isSelf) {
                let advancedMaster: advanced_master_data = this._enhanceProxy.getAdvancedMaster();
                return advancedMaster && advancedMaster.attrs ? advancedMaster.attrs : null;
            }
            return this._propData.advanced_master_attrs;
        }
    }
}