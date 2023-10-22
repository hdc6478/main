namespace game.mod {

    import PoolObject = base.PoolObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TextField = egret.TextField;
    import Tween = base.Tween;
    import Pool = base.Pool;
    import HorizontalAlign = egret.HorizontalAlign;
    import VerticalAlign = egret.VerticalAlign;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import prop_tips_data = msg.prop_tips_data;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import Rectangle = egret.Rectangle;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import ParamConfig = game.config.ParamConfig;

    export class PropTipsMgr implements UpdateItem {

        private _tips: prop_tips_data[][];
        private _lastShowTime: number = 0;
        private readonly DURATION: number = 520;
        private SHOW_PER: number = 10;

        private static _instance: PropTipsMgr;

        public props: PropTips[] = [];

        private _prop_queue: prop_tips_data[][] = [];//恭喜获得奖励队列
        private _isShowing: boolean = false;//是否正在表现

        private _surface_queue: {index: number, triggerGuide: boolean}[] = [];//获得外显队列
        private _isShowSurface: boolean = false;//是否正在表现
        private _delaySurface: number;//延迟0.2秒表现
        private _pauseSurface: boolean;//暂停外显表现

        private _prop_queue_center: prop_tips_data[][] = [];//居中恭喜获得奖励队列
        private _isShowingCenter: boolean = false;//是否正在表现
        private _delayCenter: number;//延迟0.2秒表现

        private _boss_queue: {type: number, endTime: number}[] = [];//BOSS开启队列
        private _isShowBoss: boolean = false;//是否正在表现
        private _delayBoss: number;//延迟0.2秒表现
        private _pauseBoss: boolean;//暂停BOSS表现

        public static getIns(): PropTipsMgr {
            if (!this._instance) {
                this._instance = new PropTipsMgr();
            }
            return this._instance;
        }

        /**黑底掉落*/
        public show(drops: prop_tips_data[]) {
            if (drops.length >= this.SHOW_PER + 3) {
                let list = [];
                for (let i = 0, l = drops.length; i < l; ++i) {
                    list.push(drops[i]);
                    if (list.length >= this.SHOW_PER || i == l - 1) {
                        this.showProps(list);
                        list = [];
                    }
                }
            } else {
                this.showProps(drops);
            }
        }

        private showProps(props: prop_tips_data[]) {
            if (!this._tips) {
                this._tips = [];
            }
            //正在显示，加入显示队列
            if (TimeMgr.time.serverTime - this._lastShowTime < this.DURATION) {
                this._tips.push(props);
                return;
            }
            if (this._tips.length == 0) {
                this.showTips(props);
            }
        }

        private showTips(drop: prop_tips_data[]) {
            this._lastShowTime = TimeMgr.time.serverTime;
            for (let item of this.props) {
                let h = drop.length * item.height;
                Tween.get(item).to({y: item.y - h}, 500, null, Sine.easeIn);
            }
            for (let i = 0, l = drop.length; i < l; i++) {
                let tips: PropTips = Pool.alloc(PropTips);
                tips.show(drop[i], i);
                PropTipsMgr.getIns().props.push(tips);
            }
            TimeMgr.addUpdateItem(this, 100);
        }

        private checkNext() {
            if (this._tips.length == 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            let drop = this._tips.shift();
            this.showTips(drop);
        }

        update(time: base.Time) {
            if (time.serverTime - this._lastShowTime >= this.DURATION) {
                this.checkNext();
            }
        }

        /**清除黑底掉落*/
        public clear() {
            if (this._tips && this._tips.length) {
                this._tips.length = 0;
            }
        }
        //清除队列数据
        public clearData(): void {
            if (this._prop_queue && this._prop_queue.length) {
                this._prop_queue.length = 0;
            }
            if (this._surface_queue && this._surface_queue.length) {
                this._surface_queue.length = 0;
            }
            if (this._prop_queue_center && this._prop_queue_center.length) {
                this._prop_queue_center.length = 0;
            }
            if (this._boss_queue && this._boss_queue.length) {
                this._boss_queue.length = 0;
            }
        }

        /**恭喜获得掉落*/
        public showBestProp(drops: prop_tips_data[]): void {
            this._prop_queue.push(drops);
            if (!this._isShowing) {
                this.showNextBestProp();
            }
        }
        /**恭喜获得掉落，客户端读取配置时用*/
        public showBestPropArray(datas: number[][]): void {
            let drops: prop_tips_data[] = [];
            for(let info of datas){
                let index = info[0];
                let cnt = info[1];
                let dropInfo: prop_tips_data = new msg.prop_tips_data();
                dropInfo.idx = Long.fromValue(index);
                dropInfo.cnt = cnt;
                drops.push(dropInfo);
            }
            this.showBestProp(drops);
        }
        private showNextBestProp(): void {
            let info = this.popBestProp();
            if (!info) {
                return;
            }
            this._isShowing = true;
            facade.showView(ModName.Bag, BagViewType.BestPropTips, info);
        }
        private popBestProp(): prop_tips_data[] {
            return this._prop_queue.shift();
        }
        //结束当前表现
        public closeBestProp(): void {
            this._isShowing = false;
            this.showNextBestProp();
        }

        /**获得外显*/
        public showSurface(index: number, triggerGuide: boolean = true): void {
            this._surface_queue.push({index: index, triggerGuide: triggerGuide});
            this.showNextSurface();
        }
        private showNextSurface(): void {
            if (this._isShowSurface) {
                //正在表现时则返回
                return;
            }
            if(this._pauseSurface){
                //暂停表现时则返回
                return;
            }
            let info = this.popSurface();
            if (!info) {
                return;
            }
            this._isShowSurface = true;
            this._delaySurface = delayCall(Handler.alloc(this, () => {
                this._delaySurface = 0;
                facade.showView(ModName.Surface, SurfaceViewType.SurfaceTips, info);
            }), 200);//延迟执行，防止界面重复弹窗时，外显全部回收问题
        }
        private popSurface(): {index: number, triggerGuide: boolean} {
            return this._surface_queue.shift();
        }
        //结束当前表现
        public closeSurface(): void {
            this._isShowSurface = false;
            this.showNextSurface();
        }
        //暂停当前表现
        public pauseSurface(): void {
            this._pauseSurface = true;
        }
        //继续当前表现
        public continueSurface(): void {
            this._pauseSurface = false;
            this.showNextSurface();
        }

        /**居中的恭喜获得掉落*/
        public showBestPropCenter(drops: prop_tips_data[]): void {
            if (!drops || !drops.length) {
                return;
            }
            //奖励数量超过100时，分批显示
            let cfg: ParamConfig = GameConfig.getParamConfigById("prop_gain_max_count");
            let maxCnt = cfg && cfg.value || 100;//数量上限
            while (drops.length > maxCnt){
                let rewards = drops.splice(0, maxCnt);
                this._prop_queue_center.push(rewards);
                this.startNextBestPropCenter();
            }
            if(drops.length){
                this._prop_queue_center.push(drops);
            }
            this.startNextBestPropCenter();
        }
        private startNextBestPropCenter(): void {
            if (!this._isShowingCenter) {
                this.showNextBestPropCenter();
            }
        }
        private showNextBestPropCenter(): void {
            let info = this.popBestPropCenter();
            if (!info) {
                return;
            }
            this._isShowingCenter = true;
            this._delayCenter = delayCall(Handler.alloc(this, () => {
                this._delayCenter = 0;
                facade.showView(ModName.Bag, BagViewType.PropGain, info);
            }), 200);//延迟执行，防止界面重复弹窗时，特效回收问题
        }
        private popBestPropCenter(): prop_tips_data[] {
            return this._prop_queue_center.shift();
        }
        //结束当前表现
        public closeBestPropCenter(): void {
            this._isShowingCenter = false;
            this.showNextBestPropCenter();
        }

        /**BOSS开启*/
        public showBoss(type: number, endTime: number): void {
            this._boss_queue.push({type: type, endTime: endTime});
            this.showNextBoss();
        }
        private showNextBoss(): void {
            if (this._isShowBoss) {
                //正在表现时则返回
                return;
            }
            if(this._pauseBoss){
                //暂停表现时则返回
                return;
            }
            if(!SceneUtil.isShowMain() || !ViewMgr.getIns().isMain()){
                //非挂机场景或者主界面时则返回
                this._pauseBoss = true;
                return;
            }
            let info = this.popBoss();
            if (!info) {
                return;
            }
            if(info.endTime <= TimeMgr.time.serverTimeSecond){
                this.showNextBoss();
                return;
            }
            this._isShowBoss = true;
            this._delayBoss = delayCall(Handler.alloc(this, () => {
                this._delayBoss = 0;
                if(info.type == BossTipsType.Abyss){
                    facade.showView(ModName.Boss, BossViewType.AbyssTips);
                }
                else if(info.type == BossTipsType.CrossBoss){
                    facade.showView(ModName.Boss, BossViewType.CrossBossTips);
                }
                else if(info.type == BossTipsType.KuafuDoufa){
                    facade.showView(ModName.Compete, CompeteViewType.KuafuDoufaTips);
                }
                else if (info.type == BossTipsType.XianjieLuandou) {
                    facade.showView(ModName.More, MoreViewType.XianjieLuandouBossTips);
                }
            }), 200);//延迟执行，防止界面重复弹窗时，外显全部回收问题
        }
        private popBoss(): {type: number, endTime: number} {
            return this._boss_queue.shift();
        }
        //结束当前表现
        public closeBoss(): void {
            this._isShowBoss = false;
            this.showNextBoss();
        }
        //继续当前表现
        public continueBoss(): void {
            this._pauseBoss = false;
            this.showNextBoss();
        }
    }

    export class PropTips extends DisplayObjectContainer implements PoolObject {

        private readonly MIN_W: number = 299;
        private _txt: TextField;
        private _imgBg: BitmapBase;

        constructor() {
            super();
            this.initUI();
        }

        private initUI() {
            this.touchEnabled = false;
            this.width = this.MIN_W;
            this.height = 64;
            this._imgBg = Pool.alloc(BitmapBase);
            this._imgBg.source = "tran_di3";
            this._imgBg.height = this.height;
            this._imgBg.scale9Grid = Pool.alloc(Rectangle).setTo(118, 16, 1, 1);
            this.addChild(this._imgBg);

            this._txt = new TextField();
            this._txt.textAlign = HorizontalAlign.CENTER;
            this._txt.verticalAlign = VerticalAlign.MIDDLE;
            this._txt.width = this.width;
            this._txt.height = this.height;
            this._txt.stroke = 1;
            this._txt.size = 20;
            this.addChild(this._txt);
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        public show(item: prop_tips_data, index: number) {
            this.x = (Layer.main.width - this.width) * 0.5;
            this.y = 950;
            let prop = PropData.create(item.idx);
            let name: string = prop.cfg.name;
            this._txt.text = name + "×" + item.cnt;
            let color = ColorUtil.getColorByQuality2(prop.quality);
            this._txt.textColor = color;
            this.width = Math.max(this._txt.textWidth + 20, this.MIN_W);
            this._imgBg.width = this.width;
            this._txt.width = this.width;
            Layer.main.addChild(this);
            this.alpha = 0;
            /**16为掉落提示减少的间距*/
            Tween.get(this)
                .to({y: this.y - (index * (this.height - 16)) - 150, alpha: 1}, 500, null, Sine.easeIn)
                .delay(1100)
                .to({alpha: 0}, 150)
                .exec(Handler.alloc(this, this.onTweenDone));
        }

        private onTweenDone() {
            Pool.release(this);
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            Tween.remove(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            let items = PropTipsMgr.getIns().props;
            let idx = items.indexOf(this);
            if (idx > -1) {
                ArrayUtil.removeAt(items, idx);
            }
        }
    }
}
