namespace game.mod.more {

    import Tween = base.Tween;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import prop_attributes = msg.prop_attributes;
    import PropConfig = game.config.PropConfig;

    export class HunkaComposeTipsMdr extends EffectMdrBase{
        private _view: HunkaComposeTipsView = this.mark("_view", HunkaComposeTipsView);

        public _showArgs: prop_attributes;

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
            this.showSuccessTween();
            this.showEffect();
            ViewMgr.getIns().shakeUI(this._view);
        }

        protected onHide(): void {
            this.removeTypeTween();
            this.removeNameTween();
            this.removeSuccessTween();
            Tween.remove(this._view);
            super.onHide();
        }

        private updateShow(): void {
            let propData = PropData.fromData(this._showArgs);
            let cfg = propData.cfg as PropConfig;
            this._view.img_icon.source = ResUtil.getBigIcon(cfg.icon);
            this._view.lab_name.textFlow = propData.getPropName(false);
            let star = propData.hunka_star;
            this._view.starListView.updateNewStar(star, star);
            this._view.hunkaScore.setData(propData.pingfen);
            this._view.hunkaAttrListView.updateShow(propData.shuiji);
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
                .to({scaleX: 1, scaleY: 1}, 300, null, Sine.easeIn);
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
                .to({y: 479}, 300, null, Sine.easeIn);
        }

        private removeNameTween(): void {
            Tween.remove(this._view.grp_name);
        }

        private showSuccessTween(): void {
            this.removeSuccessTween();
            this._view.img_success.y = 622;
            this._view.img_success.alpha = 1;
            Tween.get(this._view.img_success)
                .to({y: 500, alpha: 0}, 1000);
        }

        private removeSuccessTween(): void {
            Tween.remove(this._view.img_success);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.SurfaceTips, this._view.grp_eft2, 0,0,0,null,1, 2);
        }
    }
}