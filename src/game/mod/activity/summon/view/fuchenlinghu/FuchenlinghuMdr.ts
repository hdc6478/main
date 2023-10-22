namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import LinghuQualityConfig = game.config.LinghuQualityConfig;
    import PropConfig = game.config.PropConfig;
    import GameNT = base.GameNT;

    /**浮尘灵壶*/
    export class FuchenlinghuMdr extends MdrBase {
        private _view: FuchenlinghuView = this.mark("_view", FuchenlinghuView);
        private _proxy: FuchenlinghuProxy;
        private _seaType: SeaType;
        private _isHundred = false;//是否是百连召唤

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_xianling, egret.TouchEvent.TOUCH_TAP, this.onClickBtnXianling, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRule, this);
            addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickBtnReward, this);
            addEventListener(this._view.btn1, egret.TouchEvent.TOUCH_TAP, this.onClickBtn1, this);
            addEventListener(this._view.btn10, egret.TouchEvent.TOUCH_TAP, this.onClickBtn10, this);
            addEventListener(this._view.btn_refresh, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRefresh, this);
            addEventListener(this._view.btn_refresh1, egret.TouchEvent.TOUCH_TAP, this.onClickChange, this);
            addEventListener(this._view.img_gain, egret.TouchEvent.TOUCH_TAP, this.onClickGain, this);
            addEventListener(this._view.checkBox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckbox, this);
            addEventListener(this._view.avatarBaseItem, egret.TouchEvent.TOUCH_TAP, this.onClickAvatarBaseItem, this);
            this.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
        }

        protected onShow(): void {
            super.onShow();
            this._isHundred = this._proxy.isHundred;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            if (this._seaType != this._proxy.type) {
                this._seaType = this._proxy.type;
                this._view.btn_refresh1.img.source = 'fuchenlinghu_seaname' + this._seaType;
            }

            this.updateIcon();
            this.updateCost();
            this._view.checkBox.visible = this._proxy.isShowHundredCheckBox(this._seaType);
            this.updateXianlingHint();
        }

        private updateIcon(): void {
            let props = this._proxy.getShowProps(this._seaType);
            for (let i = 0; i < props.length; i++) {
                let icon = this._view[`icon${i}`];
                if (!icon) {
                    continue;
                }
                icon.data = props[i];
            }

            let guaranteeCnt = this._proxy.getGuaranteeCnt();//保底次数
            let zhaohuanCnt = this._proxy.getZhaohuanCnt(this._seaType);
            let leftCnt = Math.max(guaranteeCnt - zhaohuanCnt, 0);
            this._view.lb_num.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips6), [leftCnt]));

            let upIndex = this._proxy.getUpIndex(this._seaType);
            this._view.btn_refresh.visible = !!upIndex;
            if (!upIndex) {
                this._view.avatarBaseItem.img_avatar.source = `xianjianjiahao`;
            } else {
                let propCfg: PropConfig = getConfigById(upIndex);
                if (propCfg && propCfg.param1 && propCfg.param1[0]) {
                    let cfg = getConfigById(propCfg.param1[0][0]);
                    this._view.avatarBaseItem.updateShow(cfg);
                }
            }
        }

        private updateCost(): void {
            let costOne = this._proxy.getCost(CommonCountType.Once);
            this._view.cost1.updateShow(costOne);
            this._view.btn1.setHint(this._proxy.canZhaohuan(this._seaType, CommonCountType.Once));

            let countType = this._isHundred ? CommonCountType.Hund : CommonCountType.Ten;
            let costTen = this._proxy.getCost(countType);
            this._view.cost10.updateShow(costTen);
            this._view.btn10.label = this._isHundred ? '百连召唤' : '十连召唤';
            this._view.btn10.setHint(this._proxy.canZhaohuan(this._seaType, countType));

            this._view.checkBox.currentState = this._isHundred ? "upAndSelected" : "disabled";
        }

        private onClickCheckbox(): void {
            this._isHundred = !this._isHundred;
            this._proxy.isHundred = this._isHundred;
            this.updateCost();
        }

        //点击up道具
        private onClickAvatarBaseItem(): void {
            let upIndex = this._proxy.getUpIndex(this._seaType);
            if (!upIndex) {
                this.onClickBtnRefresh();
            } else {
                ViewMgr.getIns().showPropTips(upIndex);
            }
        }

        private onClickBtnXianling(): void {
            facade.showView(ModName.Activity, MainActivityViewType.FuchenlinghuXianling, this._seaType);
        }

        private onClickBtnRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.fuchenlinghu_tips9));
        }

        private onClickBtnReward(): void {
            let cfgObj: { [index: number]: LinghuQualityConfig } = getConfigByNameId(ConfigName.LinghuQuality, this._seaType);
            let list: BasePreviewRewardData[] = [];
            let highQualityList: BasePreviewRewardData[] = [];
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                let itemData = {
                    weight: cfg.weight,
                    award: cfg.award,
                    nameStr: "rolering_reward_type" + cfg.quality
                };
                if (cfg.quality > 5) {
                    highQualityList.unshift(itemData);//6是绿卡，需排在前面
                } else {
                    list.push(itemData);//其他品质未按照默认QualityType品质处理
                }
            }
            ViewMgr.getIns().openPreviewReward(highQualityList.concat(list));
        }

        private onClickBtnRefresh(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FuchenlinghuWish, this._seaType);
        }

        private onClickChange(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FuchenlinghuRefresh, this._seaType);
        }

        private onClickBtn1(): void {
            if (this._proxy.canZhaohuan(this._seaType, CommonCountType.Once, true)) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper1, 1);
            }
        }

        private onClickBtn10(): void {
            let countType = this._isHundred ? CommonCountType.Hund : CommonCountType.Ten;
            if (this._proxy.canZhaohuan(this._seaType, countType, true)) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper1, this._isHundred ? 3 : 2);
            }
        }

        private onClickGain(): void {
            let cost = this._proxy.getCost(CommonCountType.Once);
            if (cost && cost[0]) {
                ViewMgr.getIns().showGainWaysTips(cost[0]);
            }
        }

        private updateXianlingHint(): void {
            this._view.btn_xianling.setHint(this._proxy.canXianlingAllType());
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            let cost = this._proxy.getCost(CommonCountType.Once);
            if (cost && indexs.indexOf(cost[0]) > -1) {
                this.updateCost();
            }
            let costSpe = this._proxy.getCostSpecial();
            if (costSpe && indexs.indexOf(costSpe[0]) > -1) {
                this.updateXianlingHint();
            }
        }
    }
}