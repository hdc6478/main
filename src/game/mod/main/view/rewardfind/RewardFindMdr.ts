namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class RewardFindMdr extends MdrBase {
        private _view: RewardFindView= this.mark("_view", RewardFindView);

        private _itemList: ArrayCollection;
        private _isVip: boolean;
        private _proxy: MainProxy;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = RewardFindItem;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Main);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_find, TouchEvent.TOUCH_TAP, this.onClickFind);
            addEventListener(this._view.btn_vipFind, TouchEvent.TOUCH_TAP, this.onClickVipFind);

            this.onNt(MainEvent.ON_REWARD_FIND_UPDATE, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickFind() {
            this._proxy.c2s_reward_find_draw();
        }

        private onClickVipFind() {
            if(!this._isVip){
                ViewMgr.getIns().openVipView();
                return;
            }
            this._proxy.c2s_reward_find_draw();
        }

        private initShow(): void {
            let tipsStr = getLanById(LanDef.reward_find_tips2);
            this._view.lab_tips.text = tipsStr;

            let cfg1: ParamConfig = GameConfig.getParamConfigById("reward_find_vip");
            let info1: number[] = cfg1.value;
            let limitVip = info1[0];//VIP等级
            let vipFindVal = info1[1];//VIP找回百分比
            let vipLv = VipUtil.getShowVipLv();
            let isVip = vipLv >= limitVip;
            this._isVip = isVip;
            this._view.currentState = isVip ? "vip" : "default";

            this._view.lab_vipFind.text = vipFindVal + "%";//80%
            this._view.btn_vipFind.labelDisplay.text = "VIP" + limitVip + "找回";
            this._view.btn_vipFind.redPoint.visible = true;

            if(!isVip){
                let cfg2: ParamConfig = GameConfig.getParamConfigById("reward_find_free");
                let findVal: number = cfg2.value;
                this._view.lab_find.text = findVal + "%";//50%
                this._view.btn_find.redPoint.visible = true;
            }
        }

        private updateItemList(): void {
            let infos = this._proxy.findInfos;
            this._itemList.source = infos;
        }

    }
}