namespace game.mod.more {

    import GameNT = base.GameNT;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class HuanjingCollectMdr extends EffectMdrBase {
        private _view: HuanjingCollectView = this.mark("_view", HuanjingCollectView);
        private _proxy: HuanjingProxy;
        private _systemId: number;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
            this._view.list.itemRenderer = HuanjingCollectItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn0.setHintStyle(5, 5);
            this._view.btn1.setHintStyle(5, 5);
            this._view.btn2.setHintStyle(5, 5);
            this._view.btn3.setHintStyle(5, 5);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn0, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.btn1, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.btn2, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.btn3, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);

            this.onNt(ShenLingEvent.ON_SHEN_LING_UPDATE_INFO, this.updateView, this);
            this.onNt(ShenLingEvent.ON_SHEN_LING_REWARD_UPDATE, this.updateView, this);
            this.onNt(SurfaceEvent.SURFACE_INFO_UPDATE, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE, this.onBagUpdateByPropTypeAndSubType, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this._systemId = this.decodeShowArgs();
            if (!this._systemId) {
                return;
            }
            this._view.btn0.icon = `huanjing_btn` + this._systemId;
            this._view.img_name.source = `huanjing_img_name` + this._systemId;
            this._view.img_title.source = `huanjing_list_lb` + this._systemId;
            this._view.skillItem.visible = this._systemId == 1;
            if (this._view.skillItem.visible) {
                let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
                let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, cfg.stage_skill);
                this._view.skillItem.setIcon(skillCfg && skillCfg.icon || '');
                let strAttr = this._proxy.getAttr(this._systemId);
                this.addBmpFont(strAttr / 10000 + "" + "%", BmpTextCfg[BmpTextType.HuanJingFont], this._view.gr_font);
            }

            this.updateView();
            this.updateBtnHint();
        }

        protected onHide(): void {
            super.onHide();
            this._systemId = null;
        }

        private updateView(): void {
            let cfg = this._proxy.getHuanjingParamCfg(this._systemId);
            this._view.lb_name.text = cfg.name;
            this._listData.replaceAll(cfg.outlook || []);
        }

        private onClickBtn(e: egret.TouchEvent): void {
            let target = e.currentTarget;
            switch (target) {
                case this._view.btn0:
                    //养成界面
                    this._proxy.canOpenGrow(this._systemId, true);
                    break;
                case this._view.btn1:
                    //浮尘灵壶
                    let linghuProxy: IFuchenlinghuProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Fuchenlinghu);
                    if (linghuProxy.isOpenSea(SeaType.Sea1, true)) {
                        ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu);
                    }
                    break;
                case this._view.btn2:
                    //幻境榜
                    if (ViewMgr.getIns().checkViewOpen(OpenIdx.Sea, true)) {
                        let seaProxy: ISeaProxy = getProxy(ModName.Yijie, ProxyType.Sea);
                        if (seaProxy.canOpenRank()) {
                            //对应的排行榜开启就打开，否则默认仙界之海的排行榜 策划需求
                            ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaRankMain, "0" + this._systemId);
                        } else {
                            PromptBox.getIns().show(getLanById(LanDef.huanjing_tips12));
                        }
                    }
                    break;
                case this._view.btn3:
                    //幻境之海
                    if (ViewMgr.getIns().checkViewOpen(OpenIdx.Sea, true)) {
                        ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.YijieMain, YijieMainBtnType.Sea);
                    }
                    break;
            }
        }

        // todo
        private updateBtnHint(): void {
            this._view.btn0.setHint(HintMgr.getHint(this._proxy.getGrowHintPath(this._systemId)));
            this._view.btn1.setHint(this._proxy.getFuchenlinghuHint());
            this._view.btn2.setHint(this._proxy.getSeaRankHint());
            this._view.btn3.setHint(this._proxy.getSeaMainHint());
        }

        // todo
        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            // 收集界面外显红点
            if (data.node == HintMgr.getType(this._proxy.collectHintPath)) {
                this.updateView();
            }
            // 养成界面红点
            if (data.node == HintMgr.getType(this._proxy.growHintPath)) {
                // this.updateBtnHint();
                this._view.btn0.setHint(data.value);
            }
            //浮尘灵壶红点
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu])) {
                this._view.btn1.setHint(data.value);
            }
            //幻境之海红点
            if (data.node == HintMgr.getType([ModName.Yijie, YijieViewType.YijieMain + YijieMainBtnType.Sea])) {
                this._view.btn3.setHint(data.value);
            }
        }

        protected onBagUpdateByPropTypeAndSubType(n: GameNT) {
            let list: { [type: number]: number[] } = n.body;
            //5种，神灵，坐骑，羽翼，神兵，时装
            let subTypes = [PropSubType11.Horse, PropSubType11.Shenling, PropSubType11.Weapon, PropSubType11.Wing, PropSubType11.Body];
            for (let type in list) {
                if ((+type) == PropType.Surface) {
                    let types = list[type];
                    for (let subType of types) {
                        if (subTypes.indexOf(subType) > -1) {
                            this.updateView();
                            break;
                        }
                    }
                }
            }
        }
    }
}