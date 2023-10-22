namespace game.mod.chat {

    import ArrayCollection = eui.ArrayCollection;
    import Point = egret.Point;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import friend_add_data = msg.friend_add_data;

    export class ChatCheckMdr extends MdrBase {

        private _view: ChatCheckView = this.mark("_view", ChatCheckView);
        private _btnList: ArrayCollection;
        private _proxy: ChatProxy;
        private _friendProxy: IFriendProxy;
        private _isFriend: boolean;
        protected _showArgs: {info: teammate, point: Point};//玩家信息

        constructor() {
            super(Layer.tip);
        }

        protected onInit() {
            super.onInit();

            //按钮列表
            this._btnList = new ArrayCollection();
            this._view.list_btn.dataProvider = this._btnList;
            this._view.list_btn.itemRenderer = BtnTabItem;

            this._proxy = this.retProxy(ProxyType.Chat);
            this._friendProxy = facade.retMod(ModName.Friend).retProxy(ProxyType.Friend);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, Event.CHANGING, this.onClickBtn);
            egret.callLater(() => {
                addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onClickOther);
            }, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initView();
            this.initTypeList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickBtn(e: Event): void {
            let type = this._view.list_btn.selectedIndex + 1;
            switch (type) {
                case ChatCheckType.Check:
                    this.onClickCheck();
                    break;
                case ChatCheckType.Add:
                    this.onClickAdd();
                    break;
                case ChatCheckType.Compete:
                    this.onClickCompete();
                    break;
                case ChatCheckType.Black:
                    this.onClickBlack();
                    break;
            }
            this.hide();
        }

        //判断是否超出界面
        private onClickOther(e: egret.TouchEvent) {
            let viewStagePt: Point = this._view.localToGlobal();
            if (e.stageX < viewStagePt.x || e.stageX > viewStagePt.x + this._view.width || e.stageY < viewStagePt.y ||
                e.stageY > viewStagePt.y + this._view.height) {
                this.hide();
            }
        }

        private initView(): void {
            let point = this._showArgs.point;//全局坐标
            this._view.x = point.x - Layer.tip.x;//减去对应层级的坐标
            this._view.y = point.y - Layer.tip.y;
        }

        private initTypeList(): void {
            let datas: BtnTabItemData[] = [];

            let name = getLanById(LanDef.chat_cue20);
            datas.push({name: name});

            let info = this._showArgs.info;
            this._isFriend = this._friendProxy.isFriend(info.role_id);
            name = this._isFriend ? getLanById(LanDef.chat_cue22) : getLanById(LanDef.chat_cue21);//私聊或添加
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue23);
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue24);
            datas.push({name: name});

            this._btnList.source = datas;
            this._view.list_btn.selectedIndex = -1;
        }

        private onClickCheck(): void {
            //查看
            let info = this._showArgs.info;
            ViewMgr.getIns().showRoleTips(info.role_id, info.server_id, info.is_robot);
        }

        private onClickAdd(): void {
            let info = this._showArgs.info;
            if(this._isFriend){
                //私聊
                ViewMgr.getIns().chat(info.role_id);
            }
            else {
                //添加
                let friendInfo: friend_add_data = new friend_add_data();
                friendInfo.role_id = info.role_id;
                friendInfo.server_id = info.server_id;
                this._friendProxy.c2s_friend_apply([friendInfo]);
            }
        }

        private onClickCompete(): void {
            //战力比拼
            let info = this._showArgs.info;
            this._proxy.c2s_chat_look_user(info.server_id, info.role_id, info.is_robot, ChatLookType.Compete);
        }

        private onClickBlack(): void {
            //拉黑
            let info = this._showArgs.info;
            this._proxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
        }
    }
}
