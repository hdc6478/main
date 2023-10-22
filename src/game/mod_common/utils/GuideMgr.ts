namespace game.mod {
    import DisplayObject = egret.DisplayObject;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Time = base.Time;
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Tween = base.Tween;
    import PoolObject = base.PoolObject;
    import Pool = base.Pool;
    import MainTask1Config = game.config.MainTask1Config;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import TouchEvent = egret.TouchEvent;
    import Point = egret.Point;
    import Rectangle = egret.Rectangle;
    import ParamConfig = game.config.ParamConfig;
    import SpecialGuideConfig = game.config.SpecialGuideConfig;

    export class GuideMgr implements UpdateItem {
        private static _instance: GuideMgr;
        public static getIns(): GuideMgr {
            if (!this._instance) {
                this._instance = new GuideMgr();
            }
            return this._instance;
        }

        private _guideKey: GuideKey;
        private _target: DisplayObject;//需要指引的组件
        private _finger: GuideFinger;//指引手指
        private _onTimeOut: Handler;//指引回调
        private _pauseGuideKey: number;//需要暂停执行的指引
        private _isPause: boolean;//暂停指引
        private _hasShowBack: boolean;//已经返回指引
        private _delayGuide: number;//延迟0.2秒加载指引
        private _startTime: number = 0;//指引开始的时间
        private _guideType: number;//指引类型，弱指引还是强指引
        private _arrowType: number;//指引操作类型
        private _tipsTime: number = 0;//指引提示的时间
        private _timeAuto: number = 0;//自动指引时间，10秒
        private readonly GROUP_NAME = "guide_force";//强指引阻挡层组件名
        private _timeTips: number = 0;//提示指引时间，10秒
        private _layer: UILayer;//保存当前场景所属层级，用于判断关闭超过当前弹窗的界面

        public firstFailedPass:boolean = false; //第一次闯关失败
        private _isSpecialGuide = false; //记录是否特殊指引产生
        private _specialGuideMap:{[key:string]:number};

        /**
         * @param guideKey，指引ID
         * @param target，需要指引的组件
         * @param onTimeOut，指引回调，策划配置了自动引导才会执行
         * @param pauseGuideKey，需要暂停执行的指引，指下一步指引
         * @param offset，指引位置偏移
         */
        public show(guideKey: GuideKey, target: DisplayObject, onTimeOut?: Handler, pauseGuideKey?: number, offset?: {x?: number, y?: number}): void {

            //DEBUG ||
            if(gso.stopGuide){
                //停止指引时，不再触发指引
                return;
            }

            this._isSpecialGuide = false;

            if (!this.isCurGuide(guideKey)) {
                //非当前指引
                if(this._guideKey == guideKey){
                    this.clearGuide();//清除旧指引
                }
                return;
            }
            if (this._guideKey == guideKey && this._target && this._target.hashCode == target.hashCode) {
                //重复指引时，同一个guideKey可以绑定不同的target
                //todo，如果策划需要每次都重新指引时，可以去掉
                return;
            }
            this.clearGuide();//新指引进来时，清除旧指引

            this._guideKey = guideKey;
            this._target = target;

            console.log("显示引导 guideKey = "+guideKey);

            let finger: GuideFinger = Pool.alloc(GuideFinger);
            this._delayGuide = delayCall(Handler.alloc(this, () => {
                this._delayGuide = 0;
                finger.show(target, offset);
                this._layer = finger.parent as UILayer;
                this._finger = finger;
            }), 200);//手指，延迟执行，防止界面设置了约束后导致位置错误

            this._onTimeOut = onTimeOut;
            this.checkAutoGuide();//自动指引

            this.checkGuideType();//指引类型，弱指引还是强指引

            this._pauseGuideKey = pauseGuideKey;
            this._isPause = pauseGuideKey && this.hasGuideKey([pauseGuideKey]);//只有配置指引时才赋值
            this._hasShowBack = guideKey == GuideKey.Back;//已经执行返回指引
        }

        //对外清除指引接口
        //非任务完成步骤，点击对应组件时清除，传guideKey
        public clear(guideKey: GuideKey): void {
            if(guideKey != this._guideKey){
                return;
            }
            console.log("清楚引导 guideKey = "+guideKey);
            this.clearGuide();
        }

        //任务更新调用
        public taskUpdate(): void {
            this._arrowType = this.getArrowType();
            if(this.isArrowTips()){
                //配置了2类型，等于没有指引，互斥状态
                //10秒未操作时候提示
                this.resetTipsTime();
                TimeMgr.addUpdateItem(this, 1000);
            }
            else if(!this.hasGuideInfoList()){
                //没有指引时
                TimeMgr.removeUpdateItem(this);
            }
            else {
                //触发指引
                this.triggerGuide();
            }
        }

        //返回主界面时触发
        public backMain(): void {
            if(!SceneUtil.isShowMain()){
                return;//非挂机场景时，不触发
            }
            if(this.isCurGuide(GuideKey.Xianlu)){
                //仙路指引特殊处理，返回主界面时不需要重复指引
                return;
            }
            this.updateGuide();
        }

        //触发指引
        //任务触发：首次接到主线任务时，主线任务切换时，主线任务完成时
        //返回主界面时触发
        //暂停指引恢复后触发
        public triggerGuide(): void {
            //DEBUG ||
            if(gso.stopGuide){
                //停止指引时，不再触发指引
                return;
            }
            if(this._isPause){
                //暂停指引时，清除当前指引，等待恢复指引
                this.clearGuide();
                this._isPause = false;//取消暂停指引
                return;
            }
            if(this.isCurGuide(this._pauseGuideKey)){
                //存在暂停指引
                facade.sendNt(GuideEvent.ON_GUIDE_TRIGGER, this._pauseGuideKey);//继续引导
                return;
            }
            if(this.isCurGuide(GuideKey.Back)){
                //存在返回指引，且未执行时
                facade.sendNt(GuideEvent.ON_GUIDE_TRIGGER, GuideKey.Back);//引导返回
                return;
            }
            this.updateGuide();
        }

        //是否有对应的指引类型
        public hasGuideKey(guideKeyList: GuideKey[]): boolean {
            for(let guideKey of guideKeyList){
                let info = this.getGuideInfo(guideKey);
                if(info){
                    return true;
                }
            }
            return false;
        }

        //2、10秒未操作时候提示，玩家操作的时候会调用这个接口
        public tips(): void {
            this.clear(GuideKey.Tips);//清除提示指引
            if(!this.isArrowTips()){
                return;
            }
            this.resetTipsTime();
        }

        //清除指引，主界面销毁时后调用下就行了
        public clearGuide(): void {
            if(this._finger){
                Pool.release(this._finger);//清除手指
                if (this._finger && this._finger.parent) {
                    //这里做一下移除指引，防止对象池回收失败
                    this._finger.parent.removeChild(this._finger);
                }
                this._finger = null;
            }
            if(this._onTimeOut){
                Pool.release(this._onTimeOut);//清除回调
                this._onTimeOut = null;//onTimeOut置空，防止回调重复执行
            }
            if (this._delayGuide) {
                clearDelay(this._delayGuide);
                this._delayGuide = 0;
            }
            this._guideKey = null;
            this.delTopGroup();//清除指引时，需要把强指引阻挡去掉
        }

        private updateGuide(): void {
            facade.sendNt(GuideEvent.ON_GUIDE_UPDATE);//发送事件更新指引
        }

        //检测是否当前指引
        private isCurGuide(guideKey: GuideKey): boolean {
            if(!guideKey){
                return false;
            }

            if(this.firstFailedPass){
                //第一次闯关失败
                if(this.isHasSpecialGuide(guideKey)){
                    this._isSpecialGuide = true;
                    return true;
                }
                return false;
            }

            if(this.isTipsGuide(guideKey)){
                let _passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                if(_passProxy.passIsAuto){
                    return false;//自动闯关时候不提示
                }
                return true;//提示指引
            }

            if(!this.hasGuideKey([guideKey])){
                return false;
            }
            let task = TaskUtil.getMainTask();
            if(!task){
                return false;
            }
            let guideList = [GuideKey.Task, GuideKey.Back, GuideKey.SecondBack];//任务完成状态才执行的指引
            if(guideList.indexOf(guideKey) > -1){
                //任务完成时候才指引
                 if(guideKey == GuideKey.Back && this._hasShowBack){
                    return false;//返回指引已执行时，不再执行
                }
                return task.status == TaskStatus.Finish;
            }
            return task.status == TaskStatus.NotFinish;//任务未完成状态才执行的指引
        }

        private isHasSpecialGuide(key:GuideKey):boolean{
            let ret1 = this.isSpecialGuide(key,GuideKeySpecial.Special1);
            let ret2 = this.isSpecialGuide(key,GuideKeySpecial.Special2);
            return ret1 || ret2;
        }

        //是否是特殊引导
        private isSpecialGuide(key:GuideKey,index: GuideKeySpecial): boolean {

            let cfg:SpecialGuideConfig = getConfigByNameId(ConfigName.SpecialGuide,index);

            //道具
            let count = BagUtil.getPropCntByIdx(cfg.condition1[0]);
            let ret1 = cfg.condition1[1] == 1 ? count > 0 : count <= 0;

            //神灵
            let tempRet = SurfaceUtil.isAct(cfg.condition2[0]);
            let ret2 = cfg.condition2[1] == 1 ? tempRet:!tempRet;


            if(ret1 && ret2){
                for(let info of cfg.arrow){
                    if(this._specialGuideMap && this._specialGuideMap["special"+"_"+info[0]]){
                        continue;
                    }

                    if(info[0] == key){
                        //记录已经做了的小步骤
                        //this._specialGuideMap["special"+"_"+key] = 1;
                        if(!this._specialGuideMap){
                            this._specialGuideMap = {};
                        }
                        return true;
                    }
                    break;
                }
            }
            return false;
        }

        //记录已经做了的特殊引导
        public recordSpecialGuideMap(key:GuideKey):void{
            if(this.firstFailedPass && this._specialGuideMap){
                this._specialGuideMap["special"+"_"+key] = 1;
            }
        }


        //是否是提示指引
        private isTipsGuide(guideKey: GuideKey): boolean {
            return guideKey == GuideKey.Tips || guideKey == GuideKey.GongNengTips;
        }

        //指引ID_指引类型
        private getGuideInfo(guideKey: GuideKey): number[] {
            let infoList = this.getGuideInfoList();
            for(let info of infoList){
                let key = info[0];
                if(guideKey == key){
                    return info;
                }
            }
            return null;
        }

        //检测自动指引
        private checkAutoGuide(): void {
            if(this.isArrowTips()){
                return;//提示指引不在指引时候检测
            }
            this._arrowType = this.getArrowType();
            if(this._arrowType == ArrowType.Auto && this._onTimeOut){
                //自动指引，且存在回调时执行
                this.resetStartTime();//重置时间
                TimeMgr.addUpdateItem(this, 1000);
            }
            else {
                TimeMgr.removeUpdateItem(this);
            }
        }

        private getArrowType(): number {
            let task = TaskUtil.getMainTask();
            if(!task){
                return 0;
            }
            let cfg: MainTask1Config = TaskUtil.getCfg(task.task_id);
            return cfg && cfg.arrow_type || 0;
        }

        //指引组合，策划配置
        private getGuideInfoList(): number[][] {
            let task = TaskUtil.getMainTask();
            if(!task){
                return [];
            }
            let cfg: MainTask1Config = TaskUtil.getCfg(task.task_id);
            return cfg && cfg.arrow || [];
        }

        //是否配置了指引
        private hasGuideInfoList(): boolean {
            let infoList = this.getGuideInfoList();
            return infoList && !!infoList.length;
        }

        private isArrowTips(): boolean {
            return this._arrowType == ArrowType.Tips;
        }

        //检测指引类型，弱指引还是强指引
        private checkGuideType(): void {

            if(this._isSpecialGuide){
                //弱指引
                this.delTopGroup();
                return ;
            }

            let info = this.getGuideInfo(this._guideKey);
            let guideType = info && info.length > 1 ? info[1] : 0;//指引类型
            this._guideType = guideType;
            if(guideType == GuideType.Force){
                //强指引，所有点击视为触发
                this.addTopGroup();
            }
            else if(guideType == GuideType.Force2){
                //强指引，不允许其他点击
                this.addTopGroup();
            }
            else {
                //弱指引
                this.delTopGroup();
            }
        }

        //添加阻挡层
        private addTopGroup(): void {
            let layer = Layer.top;
            let grp = layer.getChildByName(this.GROUP_NAME);
            if(grp){
                grp.touchEnabled = true;
                return;
            }
            grp = new eui.Group();
            grp.name = this.GROUP_NAME;
            // grp.width = layer.width;
            // grp.height = layer.height;
            //阻挡大小以舞台大小为准
            grp.width = gso.gameStage.stageWidth;//layer.width + layer.x * 2
            grp.height = gso.gameStage.stageHeight;//layer.height + layer.y * 2
            grp.x = -layer.x;
            grp.y = -layer.y;
            layer.addChild(grp);
            grp.addEventListener(TouchEvent.TOUCH_TAP, this.onClickTopGroup, this);
        }
        //删除阻挡层，实际上不删除，设置为不可点击
        private delTopGroup(): void {
            let layer = Layer.top;
            let grp = layer.getChildByName(this.GROUP_NAME);
            if(grp){
                grp.touchEnabled = false;
            }
        }

        //点击阻挡层
        private onClickTopGroup(e: TouchEvent): void {
            //强制指引点击时，优先判断上层界面是否存在UI，是的话关闭
            if(this._layer){
                if(this._layer.idx < LayerIndex.modal){
                    //当前层级小于压黑弹窗时，关闭所有压黑界面
                    if(Layer && Layer.onHideModalLayer){
                        Layer.onHideModalLayer();
                    }
                }
                else if(this._layer.idx == LayerIndex.modal){
                    //当前层级等于压黑弹窗时，todo
                }
            }
            if(this._guideType == GuideType.Force2){
                //强指引，不允许其他点击
                //判断范围以全局坐标为准
                let targetPoint: Point = this._target.localToGlobal();
                if (e.stageX < targetPoint.x || e.stageX > targetPoint.x + this._target.width || e.stageY < targetPoint.y ||
                    e.stageY > targetPoint.y + this._target.height) {
                    return;
                }
            }
            //this.delTopGroup();//todo，防止回调执行失败时，去掉强指引阻挡
            this.execTimeOut();//点击后执行
        }

        //执行回调
        private execTimeOut(): void {
            if (this._onTimeOut) {
                if(this._arrowType == ArrowType.Auto){
                    this.resetStartTime();//重置时间
                }
                this._onTimeOut.exec();//todo，执行完回调后不清除，直到任务完成
            }
        }

        private resetStartTime(): void {
            this._startTime = TimeMgr.time.serverTimeSecond;//重置时间
        }

        private resetTipsTime(): void {
            this._tipsTime = TimeMgr.time.serverTimeSecond;
        }

        update(time?: Time) {
            if(!this._timeAuto || !this._timeTips){
                let cfg: ParamConfig = GameConfig.getParamConfigById("task_guide_time");
                let timeInfo: number[] = cfg.value;
                this._timeAuto = timeInfo ? timeInfo[0] : 10;
                this._timeTips = timeInfo ? timeInfo[1] : 10;
            }
            let passTime = TimeMgr.time.serverTimeSecond - this._startTime;
            if (this._startTime && passTime >= this._timeAuto) {
                this._startTime = 0;
                this.execTimeOut();//5秒后执行
            }
            if(this.isArrowTips() && this._guideKey != GuideKey.Tips){
                let tipsTime = TimeMgr.time.serverTimeSecond - this._tipsTime;
                if (tipsTime >= this._timeTips) {
                    this.resetTipsTime();
                    facade.sendNt(GuideEvent.ON_GUIDE_TRIGGER, GuideKey.Tips);//10秒后执行
                }
            }
        }
    }

    //指引手指
    export class GuideFinger extends DisplayObjectContainer implements PoolObject {
        private _finger: eui.Image;
        private _eftId: number;
        private _eftHub: UIEftHub;

        constructor() {
            super();
            this.touchEnabled = false;
            this.touchChildren = false;
            this._finger = new eui.Image("shouzhi");
            this.addChild(this._finger);
            this._eftHub = new UIEftHub(this);
            this.name = GuideFingerName;
        }

        public show(target: DisplayObject, offset?: {x?: number, y?: number}) {
            let layer;
            let targetParent = target.parent;
            while (targetParent && !layer){
                if(targetParent.name.indexOf("Layer_") == 0 && targetParent.parent instanceof Layer){
                    //层级命名规则Layer_开头，且父节点是Layer
                    layer = targetParent;//寻找到对应的层级
                }
                targetParent = targetParent.parent;//向上寻找
            }
            if(!layer){
                layer = Layer.tip;//默认最上层
            }
            layer.addChild(this);//添加到对应的层级

            let targetPoint = target.localToGlobal();//转化为全局坐标
            let offsetX = offset && offset.x || 0;
            let offsetY = offset && offset.y || 0;
            this.x = targetPoint.x + target.width / 2 - layer.x + offsetX;//需要减去对应layer的坐标
            this.y = targetPoint.y + target.height / 2 - layer.y + offsetY;

            //首次获取的显示区域可能异常
            // let rect: Rectangle = target.getTransformedBounds(layer, Pool.alloc(Rectangle));
            // this.x = rect.x + rect.width / 2;
            // this.y = rect.y + rect.height / 2;
            // Pool.release(rect);

            if (!this._eftId) {
                this._eftId = this._eftHub.add(UIEftSrc.Guide, 0, 0, null, 0, null, 0, 1, true, 0.7);
            }
            let isDown: boolean = this.y > gso.gameStage.stageHeight - 250;
            this._finger.scaleY = isDown ? -1 : 1;

            this._finger.x = -20;
            this._finger.y = 0;
            Tween.remove(this._finger);
            Tween.get(this._finger, {loop: true})
                .to({y: this._finger.scaleY * 20}, 600)
                .to({y: 0}, 600);
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            Tween.remove(this._finger);
            this._eftId = null;
            this._eftHub.removeAllEffects();
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}


