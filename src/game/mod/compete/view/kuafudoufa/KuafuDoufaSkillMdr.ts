namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    import GameNT = base.GameNT;

    export class KuafuDoufaSkillMdr extends MdrBase {

        private _view: KuafuDoufaSkillView = this.mark("_view", KuafuDoufaSkillView);
        private _proxy: CompeteProxy;

        private _costIndex: number;
        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = KuafuDoufaSkillItem;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
            this.updateCost();
        }

        protected onHide(): void {
            super.onHide();
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._costIndex;
            if(index && indexs.indexOf(index) > -1){
                this.updateCost();
            }
        }
        
        private updateItemList(): void {
            let items: DoufaJinengConfig[] = getConfigListByName(ConfigName.DoufaJineng);
            if(this._itemList.source.length){
                this._itemList.replaceAll(items);
            }
            else {
                this._itemList.source = items;
            }
        }

        private updateCost(): void {
            let items: DoufaJinengConfig[] = getConfigListByName(ConfigName.DoufaJineng);
            let cost = items[0].cost;
            this._costIndex = cost[0];
            this._view.cost.setData(this._costIndex);
        }
    }
}
