namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;

    export class UnionDonateEquipMdr extends MdrBase {
        private _view: UnionDonateEquipView = this.mark("_view", UnionDonateEquipView);
        private _proxy: UnionProxy;
        // private _equip: IEquipProxy;
        private _idxs: Long[] = [];

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);
            // this._equip = getProxy(ModName.Equip, ProxyType.Equip);

            this._view.list_item.itemRenderer = UnionDonateEquipItem;
            this._view.list_item.dataProvider = this._listData;
            this._view.list_item.allowMultipleSelection = true;

            this._view.coinItem.initIcon(PropIndex.GuildScore);
            this._view.coinItem.lab_cost.textColor = BlackColor.GREEN;

            this._view.lab_explain.textFlow = TextUtil.parseHtml(getLanById(LanDef.guild_tips12));
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onClickDonate);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onSelect);
        }

        protected onShow(): void {
            super.onShow();
            this._view.scr.viewport.scrollV = 0;
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let propData = BagUtil.getBagsByType(BagType.RoleEquip) || [];
            let list: PropData[] = [];
            let selects: number[] = [];
            let index: number = 0;
            for (let i in propData) {
                let prop: PropData = propData[i];
                if (prop.propType == EquipPropType.RoleEquip) {
                    if (!prop.cfg.guild_donate) {
                        continue;
                    }
                    // if (prop.quality < 5) {
                    //     selects.push(index++);
                    // }
                    list.push(prop);
                }
            }
            this._listData.replaceAll(list);
            this._view.list_item.selectedIndices = selects;

            this.onUpdateScore();
        }

        private onUpdateScore(): void {
            let count: number = 0;
            this._idxs = [];
            for (let i of this._view.list_item.selectedIndices) {
                let prop: PropData = this._listData.source[i];
                if (prop) {
                    this._idxs.push(prop.prop_id);
                    count += prop.cfg.guild_donate[1];
                }
            }
            this._view.coinItem.lab_cost.text = `${count}`;
            let str: string = TextUtil.addColor(`${this._view.list_item.selectedIndices.length}`, WhiteColor.GREEN);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(`共选择${str}件装备，捐献获得`);
        }

        private onClickDonate(): void {
            if (this._idxs.length > this._proxy.residue_boxs) {
                PromptBox.getIns().show("仓库已满，无法捐献。");
                return;
            }
            this._proxy.c2s_guild_ware_oper(1, this._idxs);
            this.hide();
        }

        private onSelect(): void {
            this.onUpdateScore();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}