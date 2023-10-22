namespace game.mod.activity {

    import Tween = base.Tween;
    import Handler = base.Handler;
    import prop_tips_data = msg.prop_tips_data;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;

    export class SummonCardItem extends BaseRenderer {

        public data: prop_tips_data;

        /**卡片背面 */
        private card_cons: eui.Image;
        /**卡片正面背景*/
        private card_pros: eui.Image;
        private icon: Icon;
        private gr_pros: eui.Group;

        private img_title: eui.Image;
        private grp_eff: eui.Group;

        private isSkip: boolean = false;
        private isSurface: boolean = false;

        private delay_idx: number;

        private readonly bigsize: number = 1.5;
        private readonly default: number = 1;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.clearDelayIdx();
        }

        protected dataChanged(): void {
        }

        private onInit(): void {
            this.gr_pros.scaleX = 0;
            this.card_cons.scaleX = 1;

            this.img_title.source = "";

            this.removeAllEffects();
        }

        public setData(data: prop_tips_data): void {

            this.isSkip = false;
            this.data = data;
            this.onInit();
            this.icon.setData(data);
            let prop: PropData = PropData.create(this.data.idx);
            this.isSurface = prop.propType == PropType.Surface;

            this.card_cons.source = `backcard_${data.quality}`;
            this.card_pros.source = `card_${data.quality}`;
        }

        public setTween(isSkip: boolean = false): void {
            if (this.isSkip) {
                return;
            }
            this.isSkip = isSkip;
            if (this.isSurface) {
                Tween.get(this).to({
                    scaleX: this.bigsize,
                    scaleY: this.bigsize
                }, 100).exec(Handler.alloc(this, this.onBeginTween));
            } else {
                this.onBeginTween();
            }
        }

        private onBeginTween(): void {
            Tween.get(this.card_cons)
                .to({scaleX: 0}, 100)
                .exec(Handler.alloc(this, this.callbackTween));
        }

        private callbackTween(): void {
            this.onShowShake();
            Tween.get(this.gr_pros).to({
                scaleX: this.default,
                scaleY: this.default
            }, 100).exec(Handler.alloc(this, this.onEndTween));
        }

        private onEndTween(): void {
            if (this.scaleX == this.bigsize && this.scaleY == this.bigsize) {
                Tween.get(this).to({
                    scaleX: this.default,
                    scaleY: this.default
                }, 100).exec(Handler.alloc(this, this.onSetEff));
            } else {
                this.onSetEff();
            }
        }

        private onSetEff(): void {
            if (this.data && this.data.param1) {
                this.img_title.source = `summon_title_${this.data.param1}`;
            }
            this.onShowEft1();
            this.onTweenEnd();
        }

        private onShowShake(): void {
            let quality = this.data && this.data.quality || 0;
            if (quality > 3) {
                return;
            }
            facade.sendNt(ActivityEvent.ON_UPDATE_SUMMON_SHAKE);
        }

        private onTweenEnd(): void {
            if (!this.data) {
                return;
            }
            let prop = PropData.create(this.data.idx);
            if (prop.propType == PropType.Surface) {
                PropTipsMgr.getIns().continueSurface();//外显碎片时表现
            }
        }

        private onShowEft1(): void {
            if (!this.isSkip) {
                this.delay_idx = delayCall(Handler.alloc(this, () => {
                    facade.sendNt(ActivityEvent.ON_UPDATE_SUMMON_TWEEN_OVER);
                }), 150);
            }
            //[UIEftSrc.Fanpai1,UIEftSrc.Fanpai2,UIEftSrc.Fanpai3]
            let p2: number = this.data && this.data.param2 || 0;
            this.addEftByParent(`fanpai${p2}`, this.grp_eff, 0, 0, -1, Handler.alloc(this, this.onShowEft3), 1);
        }

        private onShowEft3(): void {
            this.onSendOver();
            let quality = this.data && this.data.quality || 0;
            if (quality > 3) {
                return;
            }
            this.removeEft();
            this.addEftByParent(UIEftSrc.Highquality, this.grp_eff);
        }

        private onSendOver(): void {
            facade.sendNt(ActivityEvent.ON_UPDATE_SUMMON_OVER);
        }

        public setSkip(): void {
            this.setTween(true);
            this.clearDelayIdx();
        }

        private clearDelayIdx() {
            this.delay_idx && clearDelay(this.delay_idx);
            this.delay_idx = 0;
        }
    }
}