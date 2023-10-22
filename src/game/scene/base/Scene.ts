namespace game.scene {
    import TimeMgr = base.TimeMgr;
    import Rectangle = egret.Rectangle;
    import Time = base.Time;
    import EventDispatcher = egret.EventDispatcher;
    import Point = egret.Point;
    import Pool = base.Pool;
    import UpdateItem = base.UpdateItem;
    import Texture = egret.Texture;
    import DisplayObject = egret.DisplayObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Shape = egret.Shape;
    import GhostShadow = game.mod.scene.GhostShadow;
    import RoleGhostShadow = game.mod.scene.RoleGhostShadow;

    export class Scene extends BaseDraw implements UpdateItem {
        //调度器
        private _dispatcher: EventDispatcher;
        //相机
        private _camera: SceneCamera;
        //遥感
        private _shake: SceneShake;
        //地图
        private _map: SceneMap;

        private _layerDown: DisplayObjectContainer;
        private _layerAvatar: DisplayObjectContainer;
        private _layerDropItem: DisplayObjectContainer;
        private _layerEffect: DisplayObjectContainer;
        private _layerEffect2: DisplayObjectContainer;

        private _depthCnt: number = 0;
        private _depthItem: DisplayObject[] = [];

        private _ctrl: BaseSceneCtrl;
        private _isInitMap: boolean;

        public isAddedMain: boolean = false;

        public mapId: number;

        public sceneType: number;
        public sceneIndex: number;

        private preTime:number = 0;

        public get isInitMap(): boolean {
            return this._isInitMap;
        }

        public get dispatcher(): EventDispatcher {
            return this._dispatcher;
        }

        public get ctrl(): BaseSceneCtrl {
            return this._ctrl;
        }

        public get isShow(): boolean {
            return !!this.dsp.stage;
        }

        protected init(): void {
            super.init();
            this._dispatcher = new EventDispatcher();
        }

        protected initDsp(): void {
            let self = this;
            self.dsp = Layer.scene;
            self.dsp.touchEnabled = true;
            self._camera = new SceneCamera(self);
            self._shake = new SceneShake(self);

            self._map = self.addLayer(SceneMap, "_map");

            self._layerDown = self.addLayer(DisplayObjectContainer, "_layerDown");
            self._layerAvatar = self.addLayer(DisplayObjectContainer, "_layerAvatar");
            self._layerDropItem = self.addLayer(DisplayObjectContainer, "_layerDropItem");
            self._layerEffect = self.addLayer(DisplayObjectContainer, "_layerEffect");
            self._layerEffect2 = self.addLayer(DisplayObjectContainer, "_layerEffect2");

            STxtMgr.ins.init(self);
            SkillEftMgr.ins.init(self);

            let param = getConfigByNameId(ConfigName.Param, "default_speed");
            gso.defaultSpeed = param.value;

        }

        private addLayer<T extends DisplayObjectContainer>(cls: new() => T, name: string): T {
            let s: T = new cls();
            s.name = name;
            s.touchEnabled = false; //s.touchChildren =
            this.dsp.addChild(s);
            return s;
        }

        //清空掉落层
        public clearDropItems():void{
            this._layerDropItem.removeChildren();
        }

        public addDsp(child: BaseDraw): void {
            let self = this;
            if (child instanceof DropItem) {
                self._layerDropItem.addChild(child.dsp);
                return;
            }
            if (child instanceof BaseBmpNum) {
                (<any>child.dsp).zIdx = 0;
                self._layerEffect.addChild(child.dsp);
                return;
            }
            if (child instanceof SkillEffect || child instanceof EftGroup) {
                (<any>child.dsp).zIdx = 1;
                let layer = child.layer == SceneLayerType.Down ? self._layerDown : self._layerEffect;
                if (layer.numChildren === 0 || layer.getChildAt(layer.numChildren - 1) instanceof SkillEffect) {
                    layer.addChild(child.dsp);
                } else {
                    let i = layer.numChildren - 1;
                    for (; i >= 0; i--) {
                        if ((<any>layer.getChildAt(i)).zIdx >= (<any>child.dsp).zIdx) {
                            break;
                        }
                    }
                    layer.addChildAt(child.dsp, i + 1);
                }
                return;
            }

            if (child instanceof ActorShadow) {
                self._layerDown.addChild(child.dsp);
                return;
            }
            self._layerAvatar.addChild(child.dsp);
        }

        public initScene(mapId: number, handler: BaseSceneCtrl, sceneType: number, sceneIndex: number): void {
            let self = this;
            let data: MapData = MapData.ins;
            self.sceneIndex = sceneIndex;
            self.sceneType = sceneType;
            self.mapId = mapId;
            self._isInitMap = true;
            self._ctrl = handler;
            self._ctrl.init(mapId, self);
            MapData.ins.isHangUp = (sceneType == SceneType.HangUp2);
            self._map.init(mapId);

            self._camera.init();
            AStar.initialize(data.numCol, data.numRow);
            AStar.ckIsBlock = data.ckBlock;
            TimeMgr.addUpdateItem(self);
            self.onStageResize();
        }

        public setBlur(texture: Texture): void {
            this._map.setBlur(texture);
        }

        public get isSceneReady(): boolean {
            return this._isInitMap;
        }

        public get layerDown(): DisplayObjectContainer {
            return this._layerDown;
        }

        public clean(clearAll: boolean): void {
            let self = this;
            if (!self._isInitMap) {
                return;
            }
            self._isInitMap = false;

            TimeMgr.removeUpdateItem(self);
            self._map.clean(clearAll);
            STxtMgr.ins.clean();
            for (let i: number = self.numChildren - 1; i >= 0; i--) {
                let child = self.children[i];
                if (child instanceof GhostShadow || child instanceof RoleGhostShadow) {
                    this._ctrl.removeGhost(child);
                } else {
                    this._ctrl.removeObj(<BaseSceneObj>child);
                    this.removeActor(<BaseSceneObj>child);
                }
            }
            self._ctrl.dispose();
            self._ctrl = null;

            self._shake.remove();
        }

        public addActor(actor: BaseSceneObj): void {
            if (actor instanceof MainGPlayer && this.isAddedMain) {
                return;
            }
            if (actor instanceof MainGPlayer) {
                this.isAddedMain = true;
            }
            this.add(actor);
        }

        public removeActor(actor: BaseSceneObj): void {
            if (actor instanceof MainGPlayer) {
                actor.actMgr.removeAll();
                return;
            }
            this.remove(actor);
        }

        public onStageResize(): void {
            this._camera.onResize(gso.gameStage.stageWidth, gso.gameStage.stageHeight);
        }

        public updateViewPort(viewPort: Rectangle) {
            this.dsp.x = -viewPort.x;
            this.dsp.y = -viewPort.y;
        }

        public addObj(obj: BaseSceneObj) {
            this._ctrl.addObj(obj);
        }

        public removeObj(id: Long) {
            this._ctrl.removeById(id);
        }

        public updateTiles(sc: number, sr: number, ec: number, er: number) {
            this._map.updateTiles(sc, sr, ec, er);
        }

        /**
         *更新摄像头对焦位置
         * @param wx
         * @param wy
         * @param smooth 是否平滑
         */
        public updateFocus(wx: number, wy: number, smooth: boolean = true): void {
            this._camera.setFocus(wx, wy, smooth);
        }

        /** 对焦地图中心点*/
        public setMapCenterFocus(): void {
            this._camera.setMapCenterFocus();
        }

        /** 添加残影 */
        public addGhost(obj: Ride | GPlayer) {
            let ghost: GhostShadow | RoleGhostShadow;
            if (obj instanceof Ride) {
                ghost = Pool.alloc(GhostShadow);
            } else {
                ghost = Pool.alloc(RoleGhostShadow);
            }
            ghost.vo = obj.vo;
            ghost.x = obj.x;
            ghost.y = obj.y;
            ghost.realObj = obj;
            this.ctrl.addGhost(ghost);
        }

        public updateShakeFocusPt() {
            if (this._shake.isShake) {
                this._shake.updateShakeFocusPt();
            }
        }

        public getFocusPt(): Point {
            return this._camera.getFocusPt();
        }

        public getWorldPt(stageX: number, stageY: number, pt?: Point): Point {
            pt = pt || Pool.alloc(Point);
            pt.x = stageX - this.dsp.x;
            pt.y = stageY - this.dsp.y;
            return pt;
        }

        public getStagePt(sceneX: number, sceneY: number, pt?: Point) {
            pt = pt || Pool.alloc(Point);
            pt.x = sceneX + this.dsp.x;
            pt.y = sceneY + this.dsp.y;
            return pt;
        }

        public static getFindPathDis(sx: number, sy: number, ex: number, ey: number): number {
            let path = this.findPath(sx, sy, ex, ey);
            if (!path) {
                return null;
            }
            let dis = 0;
            for (let k = 0; k < path.length - 1; ++k) {
                dis += PointUtil.distancePt(path[k], path[k + 1]);
            }
            return dis;
        }

        public static findPath(sx: number, sy: number, ex: number, ey: number): Point[] {
            if (!MapData.ins.isPointLegal(sx, sy) || !MapData.ins.isPointLegal(ex, ey)) {
                return null;
            }
            let path = AStar.findPath(sx, sy, ex, ey);
            path = AStar.floyd(path);
            return path;
        }

        public static findAtkPath(sx: number, sy: number, ex: number, ey: number, dis: number): Point[] {
            if (!MapData.ins.isPointLegal(sx, sy) || !MapData.ins.isPointLegal(ex, ey)) {
                return null;
            }
            let path = AStar.findPath(sx, sy, ex, ey);
            if (!path) {
                return null;
            }
            let pop_list = [];
            while (path.length > 1) {
                let ePt = path[path.length - 2];
                let ptDis = PointUtil.distance(ePt.x, ePt.y, ex, ey);
                if (ptDis > dis) {
                    break;
                }
                pop_list.push(path.pop());
            }

            if (pop_list.length) path.push(pop_list.pop());//加回一个在范围的点;
            Pool.releaseList(pop_list);
            if (path.length > 0) {
                path = AStar.floyd(path);
            }
            return path;
        }

        public shake(cfg: number[]) {
            if(gso.isHideSceneShake) {
                return;
            }
            this._shake.start(cfg);
        }

        public removeShake() {
            this._shake.remove();
        }

        public update(time: Time): void {
            let self = this;
            let advTime = TimeMgr.getElapseTime(self);
            self.advanceTime(advTime);
            self.updateDepth();
            if (self._shake.isShake) {
                self._shake.doShake();
            }
            if (self._camera) {
                self._camera.update(advTime);
            }

            advTime = time.serverTimeSecond;
            self._map.check(advTime);
        }

        //重载父类函数
        public advanceTime(elapseTime: number): void {
            //super.advanceTime(elapseTime);
            this.preTime = Date.now();
            let isAllDone = true;
            let hald = Math.floor(this._children.length / 2) + 1;
            for (let i: number = 0, n: number = this._children.length; i < n; i++) {
                let child = this._children[i];
                if(child instanceof BaseActor){

                    //屏蔽其他玩家
                    if(gso.isHideOtherPlayer && child.enType == ObjectType.PLAYER) {
                        if (!(child instanceof MainGPlayer)) {
                            child.dsp.visible = false;
                            continue;
                        } else {
                            child.dsp.visible = true;
                        }
                    }

                    //屏蔽其他玩家跟随
                    if(gso.isHideOtherPlayerPet && child.enType == ObjectType.PET){
                        let vo:PetVo = child.vo as PetVo;
                        if(!vo.master_id.eq(RoleVo.ins.entity_id)){
                            child.dsp.visible = false;
                            continue;
                        }else{
                            child.dsp.visible = true;
                        }
                    }

                }

                if (child && child.updateEnabled) {
                    if(!(child instanceof MainGPlayer) && Date.now() - this.preTime > 12 && i > hald){
                        isAllDone = false;
                    }else{
                        try {
                            child.advanceTime(elapseTime);
                        } catch (e) {
                            console.error(egret.getQualifiedClassName(child), e);
                        }
                    }
                }
            }
            if(!isAllDone){
                this._children = this._children.reverse();
            }
        }

        private updateDepth(): void {
            let self = this;
            let layerAvatar = self._layerAvatar;
            let sortList = self._depthItem;
            self._depthCnt++;
            if (self._depthCnt < 5) {
                return;
            }
            let child;
            let i: number, n: number = layerAvatar.numChildren;
            for (i = 0; i < n; i++) {
                sortList[i] = layerAvatar.getChildAt(i);
            }
            sortList.sort(Scene.sortFun);
            for (i = 0; i < n; i++) {
                child = sortList[i];
                if (child != layerAvatar.$children[i]) {
                    layerAvatar.setChildIndex(child, i);
                }
            }
            sortList.length = 0;
        }

        private static sortFun(a: DisplayObject, b: DisplayObject): number {
            if (!a || !b) {
                return 0;
            }
            if (a.y !== b.y) {
                return a.y - b.y;
            }
            return (<SceneDisplay><any>b).addTime - (<SceneDisplay><any>a).addTime;
            // return (<SceneDisplay><any>a).addTime - (<SceneDisplay><any>b).addTime;
        }

        public getNearByObjType(objectType: number, index: number) {
            let enemies: { [key: string]: BaseSceneObj } = this.ctrl.getObjMap();
            let list: string[] = Object.keys(enemies);
            if (!enemies || 0 == list.length) {
                return null;
            }
            let minIdx: string;
            let minDis: number = 0;
            let mainVo = SceneTools.mainPlayerVo;
            for (let i = 0, l = list.length; i < l; i++) {
                let obj = enemies[list[i]];
                if (!obj.vo || obj.vo.type != objectType || obj.vo.cfg.index != index) continue;
                if (!SceneTools.isTargetReady(obj.vo as ActorVo)) {
                    continue;
                }

                let path = Scene.findPath(mainVo.x, mainVo.y, obj.vo.x, obj.vo.y);
                if (!path || path.length > 2) {
                    continue;
                }
                let dis = PointUtil.distance(mainVo.x, mainVo.y, obj.vo.x, obj.vo.y);
                if (!minDis || dis < minDis) {
                    minDis = dis;
                    minIdx = list[i];
                }
            }
            if (!minIdx || !SceneTools.isTargetReady(enemies[minIdx].vo as ActorVo)) {
                return null;
            }
            return enemies[minIdx];
        }
    }
}
