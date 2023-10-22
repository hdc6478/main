namespace game.mod.union {

    import GuildDonateConfig = game.config.GuildDonateConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;

    /**宗门捐赠 */
    export class UnionDonateMdr extends EffectMdrBase {
        private _view: UnionDonateView = this.mark("_view", UnionDonateView);
        private _proxy: UnionProxy;

        private _cfg: GuildDonateConfig;

        private _listData1: ArrayCollection = new ArrayCollection();
        private _listData2: ArrayCollection = new ArrayCollection();
        private _listData3: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list_1.itemRenderer = this._view.list_2.itemRenderer = this._view.list_3.itemRenderer = UnionDonateItem;
            this._view.list_1.dataProvider = this._listData1;
            this._view.list_2.dataProvider = this._listData2;
            this._view.list_3.dataProvider = this._listData3;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onDonate, this);

            this.onNt(UnionEvent.ON_UPDATE_UNION_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onInitView();
            this.onUpdateView();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.union_title_3));
            this._view.secondPop.updateBgSrc(ResUtil.getUiJpg("bg_xianzongjuanxian"));

            this.addEftByParentScale(this._view.btn.group_eft);
        }

        private onInitView(): void {
            this._view.btn.label = "";
            this._view.btn.setImage("yijianjuanxian");
        }

        private onUpdateView(): void {
            let model = this._proxy.model;
            let level: number = model.info.level;
            this._cfg = getConfigByNameId(ConfigName.GuildDonate, level);
            this._view.coin_1.updateShow(this._cfg.cost[0]);
            this._view.coin_2.updateShow(this._cfg.cost[1]);
            this._view.coin_3.updateShow(this._cfg.cost[2]);

            // this._listData1.removeAll();
            // this._listData2.removeAll();
            // this._listData3.removeAll();
            // for (let reward of this._cfg.donate_reward) {
            //     if (reward[2] == 1) {
            //         this._listData1.source.push(reward);
            //     } else if (reward[2] == 2) {
            //         this._listData2.source.push(reward);
            //     } else if (reward[2] == 3) {
            //         this._listData3.source.push(reward);
            //     }
            // }
            this._listData1.replaceAll(this._proxy.getDonateReward(this._cfg, 1));
            this._listData2.replaceAll(this._proxy.getDonateReward(this._cfg, 2));
            this._listData3.replaceAll(this._proxy.getDonateReward(this._cfg, 3));

            this._view.btn.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, HintType.UnionDonate]));

            this._view.lab_level.text = `${level}级`;
            this._view.lab_member.textFlow = TextUtil.parseHtml(`成员上限：${TextUtil.addColor(`${this._cfg.num}`, "0x309539")}`);
            this._view.lab_wage.textFlow = TextUtil.parseHtml(`每日俸禄：${TextUtil.addColor(`${level}阶`, "0x309539")}`);

            let next: number = level + 1;
            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, next);
            if (!cfg) {
                this._view.currentState = "max";
                return;
            }

            this._view.lab_level2.text = `${next}级`;
            this._view.lab_member2.textFlow = TextUtil.parseHtml(`成员上限：${TextUtil.addColor(`${cfg.num}`, "0x309539")}`);
            this._view.lab_wage2.textFlow = TextUtil.parseHtml(`每日俸禄：${TextUtil.addColor(`${next}阶`, "0x309539")}`);

            this._view.progress.currentState = "2";
            this._view.progress.show(model.info.exp, cfg.exp);
        }

        private onDonate(): void {
            for (let prop of this._cfg.cost) {
                if (BagUtil.checkPropCnt(prop[0], prop[1])) {
                    this._proxy.c2s_guild_donate();
                    return;
                }
            }
            BagUtil.checkPropCntUp(this._cfg.cost[0][0], this._cfg.cost[0][1]);
            //PromptBox.getIns().show("无道具可捐献");
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}