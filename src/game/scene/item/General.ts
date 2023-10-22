namespace game.scene {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class General extends Partner {

        constructor() {
            super();
            this._enType = ObjectType.PET;
        }

        public get vo(): PetVo {
            return <PetVo>this._vo;
        }

        public set vo(value: PetVo) {
            this._vo = value;
        }

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.resType = ConfigHead.Shenling;
        }

        public onDie(): void {
            super.onDie();
        }

        public get act(): string {
            return this._act;
        }

        public set act(value: string) {
            let self = this;
            if (!value) {
                return;
            }
            self._act = value;
            self.avatar.setAct(value);
        }

        protected getBodyHeight(): number {
            return 150 * gso.avatarScale;
        }

        protected onAdded() {
            super.onAdded();
            this.updateEvolve();
        }

        protected initUpdateCb() {
            super.initUpdateCb();
            this.regUpdateCb('evolve', this.updateEvolve);
        }

        public onNameChanged(): void {
            // let self = this;
            // if (!self._headMgr) return;
            // if (self.vo.name) {
            //     let color = ColorUtil.getColorByQuality(this.getQuality());
            //     self._headMgr.setName(self.vo.name, color);
            // }
        }

        //神灵进化次数更新
        public updateEvolve(): void {
            let self = this;
            let index = self.vo.index;
            let cfg: ShenlingConfig = getConfigById(index);
            let head = PropData.getPropParse(index, PropParseType.Type);
            let evolve = self.vo.evolve;//进化次数 或者 女仆中的幻化等级
            if (head == ConfigHead.Shenling && evolve) {
                let name: string = cfg.name;
                if (cfg.names) {
                    let names = cfg.names.split(',');
                    let evolveIdx = Math.max(0, evolve - 1);
                    name = names[evolveIdx];
                }
                self.vo.name = name;
                this.onNameChanged();
                this.updateIndex();
            }
        }

        //获取品质
        public getQuality(): QualityType {
            let index = this.vo.index;
            let cfg = getConfigById(index);
            let head = PropData.getPropParse(index, PropParseType.Type);
            let evolve = this.vo.evolve || 0;//进化次数 或者 女仆中的幻化等级
            if (head == ConfigHead.Shenling && evolve) {
                //可进化神灵的品质
                if (cfg.character) {
                    let initQuality = cfg.character[0];
                    let speQuality = initQuality + Math.max(0, evolve - 1);//特殊品质，黄玄地天
                    return SpecialQuality[speQuality];
                }
            }
            return cfg && cfg.quality || 0;
        }
    }
}