namespace game.mod.more {
    import ArrayCollection = eui.ArrayCollection;
    import HorseConfig = game.config.HorseConfig;
    import TouchEvent = egret.TouchEvent;
    import PropConfig = game.config.PropConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import DirectShopConfig = game.config.DirectShopConfig;

    export class XiandiGiftMdr extends EffectMdrBase {

        private _view: XiandiGiftView = this.mark("_view", XiandiGiftView);
        protected _showArgs: number;//礼包index
        private _productId: number;

        private _itemList: ArrayCollection;
        private _canReceived: boolean;//是否可以领奖

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy);
            this.onNt(PayEvent.ON_DIRECT_BUY_UPDATE, this.onBuyUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._productId = super.decodeShowArgs();
            this.updateShow();
            this.updateBuyState();
            this.labTimes();
        }

        protected onHide(): void {
            super.onHide();
        }


        private labTimes(): void {
            let cut = PayUtil.getBuyTimes(this._productId);
            if (cut <= 1) {
                this._view.lab_cut.text = "无限购次数";
                return;
            }
            this._view.lab_cut.text = `可购买次数:${cut}`;
        }

        private onBuyUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(this._productId) >= 0) {
                //this.updateBuyState();
                this.hide();
            }
        }

        private onClickBuy(): void {
            if (this._canReceived) {
                PayUtil.drawReward(this._productId);
                return;
            }
            PayUtil.pay(this._productId);
        }

        private updateShow(): void {
            let rewards = PayUtil.getRewards(this._productId);
            this._itemList.source = rewards;

            // let reward = rewards[0];
            // let propIndex = reward[0];
            // let propCfg: PropConfig = GameConfig.getPropConfigById(propIndex);
            // let index = propCfg && propCfg.param1 && propCfg.param1.length ? propCfg.param1[0][0] : 0;

            // if (!index) {
            //     return;
            // }
            // let cfg = getConfigById(index) as HorseConfig;
            // this.addAnimate(index, this._view.grp_eff);
            // this._view.name_item.updateShow(cfg.name, cfg.quality);
            // this._view.special_attr.updateDesc(cfg);
        }

        private updateBuyState(): void {
            this._canReceived = PayUtil.canReceived(this._productId);
            let hasReceived = PayUtil.hasReceived(this._productId);

            // this._view.img_buy.visible = hasReceived;
            this._view.btn_buy.visible = !hasReceived;
            if (this._view.btn_buy.visible) {
                if (this._canReceived) {
                    this._view.btn_buy.group_eft.removeChildren();
                    this._view.btn_buy.labelDisplay.text = getLanById(LanDef.battle_cue38);
                } else {
                    this._view.btn_buy.labelDisplay.text = "";
                    let rmb = PayUtil.getRmbValue(this._productId);
                    let rmbStr = rmb + "y";
                    this.addBmpFont(rmbStr, BmpTextCfg[BmpTextType.Price], this._view.btn_buy.group_eft, true, 1, true);
                }
            }
        }
    }
}

