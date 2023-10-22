namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    export class FirstItem extends BaseRenderer {

        public data: IFirstItemData;
        private _proxy: FirstProxy;

        private list: eui.List;
        private img_day: eui.Image;

        private _listData: ArrayCollection = new ArrayCollection();

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.First);
            this.list.itemRenderer = IconReward;
            this.list.dataProvider = this._listData;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_day.source = `first_${data.day}`;

            let isGot: boolean = this._proxy.getDayByType(this._proxy.type) >= data.day;
            let list: IconRewardData[] = [];
            for (let reward of data.rewards) {
                list.push({prop: reward, isGot});
            }
            this._listData.source = list;
        }

    }
}
