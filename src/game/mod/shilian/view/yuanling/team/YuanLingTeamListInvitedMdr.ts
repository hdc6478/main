namespace game.mod.shilian {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import s2c_yuanling_invita = msg.s2c_yuanling_invita;

    /**被邀请列表*/
    export class YuanLingTeamListInvitedMdr extends MdrBase {
        private _view: YuanLingTeamListView = this.mark("_view", YuanLingTeamListView);
        private _proxy: YuanLingProxy;
        private _listData: eui.ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.YuanlingFuben);
            this._view.list.itemRenderer = YuanLingTeamItem2;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_INVITE, this.updateView, this);
            this.onNt(ShilianEvent.ON_YUANLING_INVITE_LIST_ITEM_DELETE, this.onDeleteListItem, this);
            this.onNt(ShilianEvent.ON_YUANLING_TEAM_INFO_UPDATE, this.onUpdateJoinTeam, this);
        }

        protected onShow(): void {
            super.onShow();

            //避免打开界面时候，队伍信息都移除了，导致界面数据为null
            let list = this._proxy.getInvitedTeamList();
            if (!list || !list.length) {
                this.hide();
                return;
            }

            this._view.currentState = 'invite';
            this._view.secondPop.updateTitleStr(getLanById(LanDef.yuanling_tips3));
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            //处理下主界面邀请按钮，移除队伍信息无队伍后，隐藏主界面按钮
            this.sendNt(ShilianEvent.ON_YUANLING_TEAM_INVITE_BTN);
        }

        private updateView(): void {
            let list = this._proxy.getInvitedTeamList();
            this._listData.replaceAll(list);
        }

        // 移除 _listData 数据项
        private onDeleteListItem(n: GameNT): void {
            let data = n.body as s2c_yuanling_invita;
            if (!data) {
                return;
            }
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let item = this._listData.source[i];
                if (item == data) {
                    this._listData.removeItemAt(i);
                    break;
                }
            }
            this._proxy.clearInvitedTeam(data.team_id);
        }

        private onUpdateJoinTeam(n: GameNT): void {
            let state = n.body as number[];
            this._proxy.inviteParam = state;
            ViewMgr.getIns().showView(ModName.Shilian, ShilianViewType.ShilianMain, ShilianMainBtnType.YuanLing);
        }
    }
}