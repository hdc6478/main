namespace game.mod.role {

    import AyahEventFuncConfig = game.config.AyahEventFuncConfig;
    import OpenFunctionConfig = game.config.OpenFunctionConfig;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuResultMdr extends MdrBase {
        private _view: XiuxianNvpuResultView = this.mark("_view", XiuxianNvpuResultView);
        private _proxy: XiuxianNvpuProxy;
        /**1.在线领取2.离线领取*/
        private _operType = 1;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list.itemRenderer = BaseZhuangshiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();
            this._operType = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {

            let strList: string[] = [];
            let list = this._proxy.reward_list;
            for (let item of list) {
                let eventCfg: AyahEventFuncConfig = getConfigByNameId(ConfigName.XiuxianNvpuEventFunc, item.type);
                if (eventCfg && eventCfg.open_func) {
                    let funcCfg: OpenFunctionConfig = getConfigByNameId(ConfigName.OpenFunction, eventCfg.open_func);
                    if (!funcCfg) {
                        continue;
                    }
                    strList.push(getLanById(LanDef.xiuxiannvpu_tips7) + `${funcCfg.name}: ${item.count}次`);
                }
            }
            this._listData.replaceAll(strList);
        }

        private onClick(): void {
            this._proxy.c2s_ayah_get_reward(this._operType);
            this.hide();//todo
        }
    }
}