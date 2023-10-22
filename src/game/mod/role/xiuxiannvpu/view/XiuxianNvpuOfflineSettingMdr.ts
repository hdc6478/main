namespace game.mod.role {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class XiuxianNvpuOfflineSettingMdr extends MdrBase {
        private _view: XiuxianNvpuOfflineSettingView = this.mark("_view", XiuxianNvpuOfflineSettingView);
        private _proxy: XiuxianNvpuProxy;
        private _listData: eui.ArrayCollection;
        private _eventTypes: number[] = [];

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._view.list.itemRenderer = XiuxianNvpuOfflineSettingItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_goto, egret.TouchEvent.TOUCH_TAP, this.onClickGoto, this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);

            this.onNt(RoleEvent.ON_XIUXIANNVPU_OFFLINESETTING_SELECT, this.onUpdateCheckboxSelected, this);
            this.onNt(RoleEvent.ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL, this.onUpdateCheckboxSelectedDel, this);
        }

        protected onShow(): void {
            super.onShow();

            this._eventTypes = this._proxy.offline_list.concat();
            this.updateView();
        }

        protected onHide(): void {
            this.confirmEditCheckbox();
            super.onHide();
        }

        private updateView(): void {
            let tiandiList = this._proxy.getTiandiList();
            this._listData.replaceAll(tiandiList);


            let isAllActed = true;
            let godProxy: IGodProxy = getProxy(ModName.God, ProxyType.God);
            for (let type of tiandiList) {
                if (!godProxy.getActivate(type)) {
                    isAllActed = false;
                    break;
                }
            }
            this._view.lb_acted.visible = isAllActed;
            this._view.btn_goto.visible = !isAllActed;
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xiuxiannvpu_tips2));
        }

        private onClickGoto(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Tiandilu, true)) {
                return;
            }
            if (!RoleUtil.isRoleRingAct()) {
                PromptBox.getIns().show("未激活主角光环");
                return;
            }
            ViewMgr.getIns().showView(ModName.God, GodViewType.GodMain, MdrTabBtnType.TabBtnType02);
            this.hide();
        }

        //最终确定勾选框
        private confirmEditCheckbox(): void {
            let eventTypes = this._eventTypes || [];
            let offlineList = this._proxy.offline_list;
            if (eventTypes.length != offlineList.length) {
                this._proxy.c2s_ayah_edit_show(1, this._eventTypes);
                return;
            }

            let map = {};
            for (let type of offlineList) {
                map[type] = true;
            }
            let isSame = true;
            for (let type of this._eventTypes) {
                if (!map[type]) {
                    isSame = false;//有一个不同
                    break;
                }
            }
            if (!isSame) {
                this._proxy.c2s_ayah_edit_show(1, this._eventTypes);
            }
        }

        private onUpdateCheckboxSelected(n: GameNT): void {
            let eventType = n.body as number;
            if (this._eventTypes.indexOf(eventType) < 0) {
                this._eventTypes.push(eventType);
            }
        }

        private onUpdateCheckboxSelectedDel(n: GameNT): void {
            let eventType = n.body as number;
            let idx = this._eventTypes.indexOf(eventType);
            if (idx > -1) {
                this._eventTypes.splice(idx, 1);
            }
        }
    }
}