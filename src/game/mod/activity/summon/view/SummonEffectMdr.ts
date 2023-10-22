namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import prop_tips_data = msg.prop_tips_data;
    import Tween = base.Tween;
    import Handler = base.Handler;

    /**
     * 召唤特效界面，需传入 SummonEffectData
     */
    export class SummonEffectMdr extends EffectMdrBase {
        private _view: SummonEffectView = this.mark("_view", SummonEffectView);
        // private _proxy: SummonProxy;

        private _listData: prop_tips_data[];
        private _isTween: boolean = false;
        private _idxTween: number = 0;
        private _len: number;

        private _count: number = 0;
        private _skip: boolean = false;

        private posArr: number[][] = [];

        _showArgs: SummonEffectData;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            // this._proxy = this.retProxy(ProxyType.Summon);

            this._view.img_bg.source = ResUtil.getUiJpg("beijingtu_chouka");

            this.onInitPos();
        }

        private onInitPos(): void {
            for (let i = 0; i <= 10; i++) {
                let card: SummonCardItem = this._view[`card_${i}`];
                if (card) {
                    this.posArr.push([card.x, card.y]);
                }
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            // addEventListener(this._view.img_bg, TouchEvent.TOUCH_TAP, this.onSkin);
            addEventListener(this._view.btn_back, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_again, TouchEvent.TOUCH_TAP, this.onClickAgain);
            addEventListener(this._view, TouchEvent.TOUCH_TAP, this.onSkip);

            this.onNt(ActivityEvent.ON_UPDATE_SUMMON_TWEEN, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_SUMMON_TWEEN_OVER, this.onTween, this);
            this.onNt(ActivityEvent.ON_UPDATE_SUMMON_SHAKE, this.onUpdataShake, this);
            this.onNt(ActivityEvent.ON_UPDATE_SUMMON_OVER, this.onCheckOver, this);
        }

        protected onShow(): void {
            super.onShow();
            this.removeEft();
            // this.addEftByParent(UIEftSrc.Fanpai, this._view.grp_eff);
            this.addEftByParent(UIEftSrc.Zhaohuanbeijing, this._view.grp_eff2, 0, 0, 0, null, 0, 1.4);

            this._listData = this._showArgs.list;
            this._len = this._listData.length;
            this._view.currentState = this._len == 10 ? "more" : "once";
            this.onUpdateData();
            this.onStart();
        }

        private onUpdateData(): void {
            if (this._len == 1) {
                this._view.card_0.setData(this._listData[0]);
                return;
            }
            for (let i = 0; i < this._listData.length; i++) {
                let card: SummonCardItem = this._view["card_" + (i + 1)];
                if (!card) {
                    continue;
                }
                card.setData(this._listData[i]);
            }
        }

        private onClickAgain(): void {
            let handler: Handler = this._showArgs.handler;
            if (handler) {
                handler.exec();
            }
        }

        private onUpdateView(n: GameNT): void {
            if (this._isTween) {
                return;
            }
            if (n && n.body) {
                this._listData = n.body;
            }

            this.onStart();
        }

        private onUpdataShake(): void {
            Tween.remove(this._view);
            ViewMgr.getIns().shakeUI2(this._view);
        }

        private onTween(): void {
            // if (!this._isTween) {
            //     return;
            // }
            let i = ++this._idxTween;
            let item: SummonCardItem;
            if (this._len == 1) {
                item = this._view.card_0;
            } else {
                item = this._view[`card_${i}`];
            }

            let data = this._listData[i - 1];
            if (item && data) {
                item.setTween();
            } else {
                this.onOver();
            }
        }

        private onSkip(): void {
            if (!this._isTween) {
                return;
            }
            this.onOver(true);
        }

        private onStart(): void {
            this._isTween = true;
            this._view.lab_num.text = `欧气值 ${this._showArgs.luckNum}`;

            let len: number = this._listData.length;
            if (len == 1) {
                Tween.get(this._view.card_0).from({scaleX: 0.1, scaleY: 0.1}, 500);
            } else {
                for (let i = 0; i < this._listData.length; i++) {
                    let card: SummonCardItem = this._view["card_" + (i + 1)];
                    if (!card) {
                        continue;
                    }
                    Tween.remove(card);
                    Tween.get(card).from({x: 360, y: 640, scaleX: 0.1, scaleY: 0.1}, 500);
                }
            }
            Tween.get(this._view).delay(450).exec(Handler.alloc(this, this.onTween));

            this._view.btn_back.visible = false;
            this._view.btn_again.visible = false;
            this._view.cost.visible = false;
        }

        private onCheckOver(): void {
            this._count++;
            if (this._count >= this._listData.length) {
                this.onUpdateOver();
                this._count = 0;
            }
        }

        private onUpdateOver(): void {
            this._skip = false;
            this._isTween = false;
            this._idxTween = 0;

            this._view.btn_back.visible = true;
            this._view.btn_again.visible = true;
            if (this._showArgs.type == SummonEffectType.Summon) {
                GuideMgr.getIns().show(GuideKey.SecondBack, this._view.btn_back, Handler.alloc(this, this.hide));//任务二级返回指引
            }

            this._view.cost.visible = true;
            if (this._showArgs.type == SummonEffectType.Summon) {
                //特殊处理
                let data: PropData = this._showArgs.cost;
                this._view.cost.imgCost = data.cfg.icon;
                let num: number = BagUtil.getPropCntByIdx(data.index);
                let color = num >= data.count ? BlackColor.GREEN : BlackColor.RED;
                if (data.index == PropIndex.Xianyu) {
                    this._view.cost.setLabCost(`${data.count}`, color);
                } else {
                    this._view.cost.setLabCost(`${num}/${data.count}`, color);
                }
            } else {
                let propData: PropData = this._showArgs.cost;
                this._view.cost.imgCost = propData.cfg.icon;
                let num: number = BagUtil.getPropCntByIdx(propData.index);
                let color = num >= propData.count ? BlackColor.GREEN : BlackColor.RED;
                this._view.cost.setLabCost(`${num}/${propData.count}`, color);
            }
        }

        private onOver(skip: boolean = false): void {
            if (this._listData.length == 1) {
                return;
            }
            if (this._skip) {
                return;
            }
            this._skip = skip;
            for (let i = this._idxTween + 1; i <= 10; i++) {
                let card: SummonCardItem = this._view[`card_${i}`];
                Tween.remove(card);
                let point: number[] = this.posArr[i];
                card.x = point[0];
                card.y = point[1];
                card.scaleX = card.scaleY = 1;
                if (skip) {
                    card.setSkip();
                }
            }
        }

        protected onHide(): void {
            if (this._showArgs.type == SummonEffectType.Summon) {
                GuideMgr.getIns().triggerGuide();//触发返回指引
            }
            this._count = 0;
            super.onHide();
        }
    }
}