namespace game.mod.more {

    import facade = base.facade;
    import Handler = base.Handler;
    import GateConfig = game.config.Gate1Config;

    export class XianmaiFightFailMdr extends MdrBase {
        private _view: XianmaiFightFailView = this.mark("_view", XianmaiFightFailView);
        private _proxy: XianmaiProxy;

        private _btnList:eui.Image[]=[];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            //添加倒计时
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));

            this._view.icon_group.removeChildren();
            this._btnList.length=0;

            let jumpData:IJumpData=null;
            let jumpId:number=0;
            if(!PayUtil.checkFirstCharge()){
                //未来首充过
                jumpData=JumpDataList[JumpIdx.FirstCharge];
                jumpId=JumpIdx.FirstCharge;
            }else if (PayUtil.checkTequanling()){
                //特权
                jumpData=JumpDataList[JumpIdx.PrerogativeWrit];
                jumpId=JumpIdx.PrerogativeWrit;
            }else {
                //充值
                jumpData=JumpDataList[JumpIdx.StoreXianyu];
                jumpId=JumpIdx.StoreXianyu;
            }
            this.addBtn(jumpData,jumpId);

            let proxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            let curIndex=proxy.curIndex;
            let gateCfg: GateConfig = getConfigByNameId(ConfigName.Gate, curIndex); //240000001
            let faulttips: number[] = gateCfg.faulttips;
            if (!faulttips || faulttips.length <= 0) {
                return;
            }

            for (let i = 0; i < faulttips.length; i++) {
                let jumpId = faulttips[i];
                let jumpData = JumpDataList[jumpId];
                this.addBtn(jumpData, jumpId);
            }
        }

        protected addBtn(data: IJumpData, jumpId: number): void {
            let btn = new Btn();
            btn.skinName = "skins.common.CommonBtn1Skin";
            btn.iconDisplay.source = data.icon || "huashen_task_tab1";
            btn.width = 94;
            btn.height = 94;
            btn["jumpId"] = jumpId;
            this._view.icon_group.addChild(btn);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(btn, egret.TouchEvent.TOUCH_TAP, this.jumpFunc, this);
        }

        protected jumpFunc(e: egret.Event): void {
            this.hide();
            if (e.target instanceof Btn) {
                let jumpId: number = e.target["jumpId"];
                ViewMgr.getIns().showViewByID(jumpId);
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}