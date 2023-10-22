namespace game.mod.more {

    import HuanjinParamConfig = game.config.HuanjinParamConfig;

    export class HuanjingGrowMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HuanjingGrowMainBtnType.Btn1,
                icon: "",
                mdr: HuanjingGrowMdr,
                bg: "huanjing_bg1"
            }
        ];

        private _proxy: HuanjingProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
        }

        protected updateBtnList() {
            //动态传入，修改页签资源等 todo
            if (this._showArgs && Array.isArray(this._showArgs)) {
                let arg0 = this._showArgs[0];
                let systemId = this._showArgs[1];
                if (arg0 == HuanjingGrowMainBtnType.Btn1) {
                    let cfg: HuanjinParamConfig = getConfigByNameId(ConfigName.HuanJingParam, systemId);
                    let btnData = this._btnData[0];//直接取第一个
                    if (btnData) {
                        btnData.icon = `huanjing_system${systemId}_`;// 动态修改icon
                        btnData.title = cfg ? cfg.name1 : '';
                        btnData.hintTypes = this._proxy.getGrowHintPath(systemId);
                    }
                }
            }
            super.updateBtnList();
        }
    }
}