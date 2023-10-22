namespace game.mod.surface {

    import Tween = base.Tween;
    import Sine = base.Sine;
    import Handler = base.Handler;

    export class SurfaceTipsMdr extends EffectMdrBase {
        private _view: SurfaceTipsView = this.mark("_view", SurfaceTipsView);

        public _showArgs: { index: number, triggerGuide: boolean };/**外显index，是否触发指引*/
        private _triggerGuide: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

        }

        protected onShow(): void {
            super.onShow();
            this.updateShow();
            this.showTypeTween();
            this.showNameTween();
            this.showSrTween();
            this.showEffect();
            ViewMgr.getIns().shakeUI(this._view);
            this._triggerGuide = this._showArgs.triggerGuide;
        }

        protected onHide(): void {
            this.removeTypeTween();
            this.removeNameTween();
            this.removeSrTween();
            PropTipsMgr.getIns().closeSurface();
            if (this._triggerGuide) {
                GuideMgr.getIns().triggerGuide();//触发返回指引
            }
            Tween.remove(this._view);
            this.sendNt(SurfaceEvent.ON_SURFACE_TIPS_HIDE);
            super.onHide();
        }

        private updateShow(): void {
            let index = this._showArgs.index;
            let prop = PropData.create(index);//外显作为道具
            this._view.lab_name.textFlow = prop.getPropName(false);
            this._view.img_type.source = "surface_type_" + prop.type;
            this._view.img_quality.source = ResUtil.getSrQuality(prop.quality);
            this.addAnimate(index, this._view.grp_eff);
            if (prop.type == ConfigHead.Xianjian) {
                this._view.grp_eff.y = 650;
            }
        }

        private showTypeTween(): void {
            this.removeTypeTween();
            this._view.grp_type.visible = false;
            this._view.grp_type.scaleX = this._view.grp_type.scaleY = 0.1;
            Tween.get(this._view.grp_type)
                .delay(500)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_type.visible = true;
                }))
                .to({ scaleX: 1, scaleY: 1 }, 300, null, Sine.easeIn);
        }

        private removeTypeTween(): void {
            Tween.remove(this._view.grp_type);
        }

        private showNameTween(): void {
            this.removeNameTween();
            this._view.grp_name.visible = false;
            this._view.grp_name.y = 410;
            Tween.get(this._view.grp_name)
                .delay(500)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_name.visible = true;
                }))
                .to({ y: 479 }, 300, null, Sine.easeIn);
        }

        private removeNameTween(): void {
            Tween.remove(this._view.grp_name);
        }

        private showSrTween(): void {
            this.removeSrTween();
            this._view.img_quality.visible = false;
            this._view.img_quality.scaleX = this._view.img_quality.scaleY = 2;
            Tween.get(this._view.img_quality)
                .delay(500)
                .exec(Handler.alloc(this, () => {
                    this._view.img_quality.visible = true;
                }))
                .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn)
                .delay(400)
                .to({ scaleX: 1.5, scaleY: 1.5 }, 100, null, Sine.easeIn)
                .to({ scaleX: 1, scaleY: 1 }, 100, null, Sine.easeIn);

        }

        private removeSrTween(): void {
            Tween.remove(this._view.img_quality);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.SurfaceTips, this._view.grp_eft2, 0, 0, 0, null, 1, 2);
        }
    }
}