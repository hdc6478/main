namespace game.mod.more {

    import Handler = base.Handler;
    import s2c_zhandui_kuanmai_pvp_ret = msg.s2c_zhandui_kuanmai_pvp_ret;
    import MiningResultFailView = game.mod.more.MiningResultFailView;

    export class MiningResultFailMdr extends EffectMdrBase {
        private _view: MiningResultFailView = this.mark("_view", MiningResultFailView);
        private _proxy: MiningProxy;
        private _btnList: eui.Image[] = [];
        public _showArgs: s2c_zhandui_kuanmai_pvp_ret;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Mining);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();


            // this.addEftByParent(UIEftSrc.Default, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
            if (this._showArgs.type == 1 || this._showArgs.type == 2) {
                this._view.img_title.source = "jiejiushibai";
            } else {
                this._view.img_title.source = "zhengfushibai";
            }

            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));

            //
            this._view.icon_group.removeChildren();
            this._btnList.length = 0;

            let jumpData: IJumpData = null;
            let jumpId: number = 0;
            if (!PayUtil.checkFirstCharge()) {
                //未来首充过
                jumpData = JumpDataList[JumpIdx.FirstCharge];
                jumpId = JumpIdx.FirstCharge;
            } else if (PayUtil.checkTequanling()) {
                //特权
                jumpData = JumpDataList[JumpIdx.PrerogativeWrit];
                jumpId = JumpIdx.PrerogativeWrit;
            } else {
                //充值
                jumpData = JumpDataList[JumpIdx.StoreXianyu];
                jumpId = JumpIdx.StoreXianyu;
            }
            this.addBtn(jumpData, jumpId);
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

        //
        protected jumpFunc(e: egret.Event): void {
            this.hide();
            if (e.target instanceof Btn) {
                let jumpId: number = e.target["jumpId"];
                ViewMgr.getIns().showViewByID(jumpId);
            }
        }

        protected onHide(): void {
            this._proxy.c2s_zhandui_kuanzhu_show(1);
            this.removeEft();
            super.onHide();
        }
    }
}

