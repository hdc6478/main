namespace game.scene {


    import ShenlingConfig = game.config.ShenlingConfig;

    export class Partner extends BaseActor {

        constructor() {
            super();
        }

        public get vo(): PetVo {
            return <PetVo>this._vo;
        }

        public set vo(value: PetVo) {
            this._vo = value;
        }

        public onAlloc(): void {
            super.onAlloc();
        }

        protected onAdded(): void {
            super.onAdded();
            this.avatar.loadPri = this.vo.isMainPet ? LoadPri.SceneMainPet : LoadPri.Scene;

            this.updateIndex();
        }

        protected initUpdateCb(): void {
            super.initUpdateCb();
            this.regUpdateCb("index", this.updateIndex);
        }

        public onNameChanged(): void {
            if (!this._headMgr) return;
            if (this.vo.name) {
                this._headMgr.setName();
            }
            // let _isEnemy: boolean = SceneTools.isEnemy(this.vo, (<Scene>this.parent).sceneType);
            // let color1 = _isEnemy ? UIColor.RED : UIColor.WHITE;
            // let color2 = this.vo.isMainPet ? UIColor.GREEN : _isEnemy ? UIColor.RED : UIColor.ORANGE;
            // if (this.vo.name) {
            //     this._headMgr.setName();
            // }
            // if (this.vo.master_name) {
            //     let txt = StringUtil.substitute(getLanById(LanDef.partner), [PetObjectName[this.avatar.resType]]);
            //     this._headMgr.setTeamName(txt, color2);
            // }
        }

        protected changeHpShow(): void {
            // if (this._headMgr && this.vo.percent != undefined) {
            //     this._headMgr.setHp(this.vo.percent);
            // }
        }

        protected getBodyHeight(): number {
            return 110 * gso.scaleTexture;
        }

        protected updateIndex(): void {
            if (!this.vo.index) {
                this.setBody(null);
                return;
            }
            let surfIdx: number = this.vo.index;
            // this.vo.percent = 100;
            // this.vo.hp.add(10000);
            // this.vo.max_hp.add(10000);
            let cfg: ShenlingConfig = getConfigById(surfIdx);
            if (!cfg) {
                return;
            }

            let head = PropData.getPropParse(surfIdx, PropParseType.Type);
            this.avatar.resType = head;//10;//head;//config.outlook;//[0];
            this.act = this._act;

            let body: string;
            if (head == ConfigHead.Shenling) {
                //神灵模型
                body = ResUtil.getModelName(surfIdx, Sex.Male, false, this.vo.evolve);
            } else {
                body = ResUtil.getModelName(surfIdx);
            }
            this.setBody(body);
        }

        public onMoveStart(): void {
            this.act = ActionName.RUN;
            // console.log(">>>>>>>model.loop", this.vo.name + "开始移动", this.avatar.loop);
        }

        public getMoveSpeed(mType: number): number {
            return MapData.ins.cellWidth / this.vo.speed;
        }


        public onDie(): void {
            //侍从没有死亡动作 (Y5添加死亡动作)
            super.onDie();
        }

        public onDieEnd(): void {
            //己方伙伴死后不移除
            // if (this.vo && !SceneTools.isMainObj(this.vo.entity_id)) {
            //     super.onDieEnd();
            //     (<SceneDisplay><any>this.dsp).deadZorder = -1;
            // }
        }

        /*** 切换主视角 */
        public setWorldPos(wx: number, wy: number): void {
            super.setWorldPos(wx, wy);
            // if (SceneTools.isFocusEntity(this.vo.entity_id)) {
            //     let scene: Scene = <Scene>this.parent;
            //     scene.updateFocus(wx, wy);
            //     scene.updateShakeFocusPt();
            // }
        }

        public get act(): string {
            return this._act;
        }

        public set act(value: string) {
            if (!value) {
                return;
            }

            // if ((value == ActionName.RUN || value == ActionName.RUN + 1)
            //     && this.avatar.resType == SurfaceType.LingChong) {
            //     value = ActionName.STAND + 1;
            // } else if ((value == ActionName.ATTACK || value == ActionName.ATTACK + 1)
            //     && this.avatar.resType == SurfaceType.WildPet) {
            //     return;
            // }
            //
            this._act = value;
            // // 特殊处理职业模型
            // // this.avatar.weaponType = this.getWeaponType();
            this.avatar.setAct(value);
        }

    }
}