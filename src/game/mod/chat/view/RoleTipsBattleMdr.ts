namespace game.mod.chat {

    import ArrayCollection = eui.ArrayCollection;
    import ride_info = msg.ride_info;
    import ItemTapEvent = eui.ItemTapEvent;
    import facade = base.facade;

    export class RoleTipsBattleMdr extends EffectMdrBase {
        private _view: RoleTipsBattleView= this.mark("_view", RoleTipsBattleView);
        private _proxy: ChatProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Chat);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = RoleTipsBattleRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
        }

        protected onShow(): void {
            super.onShow();

            this.updateModel();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickItem(e: ItemTapEvent): void {
            let data: ride_info = e.item;
            if(!data){
                return;
            }
            let index = data.cur_ride;
            if(!index){
                return;
            }
            facade.showView(ModName.Chat, ChatViewType.RoleSurfaceTips, {index: index, info: this._proxy.lookInfo});
        }

        /**------------------------模型-----------------------------*/
        private updateModel(): void {
            let info = this._proxy.lookInfo && this._proxy.lookInfo.check_role;
            if(!info){
                return;
            }
            this.updateRankUIRole(this._view.gr_eft, info);
            let index = info.title_index && info.title_index.toNumber() || 0;
            if(index){
                this.addEftByParent(ResUtil.getTitleSrc(index), this._view.gr_eft, 0, -480);
            }
        }
        /**------------------------外显-----------------------------*/
        private updateItemList(): void {
            let datas: ride_info[] = [];
            let infos = this._proxy.lookInfo && this._proxy.lookInfo.sp_skill_info || [];
            for (let info of infos) {
                let headType = info.head_type;
                if (headType == ConfigHead.Tianshen || headType == ConfigHead.Huashen) {
                    continue;//过滤元灵，元灵没有幻化，化神也不显示
                }
                datas.push(info);
            }
            // datas.push(null);//格子需要预留至少两个
            // datas.push(null);
            this._itemList.source = datas;
        }
    }
}