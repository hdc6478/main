namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class XiandiListMdr extends EffectMdrBase {
        private _view: XiandiListView = this.mark("_view", XiandiListView);

        private _proxy: XiandiProxy;
        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);

            this._view.list.itemRenderer = XiandiListItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            RankUtil.c2s_rank_req_rank(RankType.Zhanli);
            super.onShow();
            // this.onUpdateView();
            this._proxy.king_index = this._showArgs;
        }

        private onUpdateView(): void {
            let s2c = RankUtil.getNewRankInfo(RankType.Zhanli);
            // this._listData.replaceAll(s2c.info_list.filter(v => {
            //     if (v.base_info) {
            //         return !this._proxy.checkJob(v.base_info.role_id) || !v.base_info.role_id.eq(RoleVo.ins.role_id);
            //     }
            //     return false;
            // }));
            let list = s2c.info_list;
            let lists: msg.rank_info[] = [];
            for (let info of list) {
                let base = info.base_info;
                if (RoleVo.ins.role_id.eq(base.role_id)) {
                    continue;
                }
                if (base && !this._proxy.checkJob(base.role_id)) {
                    lists.push(info);
                }
            }
            this._listData.replaceAll(lists);
        }

        protected onHide(): void {
            this._proxy.king_index = 0;
            super.onHide();
        }
    }
}