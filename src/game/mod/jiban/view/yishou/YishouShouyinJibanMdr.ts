namespace game.mod.jiban {


    import YishouShouyingSuitConfig = game.config.YishouShouyingSuitConfig;
    import LanDef = game.localization.LanDef;

    export class YishouShouyinJibanMdr extends JibanBaseMdr {
        protected _headType: number = ConfigHead.Shouyin;
        private _yishouProxy: IYishouProxy;

        protected onInit(): void {
            super.onInit();
            this._yishouProxy = getProxy(ModName.Yishou, ProxyType.Yishou);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO, this.onUpdateView, this);
            this.offNt(SurfaceEvent.SURFACE_INFO_UPDATE);
            this.offNt(SurfaceEvent.SURFACE_JIBAN_INFO_UPDATE);
        }

        protected onShow(): void {
            super.onShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let items = this.getJibanCfgList();
            this._itemList.replaceAll(items);
            this.updateModel();
            this.updateAct();
        }

        protected getJibanCfgList(): IJibanBaseRenderData[] {
            let cfgList: YishouShouyingSuitConfig[] = getConfigListByName(ConfigName.YishouShouyinSuit);
            let list: IJibanBaseRenderData[] = [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    showHint: this._yishouProxy.getJibanHint(cfg.index),
                    isActed: this._yishouProxy.isJibanActed(cfg.index)
                });
            }
            return list;
        }

        protected onClickAct() {
            if (!this._selCfg) {
                return;
            }
            let jibanIndex = this._selCfg.index;
            if (!this._yishouProxy.canJibanAct(jibanIndex)) {
                PromptBox.getIns().show(getLanById(LanDef.jiban_tips1));
                return;
            }
            this._yishouProxy.c2s_yishou_shouying_jiban(jibanIndex);
        }

        protected updateAct() {
            let jibanIndex = this._selCfg.index;
            let isActed = this._yishouProxy.isJibanActed(jibanIndex);
            this._view.img_act.visible = isActed;
            this._view.btn_act.visible = this._view.lab_tips.visible = !isActed;

            if (isActed) {
                return;
            }
            this._view.btn_act.setHint(this._yishouProxy.canJibanAct(jibanIndex));
            let tipsStr = "[" + this._selCfg.name + "]" + getLanById(LanDef.jiban_tips2);
            let actedList = this._yishouProxy.getJibanIconActedList(jibanIndex);
            let actedLen = actedList.length;
            let totalLen = this._selCfg.partners.length;
            tipsStr += TextUtil.addColor(`(${actedLen}/${totalLen})`, actedLen >= totalLen ? WhiteColor.GREEN : WhiteColor.RED);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        protected updateModel() {
            let jibanIndex = this._selCfg.index;
            let infos = this._selCfg.partners;
            for (let i = 0; i < this._maxCnt; ++i) {
                let item = this._view["item" + i];
                item.visible = i <= infos.length - 1;
                if (item.visible) {
                    let index = infos[i];
                    let itemData: IJibanBaseItemRenderData = {
                        headType: this._headType,
                        cfg: getConfigById(index),
                        jibanCfg: this._selCfg,
                        isActed: this._yishouProxy.isJibanIconActed(jibanIndex, index),
                        showHint: this._yishouProxy.canJibanIconAct(jibanIndex, index)
                    };
                    item.data = itemData;
                }
            }
            this._view.currentState = infos.length + "";
            this._view.img_item.source = `surface_${this._headType}_${this._selCfg.index}`;
        }

        protected updatePower() {
            let attrId = this._selCfg['group_id'];
            let attr = RoleUtil.getAttr(attrId);
            // let oneAttrId = this._selCfg['once_property'];
            // let oneAttr = RoleUtil.getAttr(oneAttrId);

            // let jibanIndex = this._selCfg.index;
            // let infos = this._selCfg.partners;
            // let actedCnt = 0;
            // for (let i = 0; i < this._maxCnt; ++i) {
            //     if (i <= infos.length - 1) {
            //         let index = infos[i];
            //         let isActed = this._yishouProxy.isJibanIconActed(jibanIndex, index);
            //         if (isActed) {
            //             actedCnt++;
            //         }
            //     }
            // }
            // oneAttr = TextUtil.calcAttr(oneAttr, actedCnt);

            let power = 0;
            let god = 0;
            if (attr && attr.showpower) {
                power += attr.showpower.toNumber();
            }
            // if (oneAttr && oneAttr.showpower) {
            //     power += oneAttr.showpower.toNumber();
            // }
            if (attr && attr.god) {
                god += attr.god;
            }
            // if (oneAttr && oneAttr.god) {
            //     god += oneAttr.god;
            // }
            this._view.power.setPowerValue(power);
            this._view.god_item.updateGod(god);
        }
    }
}