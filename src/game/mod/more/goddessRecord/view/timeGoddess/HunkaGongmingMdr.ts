namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class HunkaGongmingMdr extends MdrBase{
        private _view: HunkaGongmingView = this.mark("_view", HunkaGongmingView);
        private _proxy: GoddessRecordProxy;
        private _itemList: ArrayCollection;
        protected _showArgs: number;//魂卡类型
        private _type: number;//魂卡类型
        private _canAct: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = HunkaGongmingItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._type = this._showArgs;
            this.initShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAct(): void {
            let type = this._type;
            if(!this._canAct){
                PromptBox.getIns().show(getLanById(LanDef.hunka_tips5));
                return;
            }
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Act, type);
        }

        private initShow(): void {
            let type = this._type;
            this._view.baseQualityTips.updateShow(QualityType.RED);
            this._view.img_icon.source = "hunka_gongming" + type;
            let nameStr = "hunka_tips" + type;
            this._view.lab_name.text = getLanById(nameStr);
            this._view.baseNameItem.setTitle(getLanById(LanDef.sp_tips1));
        }

        private updateView(): void {
            let type = this._type;
            let infos = this._proxy.getHunkaScoreCfgList(type);
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }

            let totalScore = this._proxy.getHunkaTotalScore(type);
            this._view.item.setData(type, totalScore);

            let isMax = this._proxy.isHunkaMaxLv(type);
            this._view.currentState = isMax ? "max" : "default";
            if(!isMax){
                let lv = this._proxy.getHunkaLv(type);
                let needScore = this._proxy.getHunkaNeedScore(type, lv);
                let leftScore = needScore - totalScore;//所需积分-当前总积分
                let canAct = leftScore <= 0;
                this._canAct = canAct;
                this._view.btn_act.redPoint.visible = canAct;
                let tipsStr = "";
                if(!canAct){
                    let scoreStr = leftScore + "";
                    let nextLv = lv + 1;
                    let lvStr = getLanById("hunka_score" + nextLv);
                    tipsStr = StringUtil.substitute(getLanById(LanDef.hunka_tips6), [scoreStr, lvStr]);
                }
                this._view.lab_tips.text = tipsStr;
            }
        }
    }
}