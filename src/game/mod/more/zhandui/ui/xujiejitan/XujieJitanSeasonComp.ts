namespace game.mod.more {

    import BuffConfig = game.config.BuffConfig;
    import NewPrivilegeConfig = game.config.NewPrivilegeConfig;
    import ZhanduiJitanHuanhuaConfig = game.config.ZhanduiJitanHuanhuaConfig;

    export class XujieJitanSeasonComp extends BaseStageEventItem {
        public list: eui.List;

        private _proxy: XujieJitanProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.more.XujieJitanSeasonCompSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
            this.list.itemRenderer = XujieJitanSeacomItem;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        public updateShow(): void {
            let list: { isActed: boolean, txt: string }[] = [];
            let lv = this._proxy.jitan_level;

            let lvCfg = this._proxy.getLvConfig(lv || 1);// 若为0级时，则展示1级的buff效果等
            if (lvCfg && lvCfg.buff_ids) {
                for (let buffId of lvCfg.buff_ids) {
                    let buffCfg = this.getBuffCfg(buffId);
                    if (buffCfg) {
                        list.push({
                            txt: buffCfg.des,
                            isActed: lvCfg.level <= lv
                        });
                    }
                }
            }
            if (lvCfg && lvCfg.special_ids) {
                for (let id of lvCfg.special_ids) {
                    let cfg = this.getPrivilegeCfg(id);
                    if (cfg) {
                        list.push({
                            txt: cfg.desc,
                            isActed: lvCfg.level >= lv
                        });
                    }
                }
            }

            let huanhuaCfgs: ZhanduiJitanHuanhuaConfig[] = getConfigListByName(ConfigName.ZhanduiJitanHuanhua);
            for (let huanhuaCfg of huanhuaCfgs) {
                let info = this._proxy.getHuanhuaInfo(huanhuaCfg.index);
                let star = info && info.star || 0;
                let maxStar = huanhuaCfg.costs.length;
                if (star >= maxStar) {
                    star--;
                }
                let isActed = star > 0;
                if (huanhuaCfg.buff_ids) {
                    let buffId = huanhuaCfg.buff_ids[star];
                    let buffCfg = this.getBuffCfg(buffId);
                    if (buffCfg) {
                        list.push({
                            txt: buffCfg.des,
                            isActed: isActed
                        });
                    }
                }
                if (huanhuaCfg.special_ids) {
                    let id = huanhuaCfg.special_ids[star];
                    let cfg = this.getPrivilegeCfg(id);
                    if (cfg) {
                        list.push({
                            txt: cfg.desc,
                            isActed: isActed
                        });
                    }
                }
            }
            this._listData.replaceAll(list);
        }

        private getBuffCfg(id: number): BuffConfig {
            return getConfigByNameId(ConfigName.Buff, id);
        }

        private getPrivilegeCfg(id: number): NewPrivilegeConfig {
            return getConfigByNameId(ConfigName.NewPrivilege, id);
        }
    }
}