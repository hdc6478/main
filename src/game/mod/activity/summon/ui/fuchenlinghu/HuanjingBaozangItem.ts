namespace game.mod.activity {

    import HuanjingBaozangConfig = game.config.HuanjingBaozangConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class HuanjingBaozangItem extends BaseListenerRenderer {
        public icon: game.mod.IconGot;
        public list: eui.List;
        public btn_do0: game.mod.Btn;
        public btn_do1: game.mod.Btn;
        public img_got0: eui.Image;
        public img_got1: eui.Image;
        public lab_val: eui.Label;
        public bar: game.mod.VProgressBar;

        public thumbTop: eui.Image;
        public thumb: eui.Image;
        public scr: eui.Scroller;

        data: IHuanjingBaozangItemData;
        private _listData: eui.ArrayCollection;
        private _proxy: FuchenlinghuProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);

            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();

            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do0, this.onClickBtn0, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do1, this.onClickBtn1, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.cfg) {
                return;
            }
            let cfg = data.cfg;

            //免费奖励
            this.icon.setData({
                prop: cfg.reward[0],
                isGot: data.freeStatus == RewardStatus.Draw,
                showTips: true
            });
            if (data.freeStatus == RewardStatus.NotFinish) {
                this.icon.gr_got.visible = true;
                this.icon.img_gou.visible = false;
            }
            if (data.freeStatus == RewardStatus.Draw) {
                this.img_got0.visible = true;
                this.btn_do0.visible = false;
            } else {
                this.img_got0.visible = false;
                this.btn_do0.visible = true;
                let isFinish = data.freeStatus == RewardStatus.Finish;
                this.btn_do0.label = isFinish ? getLanById(LanDef.lingqu) : getLanById(LanDef.chengshen_goto1);
                if (isFinish) {
                    this.btn_do0.setYellow();
                } else {
                    this.btn_do0.setBlue();
                }
                this.btn_do0.setHint(this._proxy.getBaozangHint(cfg.index, true));
            }

            //付费奖励
            if (data.cfg.reward2) {
                this._listData.replaceAll(data.cfg.reward2);
            } else if (data.cfg.gift_id) {
                let rewards = PayUtil.getRewards(data.cfg.gift_id);
                this._listData.replaceAll(rewards);
            }
            this.img_got1.visible = data.payStatus == RewardStatus.Draw;
            this.btn_do1.visible = !this.img_got1.visible;
            if (data.cfg.gift_id) {
                this.btn_do1.label = PayUtil.getRmbValue(data.cfg.gift_id) + PayUtil.getRmbUnit();
                this.btn_do1.resetCost();
            } else if (data.cfg.cost) {
                let cost = data.cfg.cost[0];
                this.btn_do1.setCost(cost);
                this.btn_do1.label = '';
                this.btn_do1.setHint(this._proxy.getBaozangHint(cfg.index, false));
            }

            this.lab_val.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.fuchenlinghu_tips16), [cfg.times]));
            this.bar.setData({start: data.before, val: data.val, target: data.cfg.times, next: data.next});
            // if (data.val <= data.before) {
            //     this.thumb.height = 0;
            //     this.scr.visible = false;
            //     return;
            // }
            // let p = (data.val - data.before) / (data.cfg.times - data.before);
            // if (p > 1) {
            //     p = 1;
            // } else if (p < 0) {
            //     p = 0;
            // }
            // this.scr.visible = true;
            // this.scr.height = 110 * p;//todo
            //
            // let p2 = (data.val - data.cfg.times) / (data.next - data.cfg.times);
            // if (p2 > 1) {
            //     p2 = 1;
            // } else if (p2 < 0) {
            //     p2 = 0;
            // } else if (data.val <= data.cfg.times) {
            //     p2 = 0;//未到下半进度
            // }
            // this.thumb.height = 70 * p2;
        }

        private onClickBtn0(): void {
            if (this.data.freeStatus == RewardStatus.Finish) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper6, this.data.cfg.index, 1);
            } else {
                this.jumpFunc();
            }
        }

        private onClickBtn1(): void {
            if (this.data.payStatus == RewardStatus.NotFinish) {
                ViewMgr.getIns().showConfirm(getLanById(LanDef.jinjielibao_tips2), Handler.alloc(this, this.jumpFunc));
                return;
            }

            let cfg = this.data.cfg;
            if (cfg.gift_id) {
                PayUtil.pay(cfg.gift_id);
            } else if (cfg.cost && this.data.payStatus == RewardStatus.Finish) {
                this._proxy.c2s_linghu_oper(FuchenlinghuOperType.Oper6, cfg.index, 2);
            }
        }

        private jumpFunc(): void {
            if (this._proxy.isOpenSea(SeaType.Sea1, true)) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu);
            }
        }
    }

    export interface IHuanjingBaozangItemData {
        cfg: HuanjingBaozangConfig;
        /**状态，免费奖励*/
        freeStatus: RewardStatus;
        /**状态，付费奖励*/
        payStatus: RewardStatus;
        /**当前进度值*/
        val: number;
        /**上个配置的值 */
        before: number;
        /**下一个目标值 */
        next: number;
    }
}