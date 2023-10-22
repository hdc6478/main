namespace game.mod.role {

    import TiandiTypeConfig = game.config.TiandiTypeConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuOfflineSettingItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public list: eui.List;
        public checkBox0: eui.CheckBox;
        public checkBox1: eui.CheckBox;
        public checkBox2: eui.CheckBox;

        data: number;
        private _proxy: XiuxianNvpuProxy;
        private _checkBoxSize = 3;

        constructor() {
            super();
            this.skinName = `skins.role.XiuxianNvpuOfflineSettingItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);

            for (let i = 0; i < this._checkBoxSize; i++) {
                this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this['checkBox' + i], this.onClickCkeckbox, this);
            }
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let tiandiCfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, data);
            this.lb_name.text = tiandiCfg.name;

            let eventList = this._proxy.getTiandiEventList(data);
            let offlineList = this._proxy.offline_list || [];
            for (let i = 0; i < this._checkBoxSize; i++) {
                let checkBox: eui.CheckBox = this['checkBox' + i];
                if (!checkBox) {
                    continue;
                }
                checkBox.visible = i < eventList.length;
                if (checkBox.visible) {
                    let event = eventList[i];
                    checkBox.label = this._proxy.getEventName(event);
                    checkBox.name = event + '';
                    checkBox.selected = offlineList.indexOf(event) > -1;
                }
            }
        }

        //todo
        private onClickCkeckbox(e: egret.TouchEvent): void {
            let checkbox = e.target as eui.CheckBox;
            if (!this._proxy.isTiandiActed(this.data)) {
                checkbox.selected = false;
                let tiandiCfg: TiandiTypeConfig = getConfigByNameId(ConfigName.TiandiType, this.data);
                let str = StringUtil.substitute(getLanById(LanDef.xiuxiannvpu_tips13), [tiandiCfg.name]);
                PromptBox.getIns().show(str);
                return;
            }
            if (checkbox.selected) {
                facade.sendNt(RoleEvent.ON_XIUXIANNVPU_OFFLINESETTING_SELECT, +checkbox.name);
            } else {
                facade.sendNt(RoleEvent.ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL, +checkbox.name);
            }
        }
    }
}