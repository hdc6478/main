namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class UnionInMdr extends MdrBase {
        private _view: UnionInView = this.mark("_view", UnionInView);
        private _proxy: UnionProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);
            this._view.btn_beast.group.y = 66;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_donate, TouchEvent.TOUCH_TAP, this.onDonate, this);
            addEventListener(this._view.btn_wage, TouchEvent.TOUCH_TAP, this.onClickWage, this);
            addEventListener(this._view.btn_hero, TouchEvent.TOUCH_TAP, this.onClickHero, this);
            addEventListener(this._view.head, TouchEvent.TOUCH_TAP, this.onClickHead, this);
            addEventListener(this._view.btn_welfare, TouchEvent.TOUCH_TAP, this.onWelfare, this);
            addEventListener(this._view.btn_lottery, TouchEvent.TOUCH_TAP, this.onLottery, this);
            addEventListener(this._view.btn_treasure, TouchEvent.TOUCH_TAP, this.onTreasure, this);
            addEventListener(this._view.btn_kill, TouchEvent.TOUCH_TAP, this.onKill, this);
            addEventListener(this._view.btn_storage, TouchEvent.TOUCH_TAP, this.onStorage, this);
            addEventListener(this._view.btn_book, TouchEvent.TOUCH_TAP, this.onBook, this);
            addEventListener(this._view.btn_beast, TouchEvent.TOUCH_TAP, this.onBeast, this);

            this.onNt(UnionEvent.ON_UPDATE_UNION_INFO, this.onUpdateView, this);
            this.onNt(UnionEvent.ON_UPDATE_WAGE_BTN_INFO, this.onUpdateWage, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            this._proxy.c2s_ask_guild_info();
            super.onShow();
            this._proxy.open_fun = "";

            this._view.btn_beast.img_bg.source = ResUtil.getUiPng("jianzhu_xianshou");//仙兽
            this._view.btn_welfare.img_bg.source = ResUtil.getUiPng("jianzhu_fulidating");//福利大厅
            this._view.btn_book.img_bg.source = ResUtil.getUiPng("jianzhu_shuzai");//书斋
            this._view.btn_lottery.img_bg.source = ResUtil.getUiPng("jianzhu_tiantan");//天坛
            this._view.btn_storage.img_bg.source = ResUtil.getUiPng("jianzhu_cangku");//仓库
            this._view.btn_kill.img_bg.source = ResUtil.getUiPng("jianzhu_zhanyaotai");//斩妖台
            this._view.btn_treasure.img_bg.source = ResUtil.getUiPng("jianzhu_xianzongyibao");//仙宗遗宝
        }

        private onUpdateView(): void {
            let model = this._proxy.model;
            this._view.head.updateHeadShow(model.header.head, model.header.head_frame, model.header.sex);
            this._view.lab_header.text = model.header.name;
            this._view.lab_name.text = model.info.guild_name;
            this._view.btn_donate.label = `${model.info.level}级`;
            this._view.lab_notice.text = getLanById(LanDef.xianzong_tips1);

            this._view.btn_welfare.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionWelfare]));
            this._view.btn_lottery.setHint(HintMgr.getHint(this._proxy.model.lottery_root));

            this._view.btn_book.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBook]));
            this._view.btn_beast.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast]));
            this._view.btn_kill.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill]));
            this._view.btn_treasure.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionTreasure]));
            this._view.btn_donate.setHint(HintMgr.getHint([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, HintType.UnionDonate]));

            this.onUpdateWage();

            if (this._proxy.model.show_welcome) {
                ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionWelcome);
            }
        }

        private onUpdateWage(): void {
            this._view.btn_wage.setHint(!this._proxy.model.is_get_reward);
            this._view.btn_wage.visible = !this._proxy.model.is_get_reward;
        }

        private onDonate(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionDonate);
        }

        private onWelfare(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionWelfare);
        }

        private onLottery(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionLottery);
        }

        private onTreasure(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionTreasure);
        }

        private onKill(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionKill);
        }

        private onStorage(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionStorage);
        }

        private onBook(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionBook);
        }

        private onBeast(): void {
            ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionBeast);
        }

        private onClickHead(): void {
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionMember, this._proxy.model.header.role_id);
        }

        private onClickWage(): void {
            let bool: boolean = this._proxy.model.is_get_reward;
            if (bool) {
                PromptBox.getIns().show("今日奖励已领取");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionWage);
        }

        /**仙尊秘宝 */
        private onClickHero(): void {
            if (this._proxy.checkIsSetHero()) {
                ViewMgr.getIns().showView(ModName.Union, UnionMainType.UnionHeroShop);
            } else {
                ViewMgr.getIns().showSecondPop(ModName.Union, UnionMainType.UnionHero);
            }
        }

        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionWelfare])) {
                this._view.btn_welfare.setHint(data.value);
            }
            if (data.node == HintMgr.getType(this._proxy.model.lottery_root)) {
                this._view.btn_lottery.setHint(data.value);
            }
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01])) {
                this._view.btn_wage.setHint(!this._proxy.model.is_get_reward);
                this._view.btn_wage.visible = !this._proxy.model.is_get_reward;
            }
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBook])) {
                this._view.btn_book.setHint(data.value);
            }
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionBeast])) {
                this._view.btn_beast.setHint(data.value);
            }
            if (data.node == HintMgr.getType([ModName.Union, UnionMainType.UnionIn, MdrTabBtnType.TabBtnType01, UnionMainType.UnionKill])) {
                this._view.btn_kill.setHint(data.value);
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}