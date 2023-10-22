namespace game.mod.union {


    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;

    /**改名弹窗 */
    export class UnionRenameMdr extends MdrBase {
        private _view: UnionRenameView = this.mark("_view", UnionRenameView);
        private _proxy: UnionProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onRename, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._view.editable_value.text = "";

            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_name_cost");
            if (cfg) {
                this._view.btn.setCost(cfg.value);
                this._view.btn.label = "";
            } else {
                this._view.btn.resetCost();
                this._view.btn.label = "修改";
            }
        }

        private onRename(): void {
            let name: string = this._view.editable_value.text;
            if (name == "" || name.length == 0) {
                PromptBox.getIns().show("修改名字不可为空");
                return;
            }
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "guild_name_cost");
            if (!cfg) {
                cfg.value
            }
            this._proxy.c2s_change_guild_name(name);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}