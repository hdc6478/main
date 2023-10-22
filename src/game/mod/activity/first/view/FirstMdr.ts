namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ShouchongConfig = game.config.ShouchongConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import GameNT = base.GameNT;
    import ParamConfig = game.config.ParamConfig;

    export class FirstMdr extends EffectMdrBase {
        private _view: FirstView = this.mark("_view", FirstView);
        private _proxy: FirstProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _tabData: ArrayCollection = new ArrayCollection();

        /**当前页签是否达到充值额度 */
        private _bool: boolean = false;
        /**达标时间到当天时间达到可领取天数 */
        private _ontime: boolean = false;
        // /**用于获取活动配置 */
        // private _type: number;
        /**当前选项获取的配置 */
        private _cfg: ShouchongConfig;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.First);

            //改为统一按钮了。
            //this._view.btn.img_bg.source = "first_chongzhi";

            this._view.list.itemRenderer = FirstItem;
            this._view.list.dataProvider = this._listData;

            this._view.list_type.itemRenderer = BtnTabItem;
            this._view.list_type.dataProvider = this._tabData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTab, this);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);

            this.onNt(ActivityEvent.ON_UPDATE_FIRST_RECHARGE_INFO, this.onUpdateTab, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            if (this._proxy.cache_times) {
                this._proxy.cache_times = false;
            }
            this.onInitTabSelect();
            this.sendNt(ActivityEvent.ON_ACTIVITY_ICON_TIPS_HIDE);
            this.addEftByParentScale(this._view.btn.group_eft);
        }

        //更新模型
        private updateAnimate(index:number):void{
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "shouchong_show_model");
            this._view.grp_eff.removeChildren();
            this.addAnimate(cfg.value[index] || cfg.value[0], this._view.grp_eff);
            this._view.grp_eff.scaleX = this._view.grp_eff.scaleY = 1.2;
        }

        private onInitTabSelect(): void {
            let list: BtnTabItemData[] = [
                {
                    name: "任意金额",
                    showHint: HintMgr.getHint(this._proxy.getHintType(FirstRechargeType.Type1)),
                },
                {
                    name: "30元累充",
                    showHint: HintMgr.getHint(this._proxy.getHintType(FirstRechargeType.Type2))
                },
                {
                    name: "98元累充",
                    showHint: HintMgr.getHint(this._proxy.getHintType(FirstRechargeType.Type3))
                },
                {
                    name: "198元累充",
                    showHint: HintMgr.getHint(this._proxy.getHintType(FirstRechargeType.Type4))
                }
            ];
            this._tabData.source = list;
            this.onUpdateTab();
        }

        private onUpdateTab(): void {
            let index: number = this._proxy.getIndex(this._proxy.type || 0);
            this._view.list_type.selectedIndex = index;
            this._proxy.type = this._view.list_type.selectedIndex + 1;
            this.updateAnimate(index);
            this._view.img_bg.source = ResUtil.getUiPng(`first_bg${index+1}`);

            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._cfg = this._proxy.getCfgByType(this._proxy.type);
            if (!this._cfg) {
                console.error("缺少配置");
                return;
            }
            let str: string = TextUtil.addColor(`${this._proxy.model.charged}/${this._cfg.cost}`, WhiteColor.GREEN);
            this._view.lab_price.textFlow = TextUtil.parseHtml(`当前累计充值${str}元`);
            this._bool = this._proxy.model.charged >= this._cfg.cost;
            /**已领取天数 领取需要+1 */
            let day: number = this._proxy.getDayByType(this._proxy.type);
            this._ontime = this._proxy.getRewardDay(this._cfg.index) > day;

            let list: IFirstItemData[] = [];
            for (let day = 1; day <= 3; day++) {
                let rewards: number[][] = this._cfg[`day${day}`];
                list.push({rewards, day});
            }
            this._listData.source = list;

            if (this._bool && day >= 3) {
                this._view.img_got.visible = true;
                this._view.btn.visible = false;
            } else {
                this._view.btn.visible = true;
                this._view.img_got.visible = false;
                this._view.btn.setImage(!this._bool ? "common_recharge" : "common_get");
            }
            this._view.btn.setHint(this._bool && this._ontime)
        }

        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: BtnTabItemData[] = this._tabData.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let hintType = this._proxy.getHintType(i + 1);
                let type = HintMgr.getType(hintType);
                if (type != data.node) {
                    continue;
                }
                if (!!btnData.showHint != data.value) {//过滤undefined!=false
                    btnData.showHint = data.value;
                    this._tabData.itemUpdated(btnData);
                }
                break;
            }
        }

        private onClickTab(e: ItemTapEvent): void {
            this._view.list_type.selectedIndex = e.itemIndex;
            this._proxy.type = this._view.list_type.selectedIndex + 1;

            this.updateAnimate(this._view.list_type.selectedIndex);
            this._view.img_bg.source = ResUtil.getUiPng(`first_bg${this._view.list_type.selectedIndex+1}`);

            this.onUpdateView();
        }

        private onClickBtn(): void {
            if (this._bool && !this._ontime) {
                PromptBox.getIns().show("请明日再来领取");
                return;
            }
            if (this._bool && this._ontime) {
                /**已领取天数 领取需要+1 */
                let day: number = this._proxy.getDayByType(this._proxy.type);
                this._proxy.c2s_super_first_charge_reward(this._cfg.index, day + 1);
                return;
            }
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02);
            this.hide();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}