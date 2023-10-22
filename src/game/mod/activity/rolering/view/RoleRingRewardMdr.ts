namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import YaodiRandomConfig = game.config.YaodiRandomConfig;
    import YaodiConfig = game.config.YaodiConfig;
    import LanDef = game.localization.LanDef;

    export class RoleRingRewardMdr extends MdrBase {
        private _view: BasePreviewRewardView = this.mark("_view", BasePreviewRewardView);
        private _itemList: ArrayCollection;
        private _proxy: RoleRingProxy;
        protected _showArgs: number;//RoleRingType

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = RoleRingRewardItem;
            this._view.list_item.dataProvider = this._itemList;
            this._proxy = this.retProxy(ProxyType.RoleRing);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let type = this._showArgs;
            let cfgName = type == RoleRingType.Type2 ? ConfigName.YaodiRandom : ConfigName.YaoshenRandom;
            let cfgList: YaodiRandomConfig[] = getConfigListByName(cfgName);

            let yaodiCfgName = type == RoleRingType.Type2 ? ConfigName.Yaodi : ConfigName.Yaoshen;
            let yaodiCfgList: YaodiConfig[] = getConfigListByName(yaodiCfgName);
            let award: number[][] = [];
            for(let i of yaodiCfgList){
                award.push(i.reward);
            }

            let cfg: YaodiRandomConfig = {
                index: 0,
                weight: cfgList[0].weight,//显示假的概率
                award: award,
                name: getLanById(LanDef.role_ring_tips9)
            };
            let items: YaodiRandomConfig[] = [cfg].concat(cfgList);
            if(this._itemList.source.length){
                this._itemList.replaceAll(items);
            }
            else {
                this._itemList.source = items;
            }
        }
    }
}