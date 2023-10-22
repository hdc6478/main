namespace game.mod.misc {
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import Time = base.Time;
    import UpdateItem = base.UpdateItem;
    import Pool = base.Pool;
    import MainGPlayer = game.scene.MainGPlayer;
    import Handler = base.Handler;
    import Point = egret.Point;

    export class MiscMdr extends EffectMdrBase implements UpdateItem {
        private _timeout: number = 0;

        private _proxy: MiscProxy;
        private _enableSyncTime: boolean = false;
        private static UpdateInterval: number = 1000;
        private _point:Point = new Point();

        constructor() {
            super(null);
            this.newView();
            this.init();
        }

        private init(): void {
            this._proxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
            this.addListeners();
            TimeMgr.addUpdateItem(this, MiscMdr.UpdateInterval);
        }

        protected newView(): void {
            this._effHub = new UIEftHub(Layer.tip);
        }

        public show(obj?: any): void {

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onTap);
            this.onNt(MiscEvent.START_SYNC_TIME, this.startSyncTime, this);
            this.onNt(MiscEvent.STOP_SYNC_TIME, this.stopSyncTime, this);
            this.onNt(LauncherEvent.ON_ACTIVATE, this.onActivate, this);
            this.onNt(LauncherEvent.ON_DEACTIVATE, this.onDeactivate, this);

            this.onNt(MiscEvent.PAY_SUCCESS, this.onPaySuccess, this);

            this.onNt(MiscEvent.GET_ORDER_START, this.onGetOrderStart, this);
            this.onNt(MiscEvent.GET_ORDER_END, this.onGetOrderEnd, this);
            this.onNt(MiscEvent.GET_ORDER_ERROR, this.onGetOrderError, this);

            //侦听键盘事件
            let sourceX = 0;
            let  sourceY = 0;
            window.document.onkeydown=function(event:any){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==65) { // 按A 65

                    if(1){
                       let rand = Math.floor(Math.random()*100);
                       console.log("rand = "+rand);
                        return
                    }

                    //
                    let proxy:ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                    let bossVo = proxy.getBossVo();

                    if(!bossVo){
                        return;
                    }

                    let mainVO = MainGPlayer.ins.vo;
                    console.log("主角格子坐标" + mainVO.x+","+mainVO.y);
                    console.log("boss " + bossVo.name + " 格子坐标 "  + bossVo.x+","+bossVo.y);
                    let curDis = PointUtil.distance(mainVO.x, mainVO.y, bossVo.x, bossVo.y);
                    console.log("主角跟 boss 的距离 " + curDis);

                    // let pools = Pool["Pools"];
                    // for (let k in pools) {
                    //     let data = pools[k];
                    //     if (data && data._list.length > 50) {
                    //         let data2 = data._list[0];
                    //         let name = data2.__proto__.__class__;
                    //         console.error("对象池超100的: " + name + " " + data._list.length);
                    //     }
                    // }

                }else if(e && e.keyCode==65){
                    if(1){
                        egret.ticker. pause();
                        return;
                    }

                    let dsp = MainGPlayer.ins.dsp;
                    let x = dsp.x;
                    let y = dsp.y;
                    let self = this;

                }if(e && e.keyCode==83){
                    if(!this.sourceX){
                        this.sourceX = MainGPlayer.ins.dsp.x-200;
                        this.sourceY = MainGPlayer.ins.dsp.y;
                    }
                    MainGPlayer.ins.dsp.x = this.sourceX;
                    MainGPlayer.ins.dsp.y =  this.sourceY;

                }if(e && e.keyCode == 69){
                    let dsp = MainGPlayer.ins.dsp;
                    dsp.x = this.sourceX-100;
                    dsp.y = this.sourceY;
                }else if(e && e.keyCode == 68){



                }

                else if(e && e.keyCode==83){

                    if(1){
                        egret.ticker.resume();
                        return;
                    }

                    // let proxy: ILoginProxy = facade.retMod(ModName.Login).retProxy(ProxyType.Login);
                    // // if (DEBUG) {
                    // // @ts-ignore
                    // proxy.service.close();
                }
            };

        }


        private onTap(e: TouchEvent) {


            GuideMgr.getIns().tips();//玩家操作时调用

            this._point = Layer.tip.globalToLocal(e.stageX, e.stageY,this._point);

            this.addEftByParent(UIEftSrc.ClickEff, Layer.tip,  this._point.x,  this._point.y, -1, null, 1);
        }

        private onActivate() {
            TimeMgr.addUpdateItem(this, MiscMdr.UpdateInterval);
        }

        private onDeactivate() {
            TimeMgr.removeUpdateItem(this);
        }

        public startSyncTime() {
            this._proxy.lastSyncTick = TimeMgr.time.time;
            this._enableSyncTime = true;
        }

        public stopSyncTime() {
            this._enableSyncTime = false;
        }

        public update(time: Time) {
            if (this._enableSyncTime && time.time - this._proxy.lastSyncTick > 300000) {
                this._proxy.syncTime();
            }
        }

        private onPaySuccess() {
            ViewMgr.getIns().show("充值成功！");
        }

        private onGetOrderStart() {
            Black.ins().show();
        }

        private onGetOrderEnd() {
            Black.ins().hide();
        }

        private onGetOrderError() {
            ViewMgr.getIns().show("获取支付订单号失败！");
            Black.ins().hide();
        }
    }
}
