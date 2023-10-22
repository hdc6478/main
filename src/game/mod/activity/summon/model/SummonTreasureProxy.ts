namespace game.mod.activity {

    import c2s_baozangbox_onekey_open = msg.c2s_baozangbox_onekey_open;
    import TreasureboxConfig = game.config.TreasureboxConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    /**
     * @description 召唤-宝藏系统
     */
    export class SummonTreasureProxy extends ProxyBase {
        private _hintPath: string[] = [ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Treasure];

        initialize(): void {
            super.initialize();
        }

        // 一键开启
        public c2s_baozangbox_onekey_open(index?: number): void {
            let msg = new c2s_baozangbox_onekey_open();
            if (index) {
                msg.box_index = index;
            }
            this.sendProto(msg);
        }

        public canOpenOneKey(): boolean {
            let paramCfg = GameConfig.getParamConfigById('treasurebox_batchopen');
            let val: number = paramCfg.value;
            let passProxy: IPassProxy = getProxy(ModName.Pass, ProxyType.Pass);
            let curIndex = passProxy.curIndex;
            return curIndex > val;
        }

        public getConfig(index: number): TreasureboxConfig {
            return getConfigByNameId(ConfigName.TreasureBox, index);
        }

        public getCondStr(): string {
            if (this.canOpenOneKey()) {
                return '';
            }
            let paramCfg = GameConfig.getParamConfigById('treasurebox_batchopen');
            let val: number = paramCfg.value;
            let layer = val % 100;
            return StringUtil.substitute(getLanById(LanDef.summon_treasure_tips3), [layer]);
        }

        public canOneKey(isTips = false): boolean {
            if (!this.canOpenOneKey()) {
                return false;
            }
            if (this.getAllHint()) {
                return true;
            }
            if (isTips) {
                PromptBox.getIns().show(getLanById(LanDef.summon_treasure_tips4));
            }
            return false;
        }

        public canOneKeyByIndex(index: number, isTips = false): boolean {
            let cfg = this.getConfig(index);
            if (!cfg) {
                return false;
            }
            return BagUtil.checkPropCnt(cfg.itemid, cfg.cost, isTips ? PropLackType.Dialog : PropLackType.None);
        }

        public getAllHint(): boolean {
            let cfgList: TreasureboxConfig[] = getConfigListByName(ConfigName.TreasureBox);
            for (let cfg of cfgList) {
                if (this.canOneKeyByIndex(cfg.index)) {
                    return true;
                }
            }
            return false;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.SummonTreasure)) {
                return;
            }
            let hint = this.getAllHint();
            HintMgr.setHint(hint, this._hintPath);
        }

        protected onBagUpdateByBagType(n: GameNT) {
            let types = n.body as number[];
            if (types.indexOf(BagType.BaozangSuipian) > -1) {
                this.updateHint();
            }
        }
    }
}