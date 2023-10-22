namespace game.mod.god {

    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import BuffConfig = game.config.BuffConfig;

    export class GodBuffTipsMdr extends MdrBase {
        private _view: SkillTipsView = this.mark("_view", SkillTipsView);
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        public _showArgs: { skillId: number, cur?: number, limit?: number, isAct: boolean, confirm?: Handler, condHandler?: Handler };

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
            addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
            this.onNt(SurfaceEvent.SURFACE_SKILL_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAct(): void {
            if (this._showArgs.cur < this._showArgs.limit) {
                PromptBox.getIns().show(getLanById(LanDef.dragon_tips4));
                return;
            }
            let confirm = this._showArgs.confirm;
            confirm && confirm.exec();
        }

        private onInfoUpdate(n: GameNT): void {
            let isAct: boolean = n.body;
            this.updateAct(isAct)
        }

        private updateView(): void {
            let skillId = this._showArgs.skillId;
            let isAct = this._showArgs.isAct;
            this._view.skill.setData(skillId);
            this._view.img_tips.visible = false;

            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, skillId);
            this._view.lab_name.text = cfg.name;
            this._view.power.setPowerValue(cfg.powershow);
            this._view.baseDescItem.updateShow(cfg.des, getLanById(LanDef.sp_tips1));

            if (!isAct) {
                this._view.icon.visible = false;
                this._view.lab_limit.horizontalCenter = 0;
                this._view.lab_limit.visible = true;
                this._view.btn_act.horizontalCenter = 0;
                let str = TextUtil.addEnoughColor( this._showArgs.cur, this._showArgs.limit);
                this._view.lab_limit.textFlow = TextUtil.parseHtml(`化身${this._showArgs.limit}级激活：` + str);
            }

            this.updateAct(isAct);
        }

        private updateAct(isAct: boolean): void {
            this._view.currentState = isAct ? "act" : "default";
        }
    }
}