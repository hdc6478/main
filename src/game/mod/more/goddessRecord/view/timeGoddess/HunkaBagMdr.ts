namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;

    export class HunkaBagMdr extends MdrBase {
        private _view: HunkaBagView = this.mark("_view", HunkaBagView);
        private _proxy: GoddessRecordProxy;
        private _itemList: ArrayCollection;

        /**部位穿戴时候打开，会提示战力升降，传魂卡类型进来
         * 合成时候也会打开，不传类型*/
        protected _showArgs: number;//魂卡类型，不传表示取全部

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = HunkaBagIcon;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_SELECT, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateItemList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateItemList(): void {
            let infos: PropData[];
            let openType = this._proxy.hunkaBagOpenType;
            if (openType == HunkaBagOpenType.Wear) {
                //穿戴
                let type = this._showArgs;
                infos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type, true);
            }
            else if (openType == HunkaBagOpenType.Compose) {
                //合成
                let selNum = this._proxy.getComposeSelNum();
                if (selNum <= 0) {
                    //未选中时候，显示全部魂卡
                    infos = BagUtil.getBagsByType(BagType.Hunka, true);
                }
                else {
                    let tmpInfos: PropData[];
                    let composeList = this._proxy.composeList;
                    let selPos = this._proxy.hunkaComposeSelPos;
                    let selProp = composeList[selPos];
                    if (selNum == 1 && selProp) {
                        //如果选中一个，且重新打开时候，需要显示除了已选中的其他魂卡
                        tmpInfos = BagUtil.getBagsByType(BagType.Hunka, true);
                        infos = tmpInfos.filter(v => {
                            return v.prop_id.neq(selProp.prop_id);
                        });
                    }
                    else {
                        //过滤可合成的魂卡，同一类型的魂卡可以合成
                        let composeProp = this._proxy.getComposeSel();//当前要合成的魂卡
                        let type = composeProp.propSubType;
                        tmpInfos = BagUtil.getBagsByTypeAndPropSubType(BagType.Hunka, type, true);
                        infos = tmpInfos.filter(v => {
                            let hasR: boolean = false;
                            for (let k in composeList) {
                                if (composeList[k].prop_id.eq(v.prop_id)) {
                                    hasR = true;
                                    break;
                                }
                            }
                            return !hasR;
                        });
                    }
                }
            }
            if (this._itemList.source.length) {
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
            let isShow = infos.length <= 0;
            this._view.hunkaNone.visible = isShow;
            if (isShow) {
                this._view.hunkaNone.updateHunkaNoneView(Handler.alloc(this, this.hide));
            }
        }
    }
}