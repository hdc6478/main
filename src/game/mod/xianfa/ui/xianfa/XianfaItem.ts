namespace game.mod.xianfa {

    import skill_item = msg.skill_item;
    import XianfaSkillInitConfig = game.config.XianfaSkillInitConfig;
    import facade = base.facade;
    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class XianfaItem extends eui.Component {

        public img_quality_bg: eui.Image;
        public img_skill: eui.Image;
        public img_is_wear: eui.Image;
        public img_buff: eui.Image;
        public grp_eff: eui.Group;
        public img_add: eui.Image;
        public redPoint: eui.Image;

        public lab_lv: eui.Label;
        public lab_name: eui.Label;

        private _proxy: XianfaProxy;
        private _model: XianfaModel;
        public pos: number;         // 1~6

        public data: IXianfaSkillData;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaItemSkin";
            this.redPoint.visible = false;

            this._proxy = facade.retMod(ModName.Xianfa).retProxy(ProxyType.Xianfa);
            this._model = this._proxy.getModel();
            this.data = { cfg: null, info: null };
        }

        /**
         * @param value 0-add，1-normal，2-normal2，3-normal3，4-normal4
         */
        public setData(cfg: XianfaSkillInitConfig, info: skill_item, state: number = 1): void {
            this.data.cfg = cfg;
            this.data.info = info;
            this.state = state;

            if (!this.data.cfg) {
                return;
            }
            this.img_quality_bg.source = "xf_quality_circle_" + this.data.cfg.skill_quality;
            this.img_buff.source = (this.data.cfg.skill_heading > 0) ? "xf_buff_" + this.data.cfg.skill_heading : null;
            this.lab_name.text = this._model.getXianfaShortName(this.data.cfg);

            let skillId = this.data.cfg.index;
            let skillCfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            this.img_skill.source = skillCfg.icon;
            this.lab_lv.text = `${this.data.info && this.data.info.lv || 0}级`;
        }

        private set state(value: number) {
            if (value == 0) {
                this.currentState = "add";
            } else {
                this.currentState = "normal" + value;
            }
        }

        public get isWear(): boolean {
            return !!this.data.info;
        }

    }
}