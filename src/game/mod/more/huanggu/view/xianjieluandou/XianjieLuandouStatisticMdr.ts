namespace game.mod.more {


    export class XianjieLuandouStatisticMdr extends MdrBase {
        private _view: XianjieLuandouStatisticView = this.mark("_view", XianjieLuandouStatisticView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        private _listBtn: eui.ArrayCollection;
        private _rankType = RankCommonType2.Person;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.list_rank.itemRenderer = XianjieLuandouStatisticItem;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
            this.onNt(MoreEvent.ON_XIANJIE_PVP_SCENE_RANK_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.sel_scene_rank = this._rankType = RankCommonType2.Person;
            this.updateListBtn();
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper3, this._rankType);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateListBtn(): void {
            let list: TabBaseItemData[] = [];
            for (let i = 1; i <= 2; i++) {
                list.push({
                    icon: 'xianjieluandou_statistic' + i
                });
            }
            this._listBtn.replaceAll(list);
            this._view.list_btn.selectedIndex = this._rankType - 1;
        }

        // todo
        private updateView(): void {
            this._listData.replaceAll(this._proxy.scene_rank);

            this._view.item.updateMyShow();

            if (this._rankType == RankCommonType2.Guild) {
                this._view.img_type3.visible = this._view.img_type5.visible = false;
                this._view.img_type4.source = 'jifen3';
            } else {
                this._view.img_type3.visible = this._view.img_type5.visible = true;
                this._view.img_type4.source = 'zhugong3';
            }
        }

        private onClickListBtn(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx + 1 == this._rankType) {
                return;
            }
            this._rankType = itemIdx + 1;
            this._proxy.sel_scene_rank = this._rankType;
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper3, this._rankType);
        }
    }
}