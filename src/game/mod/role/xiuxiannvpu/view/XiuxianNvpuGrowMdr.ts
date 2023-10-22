namespace game.mod.role {

    import AyahLevelConfig = game.config.AyahLevelConfig;
    import AyahEventFuncConfig = game.config.AyahEventFuncConfig;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuGrowMdr extends EffectMdrBase {
        private _view: XiuxianNvpuGrowView = this.mark("_view", XiuxianNvpuGrowView);
        private _proxy: XiuxianNvpuProxy;
        private _effId: number;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list.itemRenderer = BaseZhuangshiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_renewal.setImage('xufei');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            addEventListener(this._view.btn_guaji, egret.TouchEvent.TOUCH_TAP, this.onClickGuaji, this);
            addEventListener(this._view.btn_like, egret.TouchEvent.TOUCH_TAP, this.onClickLike, this);
            addEventListener(this._view.btn_offline, egret.TouchEvent.TOUCH_TAP, this.onClickOffline, this);
            addEventListener(this._view.btn_renewal, egret.TouchEvent.TOUCH_TAP, this.onClickRenewal, this);

            this.onNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this.removeEffect(this._effId);
            this._effId = null;
        }

        private updateView(): void {
            let hourExp = GameConfig.getParamConfigById('ayah_exp').value;
            this._view.lb_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xiuxiannvpu_tips8) + `：` + TextUtil.addColor(hourExp, 0x00ff00));

            if (this._proxy.isMaxLevel()) {
                this._view.bar.showMax();
            } else {
                let nextCfg: AyahLevelConfig = getConfigByNameId(ConfigName.XiuxianNvpuLevel, this._proxy.level + 1);
                this._view.bar.show(this._proxy.exp, nextCfg.exp, false, this._proxy.level, true, ProgressBarType.Value);
            }

            this.addBmpFont(this._proxy.day + '', BmpTextCfg[BmpTextType.XiuxianNvpu], this._view.gr_day, true, 1, false, 0, true);
            this._view.btn_like.data = {showHint: false, level: this._proxy.level};

            this._view.btn_gift.setHint(this._proxy.getGiftHint());

            this.updateListData();
            this.updateModel();
        }

        private updateListData(): void {
            let level = this._proxy.level;
            let cfgList: AyahLevelConfig[] = getConfigListByName(ConfigName.XiuxianNvpuLevel);
            let strList: string[] = [];
            for (let cfg of cfgList) {
                if (cfg.level > level) {
                    continue;
                }
                for (let id of cfg.event_list) {
                    let cfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, id);
                    if (!cfg || !cfg.open_func) {
                        continue;
                    }
                    let funcCfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, cfg.open_func);
                    if (funcCfg) {
                        strList.push(getLanById(LanDef.xiuxiannvpu_tips7) + funcCfg.name);
                    }
                }
            }
            this._listData.replaceAll(strList);
        }

        private updateModel(): void {
            let showIndex = this._proxy.show_index;
            let shenlingCfg = this._proxy.shenlingCfg;
            if (!shenlingCfg) {
                return;
            }
            let name = shenlingCfg.names.split(',')[Math.max(0, showIndex - 1)];
            this._view.nameItem.updateShow(name, shenlingCfg.quality);
            let icon = shenlingCfg.icons.split(',')[Math.max(0, showIndex - 1)];
            let modelUrl = ResUtil.getModelUrlByModelName(ConfigHead.Shenling, icon, Direction.DOWN, ActionName.STAND, true, false);
            let data = ResUtil.getSurfaceData(shenlingCfg.index, Direction.DOWN, ActionName.STAND, true, false);
            this.removeEffect(this._effId);
            this._effId = this._effHub.add(modelUrl, 0, 0, null, 0, this._view.gr_model, -1, data && data.scale || 1);
        }

        private onClickGift(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.XiuxianNvpuGiftMain);
        }

        private onClickGuaji(): void {
            ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.XiuxianNvpuOnlineSetting);
        }

        private onClickLike(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.XiuxianNvpuLike);
        }

        private onClickOffline(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.XiuxianNvpuOfflineSetting);
        }

        private onClickRenewal(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.XiuxianNvpuBuy);
        }
    }
}