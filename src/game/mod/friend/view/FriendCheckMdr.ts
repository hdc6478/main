namespace game.mod.friend {

    import ArrayCollection = eui.ArrayCollection;
    import Point = egret.Point;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import LanDef = game.localization.LanDef;
    import friend_info = msg.friend_info;
    import facade = base.facade;
    import Handler = base.Handler;

    export class FriendCheckMdr extends MdrBase {

        private _view: FriendCheckView = this.mark("_view", FriendCheckView);
        private _btnList: ArrayCollection;
        private _proxy: FriendProxy;
        private _chatProxy: IChatProxy;
        protected _showArgs: {info: friend_info, point: Point};//玩家信息

        constructor() {
            super(Layer.tip);
        }

        protected onInit() {
            super.onInit();

            //按钮列表
            this._btnList = new ArrayCollection();
            this._view.list_btn.dataProvider = this._btnList;
            this._view.list_btn.itemRenderer = BtnTabItem;

            this._proxy = this.retProxy(ProxyType.Friend);
            this._chatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
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
                case FriendCheckType.Check:
                    this.onClickCheck();
                    break;
                case FriendCheckType.Chat:
                    this.onClickChat();
                    break;
                case FriendCheckType.Battle:
                    this.onClickBattle();
                    break;
                case FriendCheckType.Compete:
                    this.onClickCompete();
                    break;
                case FriendCheckType.Delete:
                    this.onClickDelete();
                    break;
                case FriendCheckType.Black:
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

            let name = getLanById(LanDef.chat_cue20);//查看
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue22);//私聊
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue25);//切磋
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue23);//战力比拼
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue26);//删除
            datas.push({name: name});

            name = getLanById(LanDef.chat_cue24);//拉黑
            datas.push({name: name});

            this._btnList.source = datas;
            this._view.list_btn.selectedIndex = -1;
        }

        private onClickCheck(): void {
            //查看
            let info = this._showArgs.info;
            //todo，没有机器人
            ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
        }

        private onClickChat(): void {
            let info = this._showArgs.info;
            ViewMgr.getIns().chat(info);
        }

        private onClickBattle(): void {
            //切磋
            let info = this._showArgs.info;
            this._proxy.c2s_friend_pvp_challenge(info.role_id);
        }

        private onClickCompete(): void {
            //战力比拼
            let info = this._showArgs.info;
            //todo，没有机器人
            this._chatProxy.c2s_chat_look_user(info.server_id, info.role_id, 0, ChatLookType.Compete);
        }

        private onClickDelete(): void {
            //删除
            let info = this._showArgs.info;
            ViewMgr.getIns().showConfirm(getLanById(LanDef.friend_tips10), Handler.alloc(this, () => {
                this._proxy.c2s_friend_delete(info.role_id, info.server_id);
            }));
        }

        private onClickBlack(): void {
            //拉黑
            let info = this._showArgs.info;
            //todo，没有机器人
            this._chatProxy.onClickBlack(info.server_id, info.role_id, 0);
        }
    }
}
