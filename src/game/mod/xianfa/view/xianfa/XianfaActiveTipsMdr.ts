namespace game.mod.xianfa {

    import Tween = base.Tween;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import skill_item = msg.skill_item;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import TouchEvent = egret.TouchEvent;
    import Cubic = base.Cubic;

    export class XianfaActiveTipsMdr extends EffectMdrBase {

        private _view: XianfaActiveTipsView = this.mark("_view", XianfaActiveTipsView);

        private _proxy: XianfaProxy;
        private _model: XianfaModel;

        private _info: skill_item;
        private _cfg: XianfaSkillInitConfig;
        private _isPlayed: boolean;//是否已播放动画

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Xianfa);
            this._model = this._proxy.getModel();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onClick);
        }

        protected onShow(): void {
            super.onShow();
            this._isPlayed = false;
            this.updateShow();
            this.showTypeTween();
        }

        protected onHide(): void {
            this.removeTypeTween();
            this.removeBgTween();
            super.onHide();
        }

        //点击界面执行动画
        private onClick() {
            if(!this._isPlayed){
                return;
            }
            this._isPlayed = false;
            this.showBgTween();
            this.playIconFly();
        }

        private updateShow(): void {
            this._info = this._showArgs;
            if(!this._info) {
                return;
            }

            let cfg: XianfaSkillInitConfig = this._model.getXianfaCfg(this._info.index);
            this._cfg = cfg;
            this._view.skill.setData(cfg, this._info, 4);
            this._view.skill.visible = true;
            this._view.power.setPowerValue(this._info.power);
            this._view.img_bg.alpha = 1;
        }

        private showTypeTween(): void {
            this.removeTypeTween();
            this._view.grp_type.visible = false;
            this._view.grp_type.scaleX = this._view.grp_type.scaleY = 0.1;
            Tween.get(this._view.grp_type)
                .delay(500)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_type.visible = true;
                    this._isPlayed = true;
                }))
                .to({scaleX: 1, scaleY: 1}, 300, null, Sine.easeIn);
        }

        private removeTypeTween(): void {
            Tween.remove(this._view.grp_type);
        }

        private showBgTween(): void {
            this.removeBgTween();
            Tween.get(this._view.img_bg)
                .to({alpha: 0}, 1000, null, Cubic.easeIn);
        }

        private removeBgTween(): void {
            Tween.remove(this._view.img_bg);
        }

        private playIconFly(): void {
            this._view.skill.visible = false;
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._cfg.index);
            let imgSource = skillCfg.icon;
            let startPosX = this._view.skill.x + this._view.skill.img_skill.x;
            let startPosY = this._view.skill.y + this._view.skill.img_skill.y;
            let info: IconImageFlyData = {
                imgSource: imgSource,
                layer: Layer.modal,
                startPosX: startPosX,
                startPosY: startPosY,
                type: MainBtnType.Xianfa,
                handler: Handler.alloc(this, this.hide),
                imgWidth: 82,
                imgHeight: 82
            };
            this.sendNt(MainEvent.ON_ICON_IMAGE_FLY, info);
        }
        
    }
}