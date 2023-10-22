namespace game.mod.yishou {

    import facade = base.facade;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import LanDef = game.localization.LanDef;

    export class YishouShouguSkillComp extends eui.Component {
        public img_skill: eui.Image;
        public lb_cond: eui.Label;
        public img_type: eui.Image;
        public gr_font: eui.Group;
        public gr_eft: eui.Group;

        private _proxy: YishouProxy;
        private _type: YishouType;
        private _hub: UIEftHub;
        private _skillEftId: number;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguSkillCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.img_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
            if (!this._hub) {
                this._hub = new UIEftHub(this);
            }
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.img_skill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
            if (this._hub) {
                this._hub.removeAllEffects();
            }
        }

        /**更新技能进阶*/
        public updateSkillView(type: YishouType): void {
            this._type = type;
            let typeCfg = this._proxy.getYishoucfg(type);
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, typeCfg.skill);
            this.img_skill.source = skillCfg && skillCfg.icon || '';

            let curStage = this._proxy.getCurStage(type);

            this.img_type.source = `yishou_type_name${type}`;
            this._hub.addBmpFont(curStage + getLanById(LanDef.tishi_43), BmpTextCfg[BmpTextType.CommonStage1], this.gr_font, true, 1, false, 0, true);

            this.addSkillEft();

            //满阶
            if (this._proxy.isMaxStage(type)) {
                this.lb_cond.text = '';
                return;
            }

            let cond = this._proxy.getStageCondition(type, curStage + 1);
            let satisfyCnt = this._proxy.getStageSatisfyCnt(type);//满足条件个数
            let qualityName = ColorUtil.getColorChineseStrByQua2(cond[1]);
            let totalCnt = cond[3];
            let color = satisfyCnt >= totalCnt ? WhiteColor.GREEN : WhiteColor.RED;
            let str = StringUtil.substitute(getLanById(LanDef.yishou_tips18), [`${qualityName}色${cond[2]}星`, typeCfg.type_name]);
            this.lb_cond.textFlow = TextUtil.parseHtml(getLanById(LanDef.yishou_tips17) + ': '
                + TextUtil.addColor(str, WhiteColor.YELLOW)
                + TextUtil.addColor(`(${satisfyCnt}/${totalCnt})`, color));
        }

        private onClickSkill(): void {
            facade.showView(ModName.Yishou, YiShouViewType.ShouguSkillTips, this._type);
        }

        private addSkillEft(): void {
            let curStage = this._proxy.getCurStage(this._type);
            this.removeSkillEft();
            if (curStage < 1) {
                return;
            }
            this._skillEftId = this._hub.add(UIEftSrc.Yishoujineng, 0, 0, null, 0, this.gr_eft, -1);
        }

        private removeSkillEft(): void {
            if (this._skillEftId) {
                this._hub.removeEffect(this._skillEftId);
            }
        }
    }
}