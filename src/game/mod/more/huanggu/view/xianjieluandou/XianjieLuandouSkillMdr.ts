namespace game.mod.more {

    import GameNT = base.GameNT;

    export class XianjieLuandouSkillMdr extends MdrBase {
        private _view: KuafuDoufaSkillView = this.mark("_view", KuafuDoufaSkillView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        private _costIndex: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);

            this._view.list_reward.itemRenderer = XianjieLuandouSkillItem;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
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

        private updateItemList(): void {
            let skillList = this._proxy.skill_list;
            this._listData.replaceAll(skillList);
        }

        private updateCost(): void {
            let skillList = this._proxy.skill_list;
            this._costIndex = skillList[0][3];
            this._view.cost.setData(this._costIndex);
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let index = this._costIndex;
            if (index && indexs.indexOf(index) > -1) {
                this.updateCost();
            }
        }

    }
}