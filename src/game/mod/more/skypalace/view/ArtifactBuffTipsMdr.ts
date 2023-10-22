namespace game.mod.more {

    import BattleSkillConfig = game.config.BattleSkillConfig;
    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import HuangguShenqiConfig = game.config.HuangguShenqiConfig;

    export class ArtifactBuffTipsMdr extends MdrBase {
        protected _view: ArtifactBuffTipsView = this.mark("_view", ArtifactBuffTipsView);
        /**被动技能id，是否激活， 激活回调，其他激活条件*/
        public _showArgs: ArtifactBuffData;
        protected _cost: number[];

        private _proxy: SkyPalaceProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.SkyPalace);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClickAct);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickAct(): void {
            let condHandler = this._showArgs.condHandler;
            let condRst = true;//其他激活条件
            if (condHandler) {
                condRst = condHandler.exec();
            }
            if (!condRst) {
                return;
            }
            let confirm = this._showArgs.confirm;
            confirm && confirm.exec();
            this.hide();
        }

        private updateView(): void {
            let skillId = this._showArgs.skillId;
            this._view.skill.setData(skillId);

            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, this._showArgs.skillId);
            let level: number = this._proxy.getSkillLevel(this._showArgs.index, this._showArgs.skillId);
            this._view.lab_name.text = `${cfg.name} ${level}级`;
            let level_up: number = this._proxy.getSkillAct(this._showArgs.index, this._showArgs.skillId, level + 1);
            if (level) {
                this._view.baseDescItem.updateShow(TextUtil.getSkillDesc(cfg, level,false,true), "当前效果");
                this._view.baseDescItem2.updateShow(TextUtil.getSkillDesc(cfg, level + 1,false,true), "下阶效果", 10, BlackColor.GRAY);
                this._view.baseDescItem.visible = this._view.baseDescItem2.visible = true;
            } else {
                this._view.baseDescItem.updateShow(TextUtil.getSkillDesc(cfg, level + 1,false,true), "下阶效果", 10, BlackColor.GRAY);
                this._view.baseDescItem2.visible = false;
            }

            if (level_up) {
                let cfg_shenqi: HuangguShenqiConfig = getConfigByNameId(ConfigName.HuangguShenqi, this._showArgs.index);
                let info = this._proxy.getInfo(this._showArgs.index);
                let info_level: number = info && info.level || 0;
                if (info_level < level_up) {
                    this._view.lab_limit.text = `${cfg_shenqi.name}${level_up}阶可${info_level ? "升级" : "激活"}(${info_level}/${level_up})`;
                    this._view.btn.visible = false;
                } else {
                    this._view.lab_limit.text = "";
                    this._view.btn.visible = true;
                }
            } else {
                this._view.lab_limit.text = "";
                this._view.btn.visible = false;
            }
        }

    }

    export interface ArtifactBuffData {
        skillId: number;
        isAct: boolean;
        confirm?: Handler;
        condHandler?: Handler;
        index: number;
    }
}