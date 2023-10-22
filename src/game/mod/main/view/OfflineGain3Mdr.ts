namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import GateConfig = game.config.Gate1Config;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import GameNT = base.GameNT;
    import removeItem = egret.localStorage.removeItem;

    export class OfflineGain3Mdr extends MdrBase {
        private _view: OfflineGain3View = this.mark("_view", OfflineGain3View);
        private _proxy: MainProxy;
        private _model: MainModel;
        private _passProxy: IPassProxy;

        private _rewards: ArrayCollection;
        private _startY: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            let self = this;

            self._view.horizontalCenter = 0;
            self._view.verticalCenter = 0;

            self._proxy = this.retProxy(ProxyType.Main);
            self._model = self._proxy.getmodel() as MainModel;
            self._passProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            ;

            self._rewards = new ArrayCollection();
            self._view.list_award.itemRenderer = Icon;
            self._view.list_award.dataProvider = self._rewards;

            this._startY = this._view.grp_item.y;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_vip, egret.TouchEvent.TOUCH_TAP, this.onVip);
            addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onGet);
            addEventListener(this._view.btn_speed_up, egret.TouchEvent.TOUCH_TAP, this.onSpeedUp);
            this.onNt(MainEvent.UPDATE_OFFLINE, this.updateView, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        private onVip(): void {
            ViewMgr.getIns().openVipView();
            this.hide();
        }

        private onGet(e: TouchEvent) {
            if (this._model.offlineTotalTime < 60) {
                PromptBox.getIns().show(getLanById(LanDef.guaji_shouyi_tips06));
            } else {
                if (BagUtil.checkBagFull()) {
                    return;
                }
                this._proxy.c2s_hangup_get_rwd(2);
            }
        }

        private onSpeedUp(e: TouchEvent) {
            if (this._model.speedUpCnt > 0) {
                this._proxy.c2s_hangup_rate_rwd();
            } else {
                //getLanById(LanDef.guaji_shouyi_tips07)
                PromptBox.getIns().show(getLanById(LanDef.guaji_shouyi_tips07));
            }
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_hangup_get_rwd(1);
            this.playTween();
            //this.updateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            Tween.remove(this._view.grp_item);
            this._view.btn_get.clearEffect();
            super.onHide();
        }

        update(time: base.Time) {
            let self = this;
            let timeNum: number = self._model.offlineTotalTime;
            let time1: number = timeNum > self._model.offlineMaxtime ? self._model.offlineMaxtime : timeNum;
            if (time1 < 0) {
                return;
            }
            this._view.lab_time.textFlow = TextUtil.parseHtml("已挂机 " + TimeUtil.formatSecond(time1, "HH:mm:ss"));
            if (timeNum > 60) {
                //黄色
                this._view.btn_get.setYellow();
            } else {
                //置灰
                this._view.btn_get.setDisabled();
            }
        }

        private updateReward() {
            if (this._rewards.length) {
                this._rewards.replaceAll(this._proxy.rewards);
            } else {
                this._rewards.source = this._proxy.rewards;
            }
        }

        private updateView(): void {
            let viplv = VipUtil.getShowVipLv();
            this._view.lab_vip_status.text = !!viplv ? `vip${viplv}` : "未开通";
            let pCfg: ParamConfig = GameConfig.getParamConfigById("guaji_jiasu_time");
            let speedStr = "立即获得" + TextUtil.addColor(pCfg.value[0][0] + "分钟", WhiteColor.GREEN) + "收益";
            this._view.lab_speed_up.textFlow = TextUtil.parseHtml(speedStr);

            let isFree = this._model.speedUpCost <= 0 && this._model.speedUpCnt > 0;
            let countStr = isFree ? getLanById(LanDef.guaji_shouyi_tips04)
                : "今日剩余次数: " + TextUtil.addColor(this._model.speedUpCnt + "", WhiteColor.GREEN);
            this._view.lab_count.textFlow = TextUtil.parseHtml(countStr);

            if (isFree || this._model.speedUpCnt <= 0) {
                this._view.btn_speed_up.labelDisplay.text = isFree ? "免费加速" : "加速";
                this._view.img_cost.source = null;
                this._view.lab_cost.text = "";
            } else {
                this._view.btn_speed_up.labelDisplay.text = "";
                let cfg: PropConfig = GameConfig.getPropConfigById(PropIndex.Xianyu);
                this._view.img_cost.source = cfg.icon;
                this._view.lab_cost.text = this._model.speedUpCost + "加速";
            }
            this._view.btn_speed_up.redPoint.visible = isFree;
            let bool: boolean = this._proxy.getOfflineHint();
            this._view.btn_get.redPoint.visible = bool;
            if (bool) {
                this._view.btn_get.setEffect(UIEftSrc.Tiaozhan);
            } else {
                this._view.btn_get.clearEffect();
            }

            let gateCfg: GateConfig = getConfigByNameId(ConfigName.Gate, this._passProxy.curIndex);
            if (gateCfg) {
                // for (let i = 0; i < 5; i++) {
                //     let item: OffLineGain3ItemView = this._view["item" + i];
                //     item.setData(gateCfg.drop_show[i]);
                // }
                let count: number = gateCfg.drop_show.length;
                if (count < 5) {
                    count = 5;
                }
                this._view.currentState = `${count < 5 ? 5 : count}`;
                for (let i = 0; i < count; i++) {
                    let drop_show = gateCfg.drop_show[i];
                    let item: OffLineGain3ItemView = this._view["item" + i];
                    item.visible = !!drop_show;
                    item.setData(drop_show);
                }
            }
            this.updateReward();
            this.update(null);
            TimeMgr.addUpdateItem(this, 1000);
        }

        private playTween(): void {
            let target = this._view.grp_item;
            target.y = this._startY;
            Tween.get(target, { loop: true })
                .to({ y: this._startY + 15 }, 1500)
                .to({ y: this._startY }, 1500);
        }

        private onHintUpdate(n: GameNT) {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._model.offlineHint)) {
                this._view.btn_get.setHint(data.value);
            }
        }

    }
}