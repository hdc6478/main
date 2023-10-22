namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class HunkaTypeMdr extends EffectMdrBase{
        private _view: HunkaTypeView = this.mark("_view", HunkaTypeView);
        private _proxy: GoddessRecordProxy;
        private _itemList: HunkaPosItem[] = [];
        private _canOneKey: boolean;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_gongming, TouchEvent.TOUCH_TAP, this.onClickGongming);
            addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClickOneKey);

            this.onNt(GoddessRecordEvent.ON_UPDATE_HUNKA_INFO, this.onInfoUpdate, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.onInfoUpdate();
        }

        protected onHide(): void {
            this.removeTween();
            super.onHide();
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.hunka_rule_tips));
        }

        private onClickGongming(): void {
            let type = this._proxy.hunkaType;
            facade.showView(ModName.More, MoreViewType.HunkaGongming, type);
        }

        private onClickOneKey(): void {
            if(!this._canOneKey){
                PromptBox.getIns().show(getLanById(LanDef.hunka_tips7));
                return;
            }
            let type = this._proxy.hunkaType;
            this._proxy.c2s_chuang_shi_nv_shen_hun_ka_click(HunkaOpType.Wear, type);
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateScore();
            this.updateGongmingHint();
            this.updateOneKeyHint();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(BagType.Hunka) < 0){
                return;
            }
            this.updateItemList();
            this.updateOneKeyHint();
        }


        private initShow(): void {
            this._itemList = [
                this._view.item0,
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5,
                this._view.item6
            ];
            let type = this._proxy.hunkaType;
            this._view.btn_gongming.icon = "hunka_gongming" + type;
        }

        private updateItemList(): void {
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let pos = i + 1;
                item.setData(pos);
            }
        }

        private updateScore(): void {
            let type = this._proxy.hunkaType;
            let totalScore = this._proxy.getHunkaTotalScore(type);
            this._view.item.setData(type, totalScore);
            this._view.hunkaScore.setData(totalScore, HunkaScoreType.Total);
        }

        private updateGongmingHint(): void {
            let type = this._proxy.hunkaType;
            this._view.btn_gongming.redPoint.visible = this._proxy.canHuankaGongmingAct(type);

        }

        private updateOneKeyHint(): void {
            let type = this._proxy.hunkaType;
            this._canOneKey = this._proxy.canHuankaOneKeyWear(type);
            this._view.btn_oneKey.redPoint.visible = this._canOneKey;
        }

        private removeTween(): void {
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                item.removeTween();
            }
        }
    }
}