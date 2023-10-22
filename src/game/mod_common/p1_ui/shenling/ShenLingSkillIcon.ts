namespace game.mod {

    import BattleSkillConfig = game.config.BattleSkillConfig;

    export class ShenLingSkillIcon extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public img_quality: eui.Image;
        public img_icon: eui.Image;
        public gr_lb: eui.Group;
        public lb_num: eui.Label;
        public img_gray: eui.Image;
        public redPoint: eui.Image;
        public img_ji: eui.Image;

        data: ISLSkillIconData;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenLingSkillIcon`;
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                this.defaultIcon();
                return;
            }
            this.img_gray.visible = !data.is_act;
            this.setHint(!!data.hint);
            let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, data.skill_index);
            if (!cfg) {
                this.defaultIcon();
                return;
            }

            this.setIcon(cfg.icon);
            this.img_bg.source = 'tianfukuang';
            if (!data.skill_type || data.skill_type == SLSkillType.LingBao || data.skill_type == SLSkillType.Talent) {
                this.gr_lb.visible = false;
                return;
            }
            if (data.skill_type == SLSkillType.HeJi) {
                this.setLabel(data.lv ? data.lv + '' : '');
            } else if (data.skill_type == SLSkillType.PuGong) {
                this.gr_lb.visible = this.img_ji.visible = true;
                this.lb_num.text = '';
                this.img_bg.source = 'jinengkuang';
            }
        }

        protected defaultIcon(): void {
            this.img_gray.visible = true;
            this.gr_lb.visible = false;
            this.setIcon();
            this.setHint(false);
        }

        public setIcon(src: string = '') {
            this.img_icon.source = src;
        }

        public setLabel(str: string = '') {
            this.gr_lb.visible = !!str;
            this.lb_num.textFlow = TextUtil.parseHtml(str);
            this.img_ji.visible = false;
        }

        public setHint(hint = false): void {
            this.redPoint.visible = hint;
        }

        /**改变技能底框*/
        public setBg(src: string = 'tianfukuang'): void {
            this.img_bg.source = src;
        }
    }

    /**拥有点击缩放效果的技能icon*/
    export class ShenLingSkillIconTap extends BaseListenerRenderer {
        public skill_icon: game.mod.ShenLingSkillIcon;

        data: ISLSkillIconData;

        protected dataChanged() {
            this.skill_icon.data = this.data;
        }
    }

}