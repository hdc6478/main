namespace game.mod.surface {


    import XianjianConfig = game.config.XianjianConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import SkillLevelConfig = game.config.SkillLevelConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class XianjianBattleSkillTipsMdr extends SurfaceSkillTipsMdr {
        public _showArgs: XianjianSkillData;

        protected _state: string = "xianjian";

        protected onShow(): void {
            super.onShow();
            this.onUpdateBtn();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
            this.onNt(SurfaceEvent.ON_UPDATE_XIANJIAN_INFO, this.onUpdateBtn, this);
        }

        protected onUpdateBtn(): void {
            let proxy: XianjianProxy = getProxy(ModName.Surface, ProxyType.Xianjian);
            let bool: boolean = proxy.getSkillUp(this._showArgs.index);
            this._view.btn.setHint(bool);
        }

        protected onUpdateDesc2(): void {
            let proxy: XianjianProxy = this.retProxy(ProxyType.Xianjian);
            let info = proxy.getInfo(this._showArgs.index);
            let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, this._showArgs.index);
            let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, cfg.skill);

            let next: number = proxy.getNextStage(this._showArgs.index);
            let count: number = proxy.getCountByStage(this._showArgs.index, next);
            let buwei: number = 4;
            let color: number = count == buwei ? 0xFFF053 : BlackColor.GRAY;
            let title: string = TextUtil.addColor(`下一阶段 所有部位${next}阶(${count}/${buwei})`, color);

            let desc: string = "";
            if (!info || !info.active_skill_level) {
                desc = skill.describe;
            } else {
                let nextIndex: number = cfg.skill + info.active_skill_level + 1;
                let skilllv: SkillLevelConfig = getConfigByNameId(ConfigName.SkillLv, nextIndex);
                if (!skilllv) {
                    this._view.baseDescItem2.visible = false;
                    return;
                }
                desc = skilllv.describe;
            }

            this._view.baseDescItem2.visible = true;
            this._view.baseDescItem2.updateShow(desc, title);
        }

        private onClick(): void {
            let proxy: XianjianProxy = this.retProxy(ProxyType.Xianjian);
            let next: number = proxy.getNextStage(this._showArgs.index);
            let count: number = proxy.getCountByStage(this._showArgs.index, next);
            if (count >= 4) {
                proxy.c2s_fly_sword_operation(this._showArgs.index, 3);
            } else {
                PromptBox.getIns().show(getLanById(LanDef.general3));
            }
        }
    }
}