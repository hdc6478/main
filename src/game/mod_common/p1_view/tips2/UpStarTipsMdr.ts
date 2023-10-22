namespace game.mod {


    import Tween = base.Tween;
    import Handler = base.Handler;
    import Sine = base.Sine;

    /**
     * 升星成功
     * 参考 BreakthroughTipsMdr
     */
    export class UpStarTipsMdr extends EffectMdrBase {
        private _view: UpStarTipsView = this.mark("_view", UpStarTipsView);
        _showArgs: UpStarData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.showTitleTween();
            this.showBgTween();
            this.showGrpStarlistTween();
            this.showDescTween(this._view.grp_desc1, 185);
            this.showDescTween(this._view.grp_desc2, 406);
            this.showSkillTween();
            this.showTipsTween();
            this.showEffect();
        }

        protected onHide(): void {
            this.removeTitleTween();
            this.removeBgTween();
            this.removeGrpStarlistTween();
            this.removeDescTween();
            this.removeSkillTween();
            this.removeTipsTween();
            super.onHide();
            super.onHide();
        }

        private updateShow(): void {
            let lv = this._showArgs.star;
            let lastLv = lv - 1;

            //星级
            this._view.starListView1.updateStar(lastLv);
            this._view.starListView2.updateStar(lv);
            //属性文本
            if (this._showArgs.attrDesc0) {
                this._view.lab_desc1.textFlow = TextUtil.parseHtml(this._showArgs.attrDesc0);
                this._view.lab_desc2.textFlow = TextUtil.parseHtml(this._showArgs.attrDesc1);
            }
            //仙力，font字体
            if (this._showArgs.attrFont0) {
                this._view.lab_desc1.text = '';
                this._view.lab_desc2.text = '';
                this.addBmpFont(this._showArgs.attrFont0, BmpTextCfg[BmpTextType.CommonPower2], this._view.grp_lv1, true, 1.5, false, -3);
                this.addBmpFont(this._showArgs.attrFont1, BmpTextCfg[BmpTextType.CommonPower2], this._view.grp_lv2, true, 1.5, false, -3);
            }
        }

        private showTitleTween(): void {
            this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
            Tween.get(this._view.img_title)
                .to({scaleX: 1, scaleY: 1}, 200);
        }

        private removeTitleTween(): void {
            Tween.remove(this._view.img_title);
        }

        private showBgTween(): void {
            this._view.img_bg.visible = false;
            this._view.img_bg.height = 0;
            Tween.get(this._view.img_bg)
                .delay(200)
                .exec(Handler.alloc(this, () => {
                    this._view.img_bg.visible = true;
                }))
                .to({height: 325}, 200, null, Sine.easeIn);
        }

        private removeBgTween(): void {
            Tween.remove(this._view.img_bg);
        }

        private showGrpStarlistTween(): void {
            this._view.grp_starlist.visible = false;
            this._view.grp_starlist.x = 0;
            Tween.get(this._view.grp_starlist)
                .delay(400)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_starlist.visible = true;
                }))
                .to({x: 175}, 200, null, Sine.easeIn);
        }

        private removeGrpStarlistTween(): void {
            Tween.remove(this._view.grp_starlist);
        }

        private showDescTween(grp: eui.Group, posX: number): void {
            grp.visible = false;
            grp.x = 0;
            Tween.get(grp)
                .delay(600)
                .exec(Handler.alloc(this, () => {
                    grp.visible = true;
                }))
                .to({x: posX}, 200, null, Sine.easeIn);
        }

        private removeDescTween(): void {
            Tween.remove(this._view.grp_desc1);
            Tween.remove(this._view.grp_desc2);
        }

        private showSkillTween(): void {
        }

        private removeSkillTween(): void {
        }

        private showTipsTween(): void {
            this._view.closeTips.visible = false;
            Tween.get(this._view.closeTips)
                .delay(1000)
                .exec(Handler.alloc(this, () => {
                    this._view.closeTips.visible = true;
                }));
        }

        private removeTipsTween(): void {
            Tween.remove(this._view.closeTips);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Success, this._view.grp_eft, 0, 0, 0, null, 1);
            this.addEftByParent(UIEftSrc.TipsBg, this._view.grp_eft2);
        }
    }
}