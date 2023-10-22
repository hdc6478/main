namespace game.mod.shilian {

    import LanDef = game.localization.LanDef;

    /**元灵队伍列表*/
    export class YuanLingTeamListMdr extends MdrBase {
        private _view: YuanLingTeamListView = this.mark("_view", YuanLingTeamListView);
        private _proxy: YuanLingProxy;
        private _listTeam: eui.ArrayCollection;
        private _index = 1;//难度

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list.itemRenderer = YuanLingTeamItem;
            this._view.list.dataProvider = this._listTeam = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_create, egret.TouchEvent.TOUCH_TAP, this.onClickCreate, this);
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_LIST_UPDATE, this.updateView, this);
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_INFO_UPDATE, this.onUpdateJoinTeam, this);
        }

        protected onShow(): void {
            super.onShow();
            this._index = this._showArgs as number;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.yuanling_tips4));
            this._proxy.c2s_yuanling_team_list(this._index);
        }

        private updateView(): void {
            let list = this._proxy.model.team_list;
            if (!list || !list.length) {
                this._view.currentState = 'noteam';
                return;
            }
            this._view.currentState = 'team';
            this._listTeam.replaceAll(list);
        }

        protected onHide(): void {
            super.onHide();
        }

        // 创建队伍
        private onClickCreate(): void {
            this._proxy.c2s_yuanling_create_team(this._index);
        }

        // 收到队伍信息，关闭这个界面，跳到创建队伍界面，抛出事件带有参数2，2表示皮肤创建队伍界面
        private onUpdateJoinTeam(): void {
            this.sendNt(ShilianEvent.ON_YUANLING_JUMP_TO_VIEW, 2);
            this.hide();
        }
    }
}