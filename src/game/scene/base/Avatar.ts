namespace game.scene {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import DisplayObject = egret.DisplayObject;
    import delayCall = base.delayCall;
    export class Avatar extends BaseDraw {
        //下载的优先顺序
        public loadPri: number;
        //身体其他部位
        private readonly _partMap: { [idx: number]: AvatarPart } = {};
        //主模型
        private _ctrl: AnimCtrl;

        //坐骑
        private _ctrlHorse:AnimCtrl;

        //buff 特效
        // private _buffCtrl: AnimCtrl;

        private _soulWareCtrl: AnimCtrl;
        //private _adventGodCtrl: AnimCtrl;

        //外观类型
        public resType: number;
        //是否降神攻击，用于区分神降攻击和玩家攻击
        //private _isAdventGodAtk: boolean;
        private _fixFrame: number;

        //动作名称
        private _act: string;
        //方向
        private _dir: number;

        //对象类型
        public objType: number;

        //是否循环播放
        public loop: boolean;

        private _close: boolean;

        private _bodyIsShow = false;

        private _ower:BaseActor;

        private _durationN:number = 50;

        public set ower(ower:BaseActor){
            this._ower = ower;
        }

        public get ower():BaseActor{
            return  this._ower;
        }

        public set close(v: boolean) {
            this._close = v;
            if (v) return;
            for (let k in this._partMap) {
                let part = this._partMap[k];
                Pool.release(part);
                this._partMap[k] = null;
                delete this._partMap[k];
            }
            this._bodyIsShow = false;
        }

        public get close(): boolean {
            return this._close;
        }

        public get bodyIsShow():boolean{
            return this._bodyIsShow;
        }

        public set bodyIsShow(ret:boolean){
             this._bodyIsShow = ret;
        }

        // public getSoulWareDsp(): DisplayObject {
        //     let sw = this._partMap[ConfigHead.Body];
        //     if (!sw) return null;
        //     return sw.display;
        // }

        public getAvatarPart(type: number): AvatarPart {
            return this._partMap[type];
        }

        public set onComplete(value: Handler) {
            this._ctrl.compHandler = value;
        }

        public get isComplete() {
            return this._ctrl.isComplete;
        }

        // public set onHorseComplete(value: Handler) {
        //     this._ctrlHorse.compHandler = value;
        // }
        //
        // public get isHorseComplete() {
        //     return this._ctrlHorse.isComplete;
        // }

        public advanceTime(elapseTime: number) {
            if (this.close) {
                return;
            }
            for (let k in this._partMap) {
                let part: AvatarPart = this._partMap[k];
                if (part.srcUpdate) {
                    part.loadCfg();
                }
            }
            if (this._ctrl) {
                this._ctrl.advanceTime(elapseTime);
            }

            if(this._ctrlHorse){
                this._ctrlHorse.advanceTime(elapseTime);
            }

            // if (this._buffCtrl) {
            //     this._buffCtrl.advanceTime(elapseTime);
            // }
            if (this._soulWareCtrl) {
                this._soulWareCtrl.advanceTime(elapseTime);
            }
            // if (this._adventGodCtrl) {
            //     this._adventGodCtrl.advanceTime(elapseTime);
            // }
        }

        private updatePart(part: AvatarPart, id: string, act: string, dir: number): void {
            part.setSrc(id, act, dir);
        }

        public setPart(partIdx: number, id: string,func?:Handler) {
            let self = this;
            if (self.close) {
                return;
            }

            let part = self._partMap[partIdx];
            if (id == null) {
                Pool.release(part);
                self._partMap[partIdx] = null;
                delete self._partMap[partIdx];
                if (partIdx == ConfigHead.Horse) {
                    this.updatePartMap();
                }
                return;
            }
            if (!part) {
                self._partMap[partIdx] = part = Pool.alloc(AvatarPart);
                if (partIdx == ConfigHead.Body || partIdx == ConfigHead.Wing || partIdx == ConfigHead.Weapon
                    || partIdx == ConfigHead.Huashen || partIdx == ConfigHead.Huashen2) {
                    part.setLoadCb(Handler.alloc(self, self.onPartLoadCfg));

                    if(partIdx == ConfigHead.Huashen || partIdx == ConfigHead.Huashen2){
                        this.dsp.x = -100;
                        // if(this._dir == Direction.LEFT_DOWN ){ //6
                        //     this.dsp.x = -100;
                        // } else if(this._dir == Direction.LEFT ){ //7
                        //     this.dsp.x = -100;
                        // }else if(this._dir == Direction.LEFT_UP){ //8
                        //     this.dsp.x = -100;
                        // }else if(this._dir == Direction.RIGHT){ //3
                        //     this.dsp.x = -100;
                        // } else if(this._dir == Direction.RIGHT_UP){ //2
                        //     this.dsp.x = -100;
                        // }else if(this._dir == Direction.RIGHT_DOWN){ //4
                        //     this.dsp.x = -100;
                        // }

                    }else{
                        this.dsp.x = 0;
                    }
                    //self.updatePartMap();
                }

                if(partIdx == ConfigHead.Horse || partIdx == ConfigHead.Horse2){
                    part.setLoadCb(Handler.alloc(self, self.onPartHorseLoadCfg));
                    //self.updatePartMap();
                }

                // if (partIdx == ConfigHead.Gory) {
                //     part.setLoadCb(Handler.alloc(self, self.onBuffLoadCfg));
                // }
                // if (partIdx == ConfigHead.AdventGod) {
                //     part.setLoadCb(Handler.alloc(self, self.onAdventGodLoadCfg));
                // }
                part.loadPri = self.loadPri;
                part.init(partIdx, self.resType);

                // if(partIdx == ConfigHead.Body){
                //     this._bodyIsShow = false;
                //     part.setSrc(id, self._act, self._dir,Handler.alloc(this,function(data:any){
                //         delayCall(Handler.alloc(self,function () {
                //             self._bodyIsShow = true;
                //         }),1000);
                //     }));
                // }else{
                    part.setSrc(id, self._act, self._dir);
                //}

            }
            let act_name: string = self._act;
            /**更新坐骑部位2时，动作需要+1*/
            if (partIdx == ConfigHead.Horse2) {
                act_name = act_name + 2;
            }
            self.updatePart(part, id, act_name, self._dir);
        }

        public resetActDir(): void {
            this._act = ActionName.STAND;
            this._dir = Direction.RIGHT_UP;
            this._fixFrame = null;
        }

        public setAct(act: string): void {
            // if(this._ower.enType == ObjectType.PLAYER){
            //     console.log("act = " + act);
            // }

            let self = this;
            if (act == self._act) {
                self.updatePartMap();
                return;
            }

            self._act = act;
            self.updatePartMap();
        }

        public setDir(dir: number): void {
            let self = this;
            // if (dir == self._dir) {
            //     return;
            // }
            self._dir = dir;
            self.updatePartMap();
        }

        private updatePartMap() {
            let self = this;
            if (self._ctrl) {
                self._ctrl.stop();
            }
            self.resetDurationN();

            if (self._ctrlHorse) {
                self._ctrlHorse.stop();
            }


            // if (this._adventGodCtrl) {
            //     this._adventGodCtrl.stop();
            // }
            //let isPlayer = self.objType == ObjectType.PLAYER;
            //let isRide = isPlayer && self._partMap[ConfigHead.Horse] != null;
            for (let k in self._partMap) {
                let type = Number(k);
                let part: AvatarPart = self._partMap[k];
                let act_name: string = self._act;
                // if (false && isRide && (RideNoRun.indexOf(type) > -1) && self._act != ActionName.JUMP + 3) {
                //     //act_name = type == ConfigHead.Body ? ActionName.RIDE : ActionName.STAND;
                //    //act_name = ActionName.STAND;
                //     //part.display.y = type == ConfigHead.Body ? 0 : 60;
                // } else
                // if (self.resType == ConfigHead.SoulWare) {
                //     // part.display.y = FaBaoRightPt.y;  // 不需要重置display的y
                // }
                // else{
                    part.display.y = 0;
                // }
                if (type == ConfigHead.Horse2) {
                    act_name = self._act + 2;
                }

                self.updatePart(part, part.getId(), act_name, self._dir);
            }
        }

        /** 设置固定帧 */
        public setFixFrame(frame: number) {
            this._fixFrame = frame;
        }

        private onFrameChanged(frame: number) {
            for (let k in this._partMap) {
                if(k == ConfigHead.Horse.toString() || k == ConfigHead.Horse2.toString()){
                    continue;
                }

                let part: AvatarPart = this._partMap[k];
                if (this._fixFrame) {
                    if(this._fixFrame < (part.data && part.data.numFrames)) {
                        part.onFrame(this._fixFrame);
                    }
                } else {
                    if(frame < (part.data && part.data.numFrames)){
                        part.onFrame(frame);
                    }else{
                        //做一下优化
                        //part.setSrc(part.getId(),ActionName.STAND,part.dir);
                    }
                }
            }

        }

        private onFrameHorseChanged(frame: number){
            for (let k in this._partMap) {

                // if (k == ConfigHead.Gory.toString()) {
                //     continue;
                //}

                if(k != ConfigHead.Horse.toString() && k != ConfigHead.Horse2.toString()){
                    continue;
                }

                let part: AvatarPart = this._partMap[k];
                if (this._fixFrame) {
                    if(this._fixFrame < (part.data && part.data.numFrames)) {
                        part.onFrame(this._fixFrame);
                    }
                } else {
                    if(frame < (part.data && part.data.numFrames)){
                        part.onFrame(frame);
                    }else{
                        //做一下优化
                        //part.setSrc(part.getId(),ActionName.STAND,part.dir);
                    }
                }
            }
        }

        // private onBuffFrameChanged(frame: number): void {
        //     let part = this._partMap[ConfigHead.Gory];
        //     if (part) {
        //         part.onFrame(frame);
        //     }
        // }

        private onPartLoadCfg(duration: number[], url: string): void {
            this._durationN = Math.min(this._durationN, duration.length);
            duration.length = this._durationN;
            this.sortPart();
            this._ctrl.init(duration, url);
            this._ctrl.loop = this.loop;

        }

        private onPartHorseLoadCfg(duration: number[], url: string): void {
            this.sortPart();
            this._ctrlHorse.init(duration, url);
            this._ctrlHorse.loop = true;
        }


        // private onBuffLoadCfg(duration: number[], url: string): void {
        //     let self = this;
        //     self.sortPart();
        //     if (!self._buffCtrl) {
        //         self._buffCtrl = Pool.alloc(AnimCtrl);
        //         self._buffCtrl.changeHandler = Handler.alloc(self, self.onBuffFrameChanged);
        //         // let player = this.parent as GPlayer;
        //         // let scene = player.parent as Scene;
        //         // let goly = scene.ctrl.getGory(player.vo.entity_id)
        //         // goly.initGory();
        //     }
        //     self._buffCtrl.init(duration, url);
        //     self._buffCtrl.loop = true;
        // }

        // private onAdventGodLoadCfg(duration: number[], url: string): void {
        //     let self = this;
        //     self.sortPart();
        //     if (!self._adventGodCtrl) {
        //         self._adventGodCtrl = Pool.alloc(AnimCtrl);
        //         self._adventGodCtrl.changeHandler = Handler.alloc(self, self.onAdventGodFrameChanged);
        //     }
        //     self._adventGodCtrl.init(duration, url);
        //     self._adventGodCtrl.loop = true;
        // }

        // private onAdventGodFrameChanged(frame: number) {
        //     let part = this._partMap[ConfigHead.AdventGod];
        //     if (part) {
        //         part.onFrame(frame);
        //     }
        // }

        public sortPart(): void {
            let self = this;
            let order: number[];
            let isPlayer = self.objType == ObjectType.PLAYER;
            let isRide = isPlayer && self._partMap[ConfigHead.Horse] != null;
            //let act = isRide ? ActionName.RIDE : self._act;
            let act = isRide ? ActionName.STAND : self._act;
            order = getSortOrder(self._dir, act);
            // order = getSortOrder(self._dir, self._act);
            for (let i: number = 0, len: number = order.length; i < len; i++) {
                let idx: ConfigHead = order[i];
                let part: AvatarPart = self._partMap[idx];
                if (part == null) {
                    continue;
                }
                if (idx == ConfigHead.Huashen || idx == ConfigHead.Huashen2) {
                    part.display.x = HuashenPt.x;
                    part.display.y = HuashenPt.y;
                }
                self.dsp.addChildAt(part.display, i);
            }
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            self.loadPri = LoadPri.Scene;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChanged);
            self.loop = true;
            this.resetDurationN();

            //坐骑分开
            self._ctrlHorse = Pool.alloc(AnimCtrl);
            self._ctrlHorse.changeHandler = Handler.alloc(self, self.onFrameHorseChanged);
        }

        public set scale(v: number) {
            this.scaleX = this.scaleY = v;
        }

        public onRelease(): void {
            let self = this;
            self._act = null;
            self._dir = null;
            self.resType = null;
            self._close = false;
            self.objType = null;
            self._fixFrame = null;
            //复原
            this.dsp.x = 0;
            for (let k in self._partMap) {
                let part = self._partMap[k];
                Pool.release(part);
                delete self._partMap[k];
            }
            Pool.release(self._ctrl);
            self._ctrl = null;

            Pool.release(self._ctrlHorse);
            self._ctrlHorse = null;
            this.resetDurationN();

            // Pool.release(self._buffCtrl);
            // self._buffCtrl = null;
            self.scaleY = self.scaleX = 1;
            // Pool.release(self._adventGodCtrl);
            // self._adventGodCtrl = null;
            this._bodyIsShow = false;
        }

        private resetDurationN(): void {
            this._durationN = 50;
        }

        // public set isAdventGodAtk(val: boolean) {
        //     this._isAdventGodAtk = val;
        // }
    }
}
