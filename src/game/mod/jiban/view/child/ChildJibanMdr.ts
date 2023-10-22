namespace game.mod.jiban {

    import ChildJibanConfig = game.config.ChildJibanConfig;

    export class ChildJibanMdr extends MdrBase {
        private _view: JibanBaseView = this.mark("_view", JibanBaseView);
        private _proxy: IChildProxy;
        private _selIdx = 0;
        private _listData: eui.ArrayCollection;
        private _selCfg: ChildJibanConfig;

        protected onInit() {
            super.onInit();
            this._proxy = getProxy(ModName.Xianyuan, ProxyType.Child);
            this._view.list_item.itemRenderer = JibanBaseRender;
            this._view.list_item.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners() {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct);
            this.onNt(XianyuanEvent.ON_UPDATE_CHILD_JIBAN_INFO, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updatePower, this);
        }

        protected onShow() {
            super.onShow();

            this.onUpdateView();
        }

        protected onHide() {
            super.onHide();
            this._selCfg = null;
            this._selIdx = 0;
        }

        private onUpdateView(): void {
            this.updateList();
            this.updateView();
        }

        private updateList(): void {
            let cfgList: ChildJibanConfig[] = getConfigListByName(ConfigName.ChildJiban);
            let list: IJibanBaseRenderData[] = [];
            for (let cfg of cfgList) {
                let itemData: IJibanBaseRenderData = {
                    cfg,
                    showHint: this._proxy.getHintByJibanIndex(cfg.index),
                    isActed: this._proxy.isActedJiban(cfg.index)
                };
                list.push(itemData);
            }
            // list.sort((a, b) => {
            //     if (a.hint != b.hint) {
            //         return a.hint ? -1 : 1;
            //     }
            //     return a.cfg.index - b.cfg.index;
            // });
            this._listData.replaceAll(list);

            if (this._selCfg) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].cfg.index == this._selCfg.index) {
                        this._selIdx = i;
                        break;
                    }
                }
            } else {
                this._selIdx = 0;
                this._selCfg = list[this._selIdx].cfg;
            }
            this._view.list_item.selectedIndex = this._selIdx;
        }

        private updateView(): void {
            if (!this._selCfg) {
                return;
            }

            this.updateIcon();
            this.updatePower();
            this.updateAct();

            this._view.img_icon.source = `jiban_icon_${ConfigHead.Child}`;
            this._view.img_name.source = `jiban_name_${ConfigHead.Child}_${this._selCfg.index}`;
            this._view.img_eff.source = `jiban_${ConfigHead.Child}_${this._selCfg.index}`;
            this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
        }

        private updateIcon(): void {
            let partners = this._selCfg.partners || [];
            let len = partners.length;
            this._view.currentState = len + '';

            for (let i = 0; i < 6; i++) {
                let icon = this._view[`item${i}`] as JibanBaseItemRender;
                if (!icon) {
                    continue;
                }
                icon.visible = i < len;
                if (!icon.visible) {
                    continue;
                }
                let iconData: IJibanBaseItemRenderData = {
                    jibanCfg: this._selCfg,
                    cfg: getConfigByNameId(ConfigName.Child, partners[i]),
                    showHint: this._proxy.canActJibanChild(this._selCfg.index, partners[i]),
                    isActed: this._proxy.isJibanChildActed(this._selCfg.index, partners[i]),
                    headType: ConfigHead.Child
                };
                icon.data = iconData;
                this._view.img_item.source = `surface_${iconData.headType}_${this._selCfg.index}`;
            }
        }

        private updatePower(): void {
            if (!this._selCfg) {
                return;
            }
            let info = this._proxy.getJibanInfo(this._selCfg.index);
            let attr = info ? info.jiban_attr : null;
            if (!attr) {
                attr = RoleUtil.getAttr(this._selCfg.property);
            }
            this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
            this._view.god_item.updateGod(attr && attr.god ? attr.god : 0);
        }

        private updateAct(): void {
            let isAct = this._proxy.isActedJiban(this._selCfg.index);
            this._view.img_act.visible = isAct;
            this._view.btn_act.visible = this._view.lab_tips.visible = !isAct;
            if (isAct) {
                return;
            }
            let info = this._proxy.getJibanInfo(this._selCfg.index);
            let partners = this._selCfg.partners.length;
            let actedLen = info && info.child_index ? info.child_index.length : 0;
            let str = `激活所有${this._selCfg.name}子女` + TextUtil.addColor(`(${actedLen}/${partners})`, actedLen >= partners ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(str);
            this._view.btn_act.setHint(this._proxy.canActJiban(this._selCfg.index));
        }

        private onClickItem(e: eui.ItemTapEvent): void {
            let idx = e.itemIndex;
            if (idx == this._selIdx) {
                return;
            }
            this._selIdx = idx;
            this._selCfg = (e.item as IJibanBaseRenderData).cfg;
            this.updateView();
        }

        private onClickAct(): void {
            if (this._selCfg && this._proxy.canActJiban(this._selCfg.index, true)) {
                this._proxy.c2s_child_oper_jiban(this._selCfg.index, null);
            }
        }
    }

}