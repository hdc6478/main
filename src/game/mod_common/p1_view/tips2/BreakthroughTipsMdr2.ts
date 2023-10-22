namespace game.mod {

    import Tween = base.Tween;
    import Handler = base.Handler;
    import Sine = base.Sine;
    import LanDef = game.localization.LanDef;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class BreakthroughTipsMdr2 extends EffectMdrBase {
        private _view: BreakthroughTipsView2 = this.mark("_view", BreakthroughTipsView2);
        _showArgs: BreakthroughData;

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
            this.showGrpTween();
            this.showDescTween(this._view.grp_desc1, 116);
            this.showDescTween(this._view.grp_desc2, 398);
            this.showSkillTween(this._view.skill1);
            this.showSkillTween(this._view.skill2);
            this.showTipsTween();
            this.showEffect();
        }

        protected onHide(): void {
            this.removeTitleTween();
            this.removeBgTween();
            this.removeGrpTween();
            this.removeDescTween();
            this.removeSkillTween();
            this.removeTipsTween();
            super.onHide();
        }

        private updateShow(): void {
            let skillId = this._showArgs.skillId;
            let lv = this._showArgs.lv;
            let lastLv = lv - 1;

            let lvStr = ResUtil.getChineseFontStr(lv) + "j";
            let lastLvStr = ResUtil.getChineseFontStr(lastLv) + "j";
            this.addBmpFont(lvStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv2);
            this.addBmpFont(lastLvStr, BmpTextCfg[BmpTextType.Stage], this._view.grp_lv1);

            this._view.lab_lv1.text = lastLv + getLanById(LanDef.tishi_43);
            this._view.lab_lv2.text = lv + getLanById(LanDef.tishi_43);

            this._view.skill1.setData(skillId);
            this._view.skill2.setData(skillId);

            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            this._view.lab_name1.text = this._view.lab_name2.text = cfg.name;

            this._view.lab_desc1.textFlow = TextUtil.parseHtml(this._showArgs.attrDesc0);

            this._view.lab_desc2.textFlow = TextUtil.parseHtml(this._showArgs.attrDesc1);
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
                .to({height: 500}, 200, null, Sine.easeIn);
        }

        private removeBgTween(): void {
            Tween.remove(this._view.img_bg);
        }

        private showGrpTween(): void {
            this._view.grp_show.visible = false;
            this._view.grp_show.x = 0;
            Tween.get(this._view.grp_show)
                .delay(400)
                .exec(Handler.alloc(this, () => {
                    this._view.grp_show.visible = true;
                }))
                .to({x: 175}, 200, null, Sine.easeIn);
        }

        private removeGrpTween(): void {
            Tween.remove(this._view.grp_show);
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

        private showSkillTween(skill: SkillItemRender): void {
            skill.visible = false;
            skill.scaleX = skill.scaleY = 3;
            Tween.get(skill)
                .delay(800)
                .exec(Handler.alloc(this, () => {
                    skill.visible = true;
                }))
                .to({scaleX: 1, scaleY: 1}, 200, null, Sine.easeIn);
        }

        private removeSkillTween(): void {
            Tween.remove(this._view.skill1);
            Tween.remove(this._view.skill2);
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