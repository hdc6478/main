namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class XiandiShowMdr extends EffectMdrBase {
        private _view: XiandiShowView = this.mark("_view", XiandiShowView);

        private _proxy: XiandiProxy;
        private readonly _kings: number = 4;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xiandi);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_like, TouchEvent.TOUCH_TAP, this.onClickLike);
            addEventListener(this._view.btn_explain, TouchEvent.TOUCH_TAP, this.onClickExplain);
            addEventListener(this._view.btn_goddess, TouchEvent.TOUCH_TAP, this.onClickGoddess);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_house, TouchEvent.TOUCH_TAP, this.onClickHouse);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
            addEventListener(this._view.btn_treasure, TouchEvent.TOUCH_TAP, this.onClickTreasure);
            addEventListener(this._view.btn_weapon, TouchEvent.TOUCH_TAP, this.onClickWeapon);
            // addEventListener(this._view.item, TouchEvent.TOUCH_TAP, this.onClickInfo);
            this.onNt(HuangguEvent.ON_UPDATE_XIANDI_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            for (let i = 1; i <= this._kings; i++) {
                let info = this._proxy.getKingInfo(i);
                let item: XiandiKingItem = this._view[`item${i}`];
                item.setData(info, i, this._proxy.is_tiandi);
            }
            this._view.item.setData(this._proxy.tiandi_info, 0, false);
            if (this._proxy.tiandi_info && !this._proxy.is_tiandi) {
                this._view.btn_fight.setEffect(UIEftSrc.CurPass);
            }

            this._view.lab_count.text = `${this._proxy.click_count}`;

            this._view.lab_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xiandi_tips12));

            this._view.btn_reward.setHint(this._proxy.is_job && !this._proxy.is_gongfeng);

            this._view.btn_like.setHint(this._proxy.tiandi_info && !this._proxy.is_click);
        }

        private onClickHouse(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiHouse);
        }

        private onClickLike(): void {
            if (this._proxy.is_click) {
                PromptBox.getIns().show("今日已点赞");
                return;
            }
            this._proxy.c2s_xiandi_zhengba_oper(5);
        }

        private onClickExplain(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xiandi_tips10));
        }

        private onClickGoddess(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiGodress);
        }

        private onClickGift(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiGift, this._proxy.xiandi_libao);
            // ViewMgr.getIns().showGift(this._proxy.xiandi_libao);
        }

        private onClickReward(): void {
            let okFunc: base.Handler = base.Handler.alloc(this, () => {
                // if (!this._proxy.is_job) {
                //     return;
                // }
                this._proxy.c2s_xiandi_zhengba_oper(7);
            });
            let time: number = 0;
            if (this._proxy.is_gongfeng) {
                time = TimeUtil.getNextDayTime(base.TimeMgr.time.serverTimeSecond, false, 1);
            }
            let btnTips: string;
            if (!this._proxy.is_job) {
                btnTips = "天王可领取";
            }
            let timeTips: string = "后可领取";
            let btnStr: string = getLanById(LanDef.lingqu);
            let title: string = getLanById(LanDef.xiandi_tips20);
            ViewMgr.getIns().showBoxReward2({ reward: this._proxy.tiandi_zhengba_gongfeng, okFunc, time, timeTips, btnStr, btnTips, title });
        }

        private onClickFight(): void {
            let cost: number[] = this._proxy.tiandi_zhengba_tiaozhan_duowei;
            let cnt: number = BagUtil.getPropCntByIdx(cost[0]);
            // if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
            if (cnt < cost[1]) {
                // ViewMgr.getIns().showGift(this._proxy.xiandi_libao);
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiGift, this._proxy.xiandi_libao);
                return;
            }
            let param: string = TextUtil.addColor(`${cnt}`, BlackColor.GREEN);
            let content: string = StringUtil.substitute(getLanById(LanDef.xiandi_tips13), [param]);
            ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, () => {
                this._proxy.c2s_xiandi_zhengba_oper(3);
            }))
        }

        // private onClickInfo(): void {
        //     ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XiandiInfo);
        // }

        private onClickTreasure(): void {
            if (!this._proxy.tiandi_info) {
                PromptBox.getIns().show("暂无仙帝");
                return;
            }
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiTreasure);
        }

        private onClickWeapon(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XiandiWeapon);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}