namespace game.mod.surface {

    import facade = base.facade;
    import JianzhenConfig = game.config.JianzhenConfig;
    import XianjianConfig = game.config.XianjianConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import TouchEvent = egret.TouchEvent;

    export class XianjianGroupItem extends BaseRenderer {

        private _proxy: XianjianProxy;

        private btn_add: Btn;
        private btn_exchange: Btn;
        private lab_lock: eui.Label;
        private lab_tips: eui.Label;
        private lab_name: eui.Label;
        private lab_limit: eui.Label;
        private lab_jump: eui.Label;
        private grp_eff: eui.Group;

        public data: JianzhenConfig;

        protected onAddToStage(): void {
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Xianjian);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_exchange, this.onClickAdd, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_jump, this.onClickVip, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            // default lock action
            // this.currentState = "";
            this.removeAllEffects();

            if (this.data.unlock_type == 1) {
                let mine: number = VipUtil.getShowVipLv();
                let limit: number = VipUtil.getShowVipLv(this.data.unlock_value);
                let lock: boolean = mine < limit;
                if (limit && lock) {
                    this.currentState = "lock";
                    this.lab_lock.text = `VIP${limit}解锁`;
                    this.lab_limit.text = "VIP开启剑阵槽位";
                    this.lab_jump.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("立即前往", WhiteColor.GREEN));
                    return;
                }
            } else if (this.data.unlock_type == 2) {
                let lock = !ViewMgr.getIns().checkPass(this.data.unlock_value);
                if (this.data.unlock_value && lock) {
                    this.currentState = "lock";
                    this.lab_lock.text = `关卡${this.data.unlock_value}解锁`;
                    this.lab_limit.text = "关卡解锁剑阵槽位";
                    this.lab_jump.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("立即前往", WhiteColor.GREEN));
                    return;
                }
            }

            let info = this._proxy.getShangzhen(this.data.pos);
            if (!info || !info.index) {
                this.currentState = "default";
            } else {
                this.currentState = "action";

                let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, info.index);
                this.addAnimate(cfg.index, this.grp_eff);

                let skill: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, cfg.skill);
                this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
                this.lab_tips.textFlow = TextUtil.parseHtml(skill.describe);
            }
        }

        private onClickAdd(): void {
            if (this._proxy.countOfActive <= 0) {
                PromptBox.getIns().show("没有激活的仙剑");
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Surface, SurfaceViewType.XianjianChoose, this.data.pos);
        }

        private onClickVip(): void {
            if (this.data.unlock_type == 2) {
                ViewMgr.getIns().showSecondPop(ModName.Pass, PassViewType.PassMain);
                return;
            }
            if (PayUtil.checkFirstCharge()) {
                ViewMgr.getIns().openVipView();
            } else {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
            }
        }
    }

}