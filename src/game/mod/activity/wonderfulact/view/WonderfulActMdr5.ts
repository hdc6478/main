namespace game.mod.activity {


    export class WonderfulActMdr5 extends WonderfulActMdr4 {
        protected _type = ActivityType.Loginrewards;

        protected onInit(): void {
            super.onInit();
            this._view.gr_bigreward.visible = false;
            this._view.list.itemRenderer = WonderfulActItem5;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_banner.source = ResUtil.getUiJpg('denglujiangli');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.offNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_ADDCHARGE);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_LOGIN, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateView() {
            let actData = this._proxy.getActDataByType(this._type);
            if (!actData) {
                return;
            }
            let rst: IWonderfulActItemData[] = [];
            let reward_list = actData.reward_list || [];
            for (let item of reward_list) {
                let statusItem = this._proxy.model.list_login[item.index];
                let itemData: IWonderfulActItemData = {
                    type: this._type,
                    info: item,
                    status: statusItem && statusItem.status || 0,
                    val: item.index == 2 ? VipUtil.getShowVipLv() : this._proxy.model.num_login
                };
                rst.push(itemData);
            }
            SortTools.sortReward(rst);
            this._listData.replaceAll(rst);
        }
    }
}