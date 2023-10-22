namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import forbidden_item = msg.forbidden_item;

    export class ForbiddenSaodangMdr extends MdrBase {

        private _view: ForbiddenSaodangView = this.mark("_view", ForbiddenSaodangView);

        private _proxy: ShilianProxy;
        private _listData: ArrayCollection;

        private _curType: number;               // 当前选中的分类（1~5）
        // private _curBigGateData: {info: forbidden_item, cfg: ForbiddenFubenConfig};

        private _canSaodang: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.verticalCenter = 0;
            this._view.horizontalCenter = 0;

            this._listData = new ArrayCollection();
            this._view.list_item.itemRenderer = ForbiddenSaodangRender;
            this._view.list_item.dataProvider = this._listData;

            this._proxy = this.retProxy(ProxyType.Shilian);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShilianEvent.ON_FORBIDDEN_INFO_UPDATE, this.updateInfo, this);
            
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_saodang, TouchEvent.TOUCH_TAP, this.onClickGemUse);
        }

        protected onShow(): void {
            super.onShow();
            this._curType = this._showArgs[0];
            this._canSaodang = false;//打开界面时候初始化
            // this._curBigGateData = this._showArgs[1];
            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }
        
        private updateInfo() {
            let cfgs: {[bigGateId: string]: ForbiddenFubenConfig}= this._proxy.getFbdFubenCfgByType(this._curType);
            let arr = [];
            let i = 0;
            for(let idx in cfgs) {
                let cfg = cfgs[idx];
                let finished: boolean = this._proxy.isBigGateFinished(this._curType, cfg.index);
                if(finished && !this._canSaodang) {
                    this._canSaodang = true;
                }
                let data: {fbdFubenCfg: ForbiddenFubenConfig, fbdGateCfg: ForbiddenGateConfig, 
                    passSmallGateId: number, isFinished: boolean} = {
                    fbdFubenCfg: cfg,
                    fbdGateCfg: this._proxy.getGateEndCfg(cfg.index),
                    passSmallGateId: this._proxy.getCurSmallGateId(this._curType, cfg.index),
                    isFinished: finished
                };
                arr.push(data);
                i++;
            }
            this._listData.replaceAll(arr);

            let times = this._proxy.getSaodangTimes(this._curType);
            this._view.btn_saodang.label = `免费扫荡(${times}/1)`;
            this._view.currentState = this._canSaodang ? "can_fight" : "can_not_fight";
            this._view.btn_saodang.redPoint.visible = this._canSaodang && times >= 1;
            if(!this._canSaodang && this._listData.length) {
                let firstData = this._listData.getItemAt(0);
                let finishedStr: string = TextUtil.addColor(`当前进度：${firstData.passSmallGateId}/${firstData.fbdGateCfg.gate_id}`, WhiteColor.RED);
                this._view.lab_tip.textFlow = TextUtil.parseHtml(finishedStr);
            }
        }

        private onClickGemUse() {
            let times = this._proxy.getSaodangTimes(this._curType);
            if(!this._curType || !this._canSaodang || times < 1) {
                PromptBox.getIns().show("每日0点重置扫荡次数");
                return;
            }
            this._proxy.c2s_forbidden_sweep(this._curType);
        }

    }
}