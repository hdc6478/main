namespace game.mod.chat {

    import TouchEvent = egret.TouchEvent;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class ChatSettingMdr extends MdrBase {
        private _view: ChatSettingView= this.mark("_view", ChatSettingView);
        private _proxy: ChatProxy;
        private _list: eui.CheckBox[];
        private readonly CHAT_SETTING_TIME = 15;//屏蔽间隔之间需要15秒

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.verticalCenter = 0;

            this._proxy = this.retProxy(ProxyType.Chat);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(ChatEvent.ON_CHAT_SETTING_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initView();
            this.updateView();
            this._proxy.c2s_chat_open_setting();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickCheck(e: TouchEvent): void {
            let clickCheckbox = e.target;
            for (let i = 0; i < this._list.length; ++i) {
                let checkbox= this._list[i];
                if(clickCheckbox == checkbox){
                    let type = i + 1;
                    let settingTime = this._proxy.settingTime;
                    let curTime = TimeMgr.time.serverTimeSecond;
                    if(settingTime && settingTime + this.CHAT_SETTING_TIME > curTime){
                        this.updateSelected(type, checkbox);//恢复选中状态
                        let tips = StringUtil.substitute(getLanById(LanDef.chat_setting_tips), [this.CHAT_SETTING_TIME]);
                        PromptBox.getIns().show(tips);//屏蔽间隔之间需要15秒
                        return;
                    }
                    this._proxy.settingTime = curTime;
                    this._proxy.c2s_chat_setting(type);
                    break;
                }
            }

        }

        private initView(): void {
            this._list = [
                this._view.checkbox1,
                this._view.checkbox2,
                this._view.checkbox3
            ];
            let addEventListener = this.onEgret.bind(this);
            for (let i = 0; i < this._list.length; ++i) {
                let checkbox= this._list[i];
                addEventListener(checkbox, TouchEvent.TOUCH_TAP, this.onClickCheck);
                let type = i + 1;
                let str = "chat_setting" + type;
                checkbox.labelDisplay.text = getLanById(str);
            }
        }

        private updateView(): void {
            for (let i = 0; i < this._list.length; ++i) {
                let checkbox = this._list[i];
                let type = i + 1;
                this.updateSelected(type, checkbox);
            }
        }

        private updateSelected(type: number, checkbox: eui.CheckBox): void {
            let isSelected = this._proxy.isSettingSelected(type);
            checkbox.selected = isSelected;
        }

    }
}