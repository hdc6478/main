namespace game.mod {

    import Pool = base.Pool;
    import Handler = base.Handler;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;
    //import oper_act_item = msg.oper_act_item;

    export class BtnIconMgr {
        /**所有的按钮*/
        public _btnDataMap: { [id: number]: IBtnIconData } = {};
        /**展示中的按钮*/
        public _showBtnMap: { [id: number]: BtnIconBase } = {};
        /**有倒计时文本的按钮*/
        public _btnTimeMap: { [id: number]: BtnIconBase } = {};
        /**按钮的监听事件*/
        public _btnNtMap: { [key: string]: BtnIconId[] } = {};
        /**按钮容器，传入*/
        private _group: eui.Group;

        /**缓存的开启关闭数据，收到数据时Mdr还未实例化BtnIconMgr时做数据缓存，存的是isOpen*/
        public static _btnTmpMap: { [id: number]: boolean } = {};
        public static _btnTmpCacheMap: { [id: number]: boolean } = {};

        /**中控活动openIdx映射活动ID列表*/
        public _btnOpenIdxMap: { [openIdx: number]: number[] } = {};

        //用于Mdr中传入按钮容器
        constructor(group?: eui.Group) {
            this._group = group;
            if (this._group) {
                this._group.removeChildren();
            }
        }

        private static _ins: BtnIconMgr;

        //用于特效处理
        public static ins(): BtnIconMgr {
            if (!this._ins) {
                this._ins = new BtnIconMgr();
            }
            return this._ins;
        }

        //顶部活动单例，用于活动入口刷新
        public static _insTop: BtnIconMgr;
        public static insTop(): BtnIconMgr {
            if (!this._insTop) {
                this._insTop = new BtnIconMgr();
            }
            return this._insTop;
        }

        //冲榜活动单例，用于活动入口刷新
        public static _insBig: BtnIconMgr;
        public static insBig(): BtnIconMgr {
            if (!this._insBig) {
                this._insBig = new BtnIconMgr();
            }
            return this._insBig;
        }

        //左边活动单例，用于活动入口刷新
        public static _insLeft: BtnIconMgr;
        public static insLeft(): BtnIconMgr {
            if (!this._insLeft) {
                this._insLeft = new BtnIconMgr();
            }
            return this._insLeft;
        }

        //超值礼包
        public static _insChaozhilibao: BtnIconMgr;
        public static insChaozhilibao(): BtnIconMgr {
            if (!this._insChaozhilibao) {
                this._insChaozhilibao = new BtnIconMgr()
            }
            return this._insChaozhilibao;
        }

        private findInsertIndex(list: egret.DisplayObject[], btn: BtnIconBase): number {
            if (!list || !list.length || !btn || btn.getSortNum() == 0) {
                return -1;
            }
            let btnIdx = btn.getSortNum() || 0;
            let left = 0;
            let right = list.length - 1;
            while (left <= right) {
                let mid = Math.floor((left + right) / 2);
                let btnItem = list[mid] as BtnIconBase;
                if (!btnItem) {
                    break;
                }
                let midBtnIdx = btnItem.getSortNum() || 0;
                if (btnIdx == midBtnIdx) {
                    return mid;
                } else if (btnIdx < midBtnIdx || midBtnIdx == 0) {
                    right = mid - 1;
                } else if (btnIdx > midBtnIdx) {
                    left = mid + 1;
                }
            }
            return left;
        }

        private addBtn(btn: BtnIconBase): void {
            if (!btn || !this._group) {
                return;
            }
            let btnId = btn.id;
            if (!this._showBtnMap[btnId]) {
                let idx = this.findInsertIndex(this._group.$children, btn);
                if (idx < 0) {
                    this._group.addChild(btn);
                } else {
                    this._group.addChildAt(btn, idx);
                }
                this._showBtnMap[btnId] = btn;
                // if(btn.data && btn.data.mainBtnType){
                //     FunctionNoticeMgr.getIns().show(btn.data.mainBtnType, btn, btn.parent.parent);//展示预告气泡
                // }
            }

            let btnData = btn.data;
            if (btnData.isInit === false && btnData.initHandler) {
                btnData.isInit = true;
                btnData.initHandler.exec();
            }

            //展示时间
            let isTime = this.checkBtnTime(this._btnDataMap[btnId]);
            if (isTime && !this._btnTimeMap[btnId]) {
                this._btnTimeMap[btnId] = btn;
            } else if (!isTime && this._btnTimeMap[btnId]) {
                this._btnTimeMap[btnId] = null;
                delete this._btnTimeMap[btnId];
            }
        }

        private removeBtn(btn: BtnIconBase): void {
            if (!btn || !this._group) {
                return;
            }
            let btnId = btn.id;
            if (this._showBtnMap[btnId]) {
                if (btn.data && btn.data.guideKey) {
                    GuideMgr.getIns().clear(btn.data.guideKey);//清除指引
                }
                // if(btn.data && btn.data.mainBtnType){
                //     FunctionNoticeMgr.getIns().clear(btn.data.mainBtnType);//清除预告气泡
                // }
                if(btn.data && btn.data.showTips){
                    BtnTipsMgr.getIns().hideTips(btnId);
                }
                this._group.removeChild(btn);
                this._showBtnMap[btnId] = null;
                delete this._showBtnMap[btnId];
            }
            if (this._btnTimeMap[btnId]) {
                this._btnTimeMap[btnId] = null;
                delete this._btnTimeMap[btnId];
            }
        }

        /**
         * 初始所有的按钮
         * @param btnData 按钮数组
         * @param isShow 是否显示
         * @param isBig 是否冲榜按钮
         */
        public dealBtnIconList(btnData: IBtnIconData[], isShow?: boolean, isBig?: boolean): void {
            for (let data of btnData) {
                //初始化所有按钮时候，判断是否存在缓存值
                let isOpen = BtnIconMgr._btnTmpMap[data.id];
                if(isOpen != undefined){
                    data.isHide = !isOpen;
                    if (!BtnIconMgr._btnTmpCacheMap[data.id]) {
                        delete BtnIconMgr._btnTmpMap[data.id];
                    }
                }
                this._btnDataMap[data.id] = data;//转成map格式
                this.dealSingleBtnIcon(data.id, isShow, isBig);
            }
        }

        /**
         * 处理单个按钮
         * @param id 按钮id
         * @param isShow 是否显示
         * @param isBig 是否冲榜按钮
         * @return 返回true或false，true表示展示按钮
         */
        public dealSingleBtnIcon(id: BtnIconId, isShow?: boolean, isBig?: boolean): boolean {
            if (!this._btnDataMap[id]) {
                return false;
            }
            let btnData: IBtnIconData = this._btnDataMap[id];
            let btnIcon: BtnIconBase = this.regBtn(btnData, isShow, isBig);

            //有监听回调的，绑定监听
            if (btnData.handler && btnData.handlerMsg) {
                let handlerMsg = btnData.handlerMsg;
                if (!this._btnNtMap[handlerMsg]) {
                    this._btnNtMap[handlerMsg] = [];
                }
                if (this._btnNtMap[handlerMsg].indexOf(id) < 0) {
                    this._btnNtMap[handlerMsg].push(id);
                }
            }

            if (!btnIcon) {
                //展示中的要移除
                if (this._showBtnMap[id]) {
                    this.removeBtn(this._showBtnMap[id]);
                }
                return false;
            }
            this.addBtn(btnIcon);
            return true;
        }

        /**
         * 清理数据
         */
        public clear(): void {
            this._btnDataMap = {};
            this._showBtnMap = {};
            this._btnTimeMap = {};
            this._btnNtMap = {};
            this._btnOpenIdxMap = {};

        }

        /**
         * 注册按钮
         * @param btnData 按钮数据
         * @param isShow 是否显示所有按钮
         * @param isBig 是否冲榜按钮
         */
        private regBtn(btnData: IBtnIconData, isShow?: boolean, isBig?: boolean): BtnIconBase {
            //对应功能开启表的，判断对应的功能是否开启
            let id = btnData.id;//常驻活动时是功能开启ID，中控活动是活动ID
            let openIdx = id;//功能开启ID
            if(btnData.openIdx){
                //存在openIdx时，做下映射
                openIdx = btnData.openIdx
                if(!this._btnOpenIdxMap[btnData.openIdx]){
                    this._btnOpenIdxMap[btnData.openIdx] = [];
                }
                if(this._btnOpenIdxMap[btnData.openIdx].indexOf(id) < 0){
                    this._btnOpenIdxMap[btnData.openIdx].push(id);
                }
            }
            let cfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, openIdx);
            if (cfg && !ViewMgr.getIns().checkViewOpen(openIdx)) {
                return null;
            }

            // 显示逻辑判断，收缩时候判断是否还显示
            if (isShow != undefined) {
                if (isShow == false && !cfg.always_show) {
                    return null;
                }
            }
            // 隐藏
            if (btnData.isHide) {
                return null;
            }
            // 有回调，不展示按钮。回调对应的handlerMsg放到mdr处理
            if (btnData.handler) {
                let _isShow = btnData.handler.exec();
                if (!_isShow) {
                    return null;
                }
            }

            //倒计时结束
            if (!btnData.showTime && btnData.endTime && btnData.endTime > TimeMgr.time.serverTimeSecond) {
                return null;
            }

            let btn = new BtnIconBase(id, isBig);//todo 传入IBtnIconData
            //若不传红点路径，则取默认[m,v]
            if ((!btnData.hintMsg || !btnData.hintMsg.length) && !btnData.hintMsgList) {
                btnData.hintMsg = [btnData.m, btnData.v];
            }
            //若不传红点类型，默认红点规则Common
            if (!btnData.hintType) {
                btnData.hintType = BtnIconHintType.Common;
            }

            //默认永不展示特效，修改配置了。
            // if (!btnData.effType) {
            //     btnData.effType = BtnIconEffType.None;
            // }
            btnData.effType = cfg.effType || BtnIconEffType.None;
            btnData.sweepType = cfg.sweepType || 0;

            let icon = cfg && cfg.icon ? cfg.icon : '';
            //OperActivityData
            if(btnData.param && btnData.param.actInfo && btnData.param.actInfo instanceof msg.oper_act_item){
                icon = btnData.icon;//中控活动取配置的icon
            }
            btnData.icon = icon;
            btnData.sort_num = cfg ? cfg.sort_num : 0;
            btn.data = btnData;
            return btn;
        }

        /**
         * 展示时间否
         * @param btnData
         */
        public checkBtnTime(btnData: IBtnIconData): boolean {
            if (btnData && btnData.showTime) {
                return true;
            }
            let endTime = btnData && btnData.endTime || 0;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            return leftTime > 0;
        }

        /**================================ 按钮特效 ================================*/

        private _id = 0;
        private _effect: {
            [key: number]: {
                animate: UIAnimate, cb: Handler, autoRemove: boolean
            }
        } = {};

        /**
         * 特效播放 ---- 搭配removeEffect使用
         * @param src 特效资源
         * @param times 播放次数， <1 无限次播放
         * @param parent 特效容器，默认加入容器的显示列表尾部
         * @param cb 特效播放完回调函数
         * @param scale scale，默认1
         * @param autoRemove 播放完是否移除，默认true
         * @param speed 播放速度，默认1
         * @param frameRate 播放帧率，默认12
         */
        public addEftByParent(src: string, times: number, parent: egret.DisplayObjectContainer,
                              cb: Handler = null, scale: number = 1, autoRemove: boolean = true,
                              speed: number = 1, frameRate: number = 12): number {
            return this.add(src, 0, 0, cb, times, parent, -1, scale, autoRemove, speed, frameRate);
        }

        public add(src: string, x: number, y: number, cb: Handler, times: number,
                   parent: egret.DisplayObjectContainer, idx: number, scale: number = 1,
                   autoRemove: boolean = true, speed: number = 1, frameRate: number = 12): number {
            if (!src) {
                return 0;
            }
            let id = ++this._id;
            let animate = Pool.alloc(UIAnimate);
            let source: string = src.indexOf("assets") > -1 ? src : ResUtil.getEffectUI(src);
            animate.x = x;
            animate.y = y;
            animate.id = id;
            animate.times = times;
            animate.scaleX = animate.scaleY = scale;
            animate.speed = speed;
            animate.complete = Handler.alloc(this, this.onPlayComp);
            if (parent) {
                if (idx >= 0) {
                    parent.addChildAt(animate, idx);
                } else {
                    parent.addChild(animate);
                }
            }
            this._effect[id] = {animate, cb, autoRemove};
            animate.load(source, frameRate);
            return id;
        }

        private onPlayComp(animate: UIAnimate): void {
            if (!animate) {
                return;
            }
            let effect = this._effect[animate.id];
            if (!effect) {
                return;
            }
            let cb = effect.cb;
            if (effect.autoRemove) {
                this.removeEffect(animate.id);
            }
            if (cb) {
                cb.exec();
                Pool.release(cb);
            }
            effect.cb = null;
        }

        public removeEffect(id: number): void {
            let effect = this._effect[id];
            if (!effect) {
                return;
            }
            if (effect.animate.parent) {
                effect.animate.parent.removeChild(effect.animate);
            }
            if (effect.cb) {
                Pool.release(effect.cb);
                effect.cb = null;
            }
            Pool.release(effect.animate);
            this._effect[id] = null;
            delete this._effect[id];
        }

        //按钮管理器，显示指引
        public showGuide(): void {
            let showBtnMap = this._showBtnMap;
            for (let k in showBtnMap) {
                let btnIcon = showBtnMap[k];
                let btnData = btnIcon ? btnIcon.data : null;
                if (btnData && btnData.guideKey) {
                    GuideMgr.getIns().show(btnData.guideKey, btnIcon, Handler.alloc(btnIcon, btnIcon.onTap));//指引
                }
            }
        }

        //按钮管理器，清除指引
        public clearGuide(): void {
            let showBtnMap = this._showBtnMap;
            for (let k in showBtnMap) {
                let btnIcon = showBtnMap[k];
                let btnData = btnIcon ? btnIcon.data : null;
                if (btnData && btnData.guideKey) {
                    GuideMgr.getIns().clear(btnData.guideKey);//指引
                }
            }
        }

        /**
         * 更新活动开启，中控活动不用缓存，一般设置关闭的时候才用
         * @param id BtnIconId
         * @param isOpen 开启
         * @param isAct 是否中控活动
         * @param isCache 删除缓存isOpen否，默认删除。传入true不删除
         */
        public updateOpen(id: BtnIconId, isOpen: boolean, isAct?: boolean, isCache?: boolean): boolean {
            if (!this._btnDataMap[id]) {
                if(!isAct){
                    BtnIconMgr._btnTmpMap[id] = isOpen;//缓存数据，中控活动不用缓存
                    if (isCache) {
                        BtnIconMgr._btnTmpCacheMap[id] = isCache;
                    }
                }
                return false;
            }
            let btnData: IBtnIconData = this._btnDataMap[id];
            let lastIsHide = !!btnData.isHide;//转化为布尔值
            let isHide = !isOpen;
            if(lastIsHide != isHide){
                //判断不一致时才处理
                btnData.isHide = isHide;//修改按钮字段
                this.dealSingleBtnIcon(id);
                if(isHide){
                    facade.sendNt(ActivityEvent.ON_ACTIVITY_ICON_HIDE, id);//发送事件关闭界面
                }
            }
            return true;
        }

    }
}