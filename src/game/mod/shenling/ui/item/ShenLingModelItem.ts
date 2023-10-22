namespace game.mod.shenling {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class ShenLingModelItem extends eui.Component {
        public gr_eft: eui.Group;
        public nameItem: game.mod.AvatarNameSrItem;

        private _effId: number = 0;
        private _hub: UIEftHub;
        private _proxy: ShenLingProxy;
        private _defaultIdx: number;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenLingModelItemSkin`;
            this._hub = new UIEftHub(this);
            this.touchEnabled = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        /**神灵index*/
        public updateModel(index: number): void {
            let haveEvolve = this._proxy.haveEvolve(index);
            if (!haveEvolve) {
                this.updateDefaultModel(index);
            } else {
                let curQua = this._proxy.getCurEvolvedQuality(index);
                if (curQua == 0) {
                    let qualityRange = this._proxy.getEvolveQualityRange(index);
                    curQua = qualityRange[0];//初始品质
                }
                this.updateEvolveModel(index, curQua);
            }
        }

        /**默认模型，没有进化功能*/
        private updateDefaultModel(index: number): void {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if (!cfg || (this._defaultIdx && this._defaultIdx == index)) {
                return;
            }
            this._defaultIdx = index;
            let name = cfg.name;
            let showIdx = RoleUtil.getNvpuShowIndex();
            if (RoleUtil.getNvpuShenlingId() == index && showIdx && cfg.names) {
                //女仆的幻化神灵处理
                name = cfg.names.split(',')[showIdx - 1];
            }
            this.nameItem.updateShow(name, cfg.quality);
            this.removeEft();

            let surfaceData = this.getSurfaceData(index);
            this._effId = this._hub.add(surfaceData.url, 0, 0, null, 0,
                this.gr_eft, -1, surfaceData && surfaceData.scale || 1);
        }

        /**
         * 神灵进化
         * @param index 神灵id
         * @param quality 要展示的品质
         */
        public updateEvolveModel(index: number, quality: SpecialQualityType): void {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if (!cfg) {
                return;
            }
            let names = cfg.names.split(',');
            let idx = this.getIdx(cfg, quality);
            if (idx < 0) {
                idx = 0;
            }
            this.nameItem.updateShow(names[idx], cfg.quality, quality);
            this.removeEft();
            let surfaceData = this.getSurfaceData(index, idx);
            if (!surfaceData) {
                return;
            }
            this._effId = this._hub.add(surfaceData.url, 0, 0, null, 0,
                this.gr_eft, -1, surfaceData && surfaceData.scale || 1);
        }

        //模型数据
        private getSurfaceData(index: number, evolveIdx?: number): ISurfaceData {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            let modelName = cfg.icon;
            if (evolveIdx != undefined && cfg.subtype && cfg.subtype == 1) {
                //进化神灵
                let icons = cfg.icons.split(',');
                modelName = icons[evolveIdx];
            } else if (RoleUtil.getNvpuShenlingId() == index && RoleUtil.getNvpuShowIndex()) {
                //女仆的幻化神灵
                let icons = cfg.icons.split(',');
                modelName = icons[RoleUtil.getNvpuShowIndex()];
            }
            let modelUrl = ResUtil.getModelUrlByModelName(ConfigHead.Shenling, modelName, Direction.DOWN, ActionName.STAND, true, false);
            let data = ResUtil.getSurfaceData(index, Direction.DOWN, ActionName.STAND, true, false);
            data.url = modelUrl;
            return data;
        }

        //特殊品质转化为索引，从0开始
        private getIdx(cfg: ShenlingConfig, quality: number): number {
            let character = cfg.character;
            let initQua = character[0];
            return quality - initQua;
        }

        public removeModel(): void {
            this.removeEft();
            this._defaultIdx = null;
        }

        private removeEft(): void {
            if (!this._effId) {
                return;
            }
            this._hub.removeEffect(this._effId);
            this._effId = null;
        }
    }

}