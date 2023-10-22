namespace game.mod.more {

    import ItemTapEvent = eui.ItemTapEvent;
    import guild_pk_details = msg.guild_pk_details;

    export class CrossUnionResultMdr extends EffectMdrBase {
        private _view: CrossUnionResultView = this.mark("_view", CrossUnionResultView);
        private _proxy: CrossUnionProxy;
        // private _fight: CrossUnionFightProxy;

        private _listData: eui.ArrayCollection = new eui.ArrayCollection();
        private _tabData: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        } 

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list_type.itemRenderer = BtnTabItem;
            this._view.list_type.dataProvider = this._tabData;

            this._view.list.itemRenderer = CrossUnionResultItem;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTab, this);

            this.onNt(MoreEvent.ON_UPDATE_CROSS_UNION_FIGHT_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateTab();
            this.selectIndex = 0;
            // this.onUpdateView();
        }

        private onUpdateTab(): void {
            let list: BtnTabItemData[] = [
                { name: "一队" },
                { name: "二队" },
                { name: "三队" },
                { name: "四队" }
            ];
            this._tabData.source = list;
        }

        private onUpdateView(): void {
            let info = this._proxy.getFightInfos(this.selectIndex);
            let list: { own: guild_pk_details, target: guild_pk_details }[] = [];
            if (!info || !info.enemy_list && !info.my_list) {
                this._listData.replaceAll(list);
                return;
            }
            info.my_list && info.my_list.sort(this.onSort);
            info.enemy_list && info.enemy_list.sort(this.onSort);

            let len1: number = info.my_list && info.my_list.length || 0;
            let len2: number = info.enemy_list && info.enemy_list.length || 0;
            let len: number = len1 > len2 ? len1 : len2;
            for (let i = 0; i < len; i++) {
                let own = info.my_list[i] || null;
                let target = info.enemy_list[i] || null;
                list.push({ own, target });
            }
            this._listData.replaceAll(list);
        }

        private onClickTab(e: ItemTapEvent): void {
            // this._view.list_type.selectedIndex = e.itemIndex;
            // this.onUpdateView();
            this.selectIndex = e.itemIndex;
        }

        private onSort(a: guild_pk_details, b: guild_pk_details): number {
            if (a.buff_lv != b.buff_lv) {
                return b.buff_lv - a.buff_lv;
            }
            return b.power.toNumber() - a.power.toNumber();
        }

        protected onHide(): void {
            super.onHide();
        }

        private set selectIndex(v: number) {
            if (this._view.list_type.selectedIndex != v) {
                this._view.list_type.selectedIndex = v;
            }
            this._proxy.c2s_guild_pk_fight_show(v + 1);
        }

        private get selectIndex(): number {
            return this._view.list_type.selectedIndex + 1;
        }
    }
}