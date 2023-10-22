namespace game {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;

    export enum BoneResType {
        TYPE_JSON = "_tex.json",
        TYPE_TEX = "_tex.png",
        TYPE_SKE = "_ske.json",
    }

    export class DragonBonesEx extends DisplayObjectContainer {
        public textureData: any;
        public texture: any;
        public skeletonData: any;

        resName: string;

        private _paths:string[] = [];
        private _paths2:string[] = [];

        armatureName: string
        armatureDisplay: dragonBones.EgretArmatureDisplay
        armatureDisplay_dict: { [key: string]: dragonBones.EgretArmatureDisplay } = {}

        animationName: string;
        playTimes: number = 0;

        playing: boolean;

        timeScale: number = 1;

        private _parentContainer:DisplayObjectContainer;

        private isDisposed:boolean;

        constructor() {
            super()
        }

        setResName(name: string) {
            this.resName = name
        }

        loadResourceByName(parent:DisplayObjectContainer,name: string) {
            if (this.isDisposed){
                return;
            }

            this.resName = name;
            let pre = "assets/ui_bone_effect/";
            this._paths[0] = pre + name+BoneResType.TYPE_JSON;
            this._paths[1] =  pre + name+BoneResType.TYPE_TEX;
            this._paths[2] =  pre + name+BoneResType.TYPE_SKE;
            this._paths2 = this._paths.concat();

            LoadMgr.ins.addRef(this._paths[0]);
            LoadMgr.ins.addRef(this._paths[1]);
            LoadMgr.ins.addRef(this._paths[2]);

            let self = this;
            LoadMgr.ins.load(this._paths[0], Handler.alloc(self, self.onSucc), LoadPri.UI,  Handler.alloc(self, self.onFail));
            LoadMgr.ins.load(this._paths[1], Handler.alloc(self, self.onSucc), LoadPri.UI,  Handler.alloc(self, self.onFail));
            LoadMgr.ins.load(this._paths[2], Handler.alloc(self, self.onSucc), LoadPri.UI,  Handler.alloc(self, self.onFail));

        }

        private onFail(url: string, realUrl: string, errMsg: string, errCode: number): void {
            console.error(url+" 下载失败");
            console.error(realUrl+" 下载失败");
        }

        //加载完成
        private onSucc(data: any,url: string){

            if(this._paths2[0] == url){
                this.textureData = data;
            }else if(this._paths2[1] == url){
                this.texture = data;
            }else if(this._paths2[2] == url){
                this.skeletonData = data;
            }

            let index = this._paths.indexOf(url);
            if( index > -1){
                this._paths.splice(index,1);
            }

            if( this._paths.length <= 0 ){
                this.createArmatureDisplay();
            }

        }

        public createArmatureDisplay(): void {

            const factory = dragonBones.EgretFactory.factory;
            factory.parseDragonBonesData(this.skeletonData);
            factory.parseTextureAtlasData(this.textureData, this.texture);

            let newDisplay = factory.buildArmatureDisplay(this.armatureName);
            if (newDisplay) {
                DisplayUtils.UnParent(this.armatureDisplay)
                this.armatureDisplay = newDisplay
                this.armatureDisplay.animation.timeScale = this.timeScale
                this.armatureDisplay.animation.play(this.animationName, this.playTimes);
                this.armatureDisplay.x = this.width >> 1;
                this.armatureDisplay.y = this.height >> 1
                this._parentContainer.addChild(this.armatureDisplay);
                this.armatureDisplay_dict[this.armatureName + "_" + this.animationName] = newDisplay

                if (!this.playing) this.armatureDisplay.animation.stop()
            }

            // egret.Ticker.getInstance().register(function (advancedTime) {
            //     dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            // }, this);
        }

        //播放龙骨
        play(parent:DisplayObjectContainer,armatureName?: string, animationName?: string, playTimes: number = 0) {

            this.armatureName = armatureName
            this.animationName = animationName

            this.playTimes = playTimes;
            if (!this.resName){
                return
            }

            this.playing = true;

            let nextDisplay = this.armatureDisplay_dict[this.armatureName + "_" + this.animationName]
            if (nextDisplay) {
                if (nextDisplay != this.armatureDisplay) {
                    DisplayUtils.UnParent(this.armatureDisplay)
                    this.armatureDisplay = nextDisplay
                    this.armatureDisplay.x = this.width >> 1
                    this.armatureDisplay.y = this.height >> 1
                    this._parentContainer.addChild(this.armatureDisplay)
                }
                this.armatureDisplay.animation.timeScale = this.timeScale
                this.armatureDisplay.animation.play(animationName, playTimes)
                return
            } else {
                // DisplayUtils.UnParent(this.armatureDisplay)
                // this.armatureDisplay = null
            }

            this._parentContainer  = parent;
            this.loadResourceByName(parent,this.resName);
        }

        stop(): void {
            this.playing = false
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.stop()
            }
        }

        setTimeScale(scale: number) {
            this.timeScale = scale
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.timeScale = scale
            }
        }

        dispose(): void {
            this.stop()
            // DisplayUtils.UnParent(this.armatureDisplay)
            for (let key in this.armatureDisplay_dict) {
                this.armatureDisplay_dict[key].dispose()
            }
            this.armatureDisplay = null
            this.armatureDisplay_dict = null

            //super.dispose()
        }
    }
}