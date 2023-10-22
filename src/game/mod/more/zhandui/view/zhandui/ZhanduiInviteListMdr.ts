namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import ChatLimitConfig = game.config.ChatLimitConfig

    export class ZhanduiInviteListMdr extends MdrBase {
        private _view: ZhanduiInviteListView = this.mark("_view", ZhanduiInviteListView);
        private _proxy: ZhanduiProxy;
        private _listData: eui.ArrayCollection;
        private _isSendSuccess: boolean = false;//是否发送成功
        private _sendTime: number;//发送时间
        private _chatChannel: ChatChannel = ChatChannel.Zhandui;


        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list.itemRenderer = ZhanduiInviteItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.editable_value.inputType = egret.TextFieldInputType.TEL;
            let str = StringUtil.substitute(getLanById(LanDef.zhandui_tips8), [TextUtil.addLinkHtmlTxt(getLanById(LanDef.zhandui_tips9), WhiteColor.GREEN, '')]);
            this._view.lb_noteam.textFlow = TextUtil.parseHtml(str);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
            addEventListener(this._view.checkbox1, egret.TouchEvent.TOUCH_TAP, this.onClickCheckbox1, this);
            addEventListener(this._view.checkbox2, egret.TouchEvent.TOUCH_TAP, this.onClickCheckbox2, this);
            addEventListener(this._view.lb_noteam, egret.TextEvent.LINK, this.onClickLabel, this);
            addEventListener(this._view.editable_value, egret.TextEvent.FOCUS_OUT, this.onFocusOut, this);
            addEventListener(this._view.editable_value, egret.Event.CHANGE, this.onChangeValue, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_BASE_INFO, this.updateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_TEAM_ROLE_APPLY_LIST_INFO, this.updateView, this);
            this.onNt(MoreEvent.ON_SEND_SUCCESS, this.onSendSuccess, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.sendButtonClick(ZhanduiOperType.Oper9);
            this.updateView();
        }

        private onSendSuccess() {
            this._isSendSuccess = true;
        }

        protected onHide(): void {
            this._isSendSuccess = false;
            this._sendTime = 0;
            super.onHide();
        }

        private updateView(): void {
            this._view.checkbox1.selected = this._proxy.is_check_apply;
            this._view.checkbox2.selected = this._proxy.is_check_power;
            this._view.editable_value.text = Math.floor(this._proxy.limit_showpower / 10000) + '';

            let list = this._proxy.role_apply_list;
            if (!list || !list.length) {
                this._view.currentState = 'noteam';
                return;
            }

            this._view.currentState = 'team';
            this._listData.replaceAll(list);
        }

        private onClickCheckbox1(): void {
            this._proxy.is_check_apply = !this._proxy.is_check_apply;//取反，本地做个缓存，服务端不更
            this._proxy.sendButtonClick(ZhanduiOperType.Oper16);
        }

        private onClickCheckbox2(): void {
            let val: number = +this._view.editable_value.text;
            let isSel = this._view.checkbox2.selected;
            if (isSel && !val) {
                this._view.checkbox2.selected = val > 0;
                PromptBox.getIns().show(getLanById(LanDef.zhandui_tips29));
                return;
            }
            this.onClickEditable();
        }

        private onClickLabel(): void {
            //CD限制
            let cfg: ChatLimitConfig = getConfigByNameId(ConfigName.Chat, this._chatChannel);
            let cfgCd = 0;
            let lv = RoleVo.ins.level;
            if (cfg && cfg.CD) {
                let i = 0;
                for (let len = cfg.CD.length; i < len; i++) {
                    if (lv < cfg.CD[i][0]) {
                        break;
                    }
                }
                cfgCd = cfg.CD[(i > 0 ? i - 1 : 0)][1];//取配置的CD
            }

            //等级限制，满足150级才能请求
            if (lv >= cfg.limits[0]) {
                //客户端额外CD限制，防止点击过快
                if (!this._isSendSuccess) {
                    if (this._sendTime && TimeMgr.time.serverTimeSecond - this._sendTime < cfgCd + 1) {
                        PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.zhandui_tips33), [cfgCd]));
                        return;
                    }
                    this._proxy.sendButtonClick(ZhanduiOperType.Oper11);
                    PromptBox.getIns().show(getLanById(LanDef.zhandui_tips31));
                }
                this._isSendSuccess = false;
                this._sendTime = TimeMgr.time.serverTimeSecond;
            }else {
                let limit = cfg.limits[0];
                PromptBox.getIns().show(StringUtil.substitute(getLanById(LanDef.zhandui_tips34), [limit]));
            }
        }

        private getPowerLimit(): number {
            let valStr = this._view.editable_value.text || '0';
            return (+valStr) * 10000;
        }

        private onClickEditable(): void {
            let val = this.getPowerLimit();
            let isSel = this._view.checkbox2.selected;
            this._proxy.is_check_power = isSel;//取反，本地做个缓存，服务端不更
            this._proxy.limit_showpower = val;
            this._proxy.sendButtonClickPower(isSel ? val : null);
        }

        private onFocusOut(): void {
            if (!this._view.checkbox2.selected) {
                return;
            }
            let val = this.getPowerLimit();
            this._proxy.limit_showpower = val;
            if (val == 0) {
                this._view.checkbox2.selected = false;
                this._proxy.is_check_power = false;
            }
            this._proxy.sendButtonClickPower(this._view.checkbox2.selected ? val : null);
        }

        private onChangeValue(): void {
            let val = +this._view.editable_value.text;
            if (val > 9999) {
                val = 9999;
            }
            this._view.editable_value.text = val + '';
        }
    }
}