namespace game.mod {

    import facade = base.facade;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class SurfaceUtil {
        private static _proxy: ISurfaceProxy;
        private static _sProxy: IShenLingProxy;
        private static _lProxy: ILingChongProxy;

        private static initProxy(): void {
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this._sProxy = facade.retMod(ModName.Shenling).retProxy(ProxyType.Shenling);
            this._lProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Lingchong);
        }

        /**
         *外显是否激活
         * @param index，外显index
         */
        public static isAct(index: number): boolean {
            if (!this._proxy) {
                this.initProxy();
            }
            let star = this.getStar(index);
            return star > 0;
        }

        /**
         *获取外显星级
         * @param index，外显index
         */
        public static getStar(index: number): number {
            if (!this._proxy) {
                this.initProxy();
            }
            let star = 0;
            let headType = PropData.getPropParse(index, PropParseType.Type);
            switch (headType) {
                case ConfigHead.Shenling:
                    let info = this._sProxy.getInfoByIndex(index);
                    star = info && info.star || 0;
                    break;
                case ConfigHead.Lingchong:
                    let lcInfo = this._lProxy.getInfo(index);
                    star = lcInfo && lcInfo.star || 0;
                    break;
                default:
                    star = this._proxy.getSurfacePerStar(index);
                    break;
            }
            return star;
        }

        /**
         * 获取配置最大星级
         * @param index
         */
        public static getMaxStar(index: number): number {
            if (!this._proxy) {
                this.initProxy();
            }
            let headType = PropData.getPropParse(index, PropParseType.Type);
            let maxStar: number;
            switch (headType) {
                case ConfigHead.Shenling:
                    maxStar = this._sProxy.getMaxStar(index);
                    break;
                case ConfigHead.Lingchong:
                    maxStar = this._lProxy.getMaxStar(index);
                    break;
                default:
                    maxStar = this._proxy.getSurfaceMaxStar(headType);
            }
            return maxStar;
        }

        /**
         * 外显能否激活或升星
         * @param index 外显id
         * @param isShenlingAwaken 是否包含神灵觉醒阶段的升星，默认不包含
         */
        public static canUpStar(index: number, isShenlingAwaken = false): boolean {
            if (!this._proxy) {
                this.initProxy();
            }
            let headType = PropData.getPropParse(index);
            if (headType == ConfigHead.Shenling) {
                let hint = this._sProxy.canUpStar(index);
                if (isShenlingAwaken && hint == false) {
                    hint = this._sProxy.canAwaken(index);
                }
                return hint;
            } else if (headType == ConfigHead.Lingchong) {
                return this._lProxy.canUpStar(index);
            }
            return this._proxy.canUpStar(index);
        }

        /**主动技能*/
        public static getSurfaceSkillId(headType: number): number {
            if (!this._proxy) {
                this.initProxy();
            }
            return this._proxy.getSurfaceSkillId(headType);
        }

        /**外显等级计算阶级*/
        public static calcSurfaceStage(lv: number, headType: number): number {
            if (!lv) {
                return 0;//防报错
            }
            if (!this._proxy) {
                this.initProxy();
            }
            let perLv = this._proxy.getSurfacePerLv(headType);
            return Math.ceil(lv / perLv);
        }

        /**
         * 获取当前玩家的神灵进化次数或女仆神灵幻化等级
         * @param index
         */
        public static getShenlingEvolution(index: number): number {
            if (index == RoleUtil.getNvpuShenlingId()) {
                return RoleUtil.getNvpuShowIndex();
            }
            let info = this._sProxy.getInfoByIndex(index);
            return info && info.evolutions || 0;
        }

        /**
         * 获取神灵信息
         * @param index
         * @param evolutions 神灵进化次数或者女仆神灵幻化等级。不传则使用当前玩家的
         */
        public static getShenlingModelData(index: number, evolutions?: number): ShenlingModelData {
            let cfg: ShenlingConfig = getConfigByNameId(ConfigName.Shenling, index);
            if (!cfg) {
                return null;
            }

            if (evolutions == undefined) {
                evolutions = this.getShenlingEvolution(index);
            }
            if (evolutions == 0) {
                return {
                    index: index,
                    name: cfg.name,
                    icon: cfg.icon,
                    quality: cfg.quality
                };
            }

            let idx = Math.max(0, evolutions - 1);
            let specialQuality = 0;
            if (cfg.character) {
                let initQuality = cfg.character[0] || 0;
                specialQuality = initQuality + Math.max(0, evolutions - 1);
            }
            return {
                index: index,
                quality: SpecialQuality[specialQuality] || cfg.quality,
                specialQuality: specialQuality,
                name: cfg.names && cfg.names.split(',')[idx] || cfg.name,
                icon: cfg.icons && cfg.icons.split(',')[idx] || cfg.icon
            };
        }
    }
}