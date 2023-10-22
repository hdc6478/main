namespace game.mod.more {


    import stage = egret.lifecycle.stage;
    import LanDef = game.localization.LanDef;
    import teammate = msg.teammate;
    import Handler = base.Handler;

    /**
     * 策划文档：玩家头像，点击其他玩家头像显示如下按钮，操作逻辑与仙友相同不再赘述
     */
    export class ZhanduiTeammateCheckMdr extends MdrBase {
        private _view: ZhanduiTeammateCheckView = this.mark("_view", ZhanduiTeammateCheckView);
        private _proxy: ZhanduiProxy;
        private _listData: eui.ArrayCollection;
        _showArgs: { data: teammate, point: egret.Point };

        public constructor() {
            super(Layer.tip);
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list_btn.itemRenderer = BtnTabItem;
            this._view.list_btn.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, egret.Event.CHANGING, this.onClickBtn);
            egret.callLater(() => {
                addEventListener(stage, egret.TouchEvent.TOUCH_TAP, this.onClickOther);
            }, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_CHECK_VIEW_HIDE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs || !this._showArgs.data) {
                return;
            }
            let point: egret.Point = this._showArgs.point;
            this._view.x = point.x;
            this._view.y = point.y;
            this.initTypeList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private initTypeList(): void {
            let datas: BtnTabItemData[] = [];

            datas.push({name: getLanById(LanDef.chat_cue20)});//查看
            datas.push({name: getLanById(LanDef.chat_cue22)});//私聊

            let isMyself = this._proxy.isMyself(this._showArgs.data);
            if (this._proxy.isCaption() && !isMyself) {
                datas.push({name: getLanById(LanDef.zhandui_tips14)});//转移队长
                datas.push({name: getLanById(LanDef.zhandui_tips15)});//移出战队
            } else if (isMyself) {
                datas.pop();
                datas.push({name: getLanById(LanDef.zhandui_tips16)});//退出战队
            }

            this._listData.source = datas;
            this._view.list_btn.selectedIndex = -1;
        }

        private onClickBtn(): void {
            let item: BtnTabItemData = this._view.list_btn.selectedItem;
            if (!item) {
                return;
            }
            let name = item.name;
            let info = this._showArgs.data;
            if (name == getLanById(LanDef.chat_cue20)) {
                ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
            } else if (name == getLanById(LanDef.chat_cue22)) {
                ViewMgr.getIns().chat(info);
            } else if (name == getLanById(LanDef.zhandui_tips16)) {
                this.onClickQuit();
            } else if (name == getLanById(LanDef.zhandui_tips14)) {
                ViewMgr.getIns().showConfirm(StringUtil.substitute(getLanById(LanDef.zhandui_tips17), [info.name]),
                    Handler.alloc(this, this.transferCaption, [info.role_id]));
            } else if (name == getLanById(LanDef.zhandui_tips15)) {
                ViewMgr.getIns().showConfirm(StringUtil.substitute(getLanById(LanDef.zhandui_tips18), [info.name]),
                    Handler.alloc(this, this.removeTeammate, [info.role_id]));
            }
            this.hide();
        }

        private onClickQuit(): void {
            let isCaption = this._proxy.isCaption();
            let str = isCaption ? getLanById(LanDef.zhandui_tips19) : getLanById(LanDef.zhandui_tips20);
            if (isCaption && this._proxy.team_roles.length > 1) {
                str = getLanById(LanDef.zhandui_tips20);//队长退出战队时,战队还有其他人
            }
            ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.confirmQuit));
        }

        private confirmQuit(): void {
            this._proxy.sendButtonClick(ZhanduiOperType.Oper14);
        }

        private transferCaption(role_id: Long): void {
            this._proxy.sendButtonClickRoleId(ZhanduiOperType.Oper12, role_id);
        }

        private removeTeammate(role_id: Long): void {
            this._proxy.sendButtonClickRoleId(ZhanduiOperType.Oper13, role_id);
        }

        private onClickOther(e: egret.TouchEvent): void {
            let point = this._view.localToGlobal();
            if (e.stageX < point.x || e.stageX > point.x + this._view.width
                || e.stageY < point.y || e.stageY > point.y + this._view.height) {
                this.hide();
            }
        }
    }
}