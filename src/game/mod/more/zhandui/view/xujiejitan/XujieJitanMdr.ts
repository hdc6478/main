namespace game.mod.more {

    import facade = base.facade;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import GameNT = base.GameNT;

    export class XujieJitanMdr extends EffectMdrBase implements UpdateItem {
        private _view: XujieJitanView = this.mark("_view", XujieJitanView);
        private _proxy: XujieJitanProxy;
        private _effId: number;
        private _effSrc: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieJitan);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
            addEventListener(this._view.btn_upstar, egret.TouchEvent.TOUCH_TAP, this.onClickUpstar, this);
            addEventListener(this._view.sacrificeItem, egret.TouchEvent.TOUCH_TAP, this.onClickSacrificeItem, this);
            addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanhua, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_BASE_INFO, this.updateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_JITAN_GONGFENG_INFO, this.updateView, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper207);
        }

        protected onHide(): void {
            super.onHide();
            this._effId = null;
            this._effSrc = null;
        }

        private updateView(): void {

            this._view.seasonComp.updateShow();
            this._view.sacrificeItem.updateShow();
            this._view.itemComp.updateShow();

            this.updateCost();
            this.updateModel();

            //正在献祭中的，开启倒计时
            let sacrificeInfo = this._proxy.getSacrificeInfo();
            this._view.sacrificeItem.visible = !!sacrificeInfo;
            if (sacrificeInfo) {
                if (!TimeMgr.hasUpdateItem(this)) {
                    TimeMgr.addUpdateItem(this, 1000);
                }
                this.update(TimeMgr.time);
            } else {
                TimeMgr.removeUpdateItem(this);
            }

            this._view.btn_gift.setHint(this._proxy.getLibaoHint());
            this._view.btn_huanhua.setHint(this._proxy.getHuanhuaHint());
        }

        private updateCost(): void {
            let isMaxLv = this._proxy.isMaxLv();//是否满级
            this._view.img_max.visible = isMaxLv;
            this._view.gr_cost.visible = !isMaxLv;

            let value = this._proxy.value;
            let lvCfg = this._proxy.getLvConfig();
            if (isMaxLv) {
                let lv = this._proxy.jitan_level;
                lvCfg = this._proxy.getLvConfig(lv - 1);
                value = 0;
            }

            let cost = lvCfg.cost;

            if (this._view.gr_cost.visible) {
                this._view.coin.initIcon(cost[0]);
                this._view.coin.lab_cost.text = `${value}/${cost[1]}`;
            }

            this._view.btn_upstar.updateCost(cost, false, "", false, value);
            this._view.btn_upstar.img_cost.visible = false;
            // this._view.btn_upstar.setHint(cnt >= cost[1]);
        }

        private updateModel(): void {
            let lv = this._proxy.jitan_level;
            let stageStr = ResUtil.getChineseFontStr(lv) + "j";
            this.addBmpFont(stageStr, BmpTextCfg[BmpTextType.Stage], this._view.gr_lv, false, 1, true);

            let cfg = this._proxy.getHuanhuaCfg();
            if (cfg && (!this._effSrc || this._effSrc != cfg.index)) {
                this._view.nameItem.updateShow(cfg.name, cfg.quality);
                this._effSrc = cfg.index;
                this.removeEffect(this._effId);
                this._effId = this.addAnimate(cfg.index, this._view.gr_eft);
            }
        }

        private onClickGift(): void {
            ViewMgr.getIns().showView(ModName.More, MoreViewType.XujieJitanGiftMain);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.xujiejitan_tips3));
        }

        private onClickUpstar(): void {
            if (this._proxy.canUpstar(true)) {
                //todo
            }
        }

        private onClickSacrificeItem(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieJitanSpeedUp);
        }

        private onClickHuanhua(): void {
            facade.showView(ModName.More, MoreViewType.XujieJitanHuanhua);
        }

        update(time: base.Time) {
            if (this._view.sacrificeItem.visible) {
                this._view.sacrificeItem.updateTime();
            }
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.XujieJitan) > -1) {
                this._view.itemComp.updateShow();
            }
        }
    }
}