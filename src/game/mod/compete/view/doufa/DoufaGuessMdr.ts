namespace game.mod.compete {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;

    export class DoufaGuessMdr extends MdrBase {

        private _view: DoufaGuessView = this.mark("_view", DoufaGuessView);
        private _proxy: CompeteProxy;
        protected _showArgs: teammate;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_guess, TouchEvent.TOUCH_TAP, this.onClickGuess);
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGuess(): void {
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            let info = this._showArgs;
            this._proxy.c2s_pvp_battle_guess(info.role_id);
        }

        private updateShow(): void {
            let info = this._showArgs;
            this._view.img_head.source = ResUtil.getDressUpIcon(info.head.toNumber(), info.sex);
            this._view.lab_name.text = info.name;
            this._view.power.setPowerValue(info.showpower, WhiteColor.DEFAULT);

            let cfg: ParamConfig = GameConfig.getParamConfigById("doufa_times");
            let costInfoList: number[][] = cfg.value;
            let costInfo: number[] = [];//倍率_货币_货币数量
            if(this._proxy.groupStatus == DoufaGroupStatus.First){
                //小组赛
                costInfo = costInfoList[0];
            }
            else {
                costInfo = costInfoList[1];
            }
            let doubleValue = costInfo[0];
            let doubleStr = getLanById(LanDef.doufa_tips17) + "：" + TextUtil.addColor(doubleValue + "%", WhiteColor.GREEN);
            this._view.lab_double.textFlow = TextUtil.parseHtml(doubleStr);

            let idx = costInfo[1];
            let cnt = costInfo[2];
            this._cost = [idx, cnt];
            this._view.costIcon.updateShow(this._cost);

            //2.5倍仙玉
            let propCfg: PropConfig = GameConfig.getPropConfigById(idx);
            let tips1 = (doubleValue / 100) + "";
            let tips2 = propCfg.name;
            let tipsStr = StringUtil.substitute(getLanById(LanDef.doufa_tips18), [tips1, tips2]);//竞猜成功获%s倍%s，竞猜失败原额返还
            this._view.lab_tips.text = tipsStr;
        }
    }
}
