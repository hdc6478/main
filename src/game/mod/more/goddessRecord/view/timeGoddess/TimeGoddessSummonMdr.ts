namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import NvshenChoujiangConfig = game.config.NvshenChoujiangConfig;

    export class TimeGoddessSummonMdr extends EffectMdrBase {
        private _view: TimeGoddessSummonView = this.mark("_view", TimeGoddessSummonView);
        private _proxy: GoddessRecordProxy;
        private _itemList: TimeGoddessSummonItem[] = [];
        private _selIndex: number;/**当前选中的下标*/
        private _selCfg: NvshenChoujiangConfig;/**当前选中的配置*/

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_exp, TouchEvent.TOUCH_TAP, this.onClickExp);
            addEventListener(this._view.btn_summon, TouchEvent.TOUCH_TAP, this.onClickSummon);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);

            // this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateAct();
            this.updateItemList();
            this.indexUpdateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickExp(): void {
            ViewMgr.getIns().showPropTips(PropIndex.Chuangshinengliang);
        }

        private onClickSummon(): void {
            let isOpen = this._proxy.isOpenSummon();
            if (!isOpen) {
                PromptBox.getIns().show(getLanById(LanDef.time_nvshen_tips2));
                return;
            }
            if (!this._selCfg) {
                return;
            }
            let val = this._selCfg.costs[0][1];
            if (!BagUtil.checkPropCntUp(PropIndex.Chuangshinengliang, val)) {
                return;
            }
            let pos = this._selIndex + 1;
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.Summon, pos);
        }

        private onClickReward(): void {
            let rewards = this._proxy.getSummonRewards();
            ViewMgr.getIns().openPreviewReward(rewards);
        }

        // private onRoleUpdate(n: base.GameNT): void {
        //     let keys: string[] = n.body;
        //     if (keys.indexOf(RolePropertyKey.cs_nvshen_nengliang) >= 0) {
        //         this.updateItemList();
        //         this.updateExp();
        //     }
        // }

        private onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            const prop_index: number = 1450100174;
            if (indexs.indexOf(prop_index) > -1) {
                this.updateItemList();
                this.updateExp();
            }
        }

        private onClickIcon(e: TouchEvent): void {
            let img = e.target;
            for (let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                if (item.img_icon != img) {
                    continue;
                }
                if (this._selIndex == i) {
                    return;
                }
                this._selIndex = i;
                this.indexUpdateInfo();
                break;
            }
        }

        private initShow(): void {
            this.addEftByParent(UIEftSrc.Nvshentexiao, this._view.grp_eft);

            let addEventListener = this.onEgret.bind(this);
            this._itemList = [
                this._view.item0,
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4
            ];
            for (let item of this._itemList) {
                addEventListener(item, TouchEvent.TOUCH_TAP, this.onClickIcon);
            }
            this._selIndex = 0;
        }

        private updateAct(): void {
            let isOpen = this._proxy.isOpenSummon();
            let actStr = isOpen ? "" : getLanById(LanDef.time_nvshen_tips3);
            this._view.lab_act.text = actStr;
        }

        private updateItemList(): void {
            let cfgList: NvshenChoujiangConfig[] = getConfigListByName(ConfigName.NvshenChoujiang);
            for (let i = 0; i < this._itemList.length && i < cfgList.length; ++i) {
                let item = this._itemList[i];
                let data = cfgList[i];
                item.data = data;
            }
        }

        private indexUpdateInfo(): void {
            let cfgList: NvshenChoujiangConfig[] = getConfigListByName(ConfigName.NvshenChoujiang);
            this._selCfg = cfgList[this._selIndex];
            if (!this._selCfg) {
                return;
            }
            this.updateItemSel();
            this.updateExp();
        }

        private updateItemSel(): void {
            for (let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                let sel = this._selIndex == i;
                item.img_sel.visible = sel;
            }
        }

        private updateExp(): void {
            let val = this._selCfg.costs[0][1];
            this._view.btn_exp.updateShow(val);
            this._view.img_type.source = "nvshen_choujiang_" + this._selCfg.index;
        }


    }
}