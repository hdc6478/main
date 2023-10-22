namespace game.mod.shenling {

    import LanDef = game.localization.LanDef;

    export class ShenlingLingliSkillIcon extends BaseListenerRenderer {
        public img_main: eui.Image;
        public img_icon: eui.Image;
        public lb_lv: eui.Label;
        public img_tag: eui.Image;
        public img_gray: eui.Image;
        public img_sel: eui.Image;
        public redPoint: eui.Image;
        public img_gray1: eui.Image;

        data: ILingliSkillIconData;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenlingLingliSkillIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_main.visible = false;
            this.img_sel.visible = false;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_gray.visible = data.isMain && !data.lv;
            this.img_gray1.visible = !data.isMain && !data.lv;
            this.redPoint.visible = !!data.hint;
            let txt: string;
            if (data.isMaxLv) {
                txt = TextUtil.addColor(getLanById(LanDef.manji), WhiteColor.RED);
            } else if (data.lv) {
                txt = `LV.${data.lv}`;
            } else {
                txt = getLanById(LanDef.not_active);
            }
            this.lb_lv.textFlow = TextUtil.parseHtml(txt);

            let cfg: any;//BattleSkillConfig, BuffConfig
            if (data.isMain) {
                cfg = getConfigByNameId(ConfigName.Skill, data.index);
            } else {
                cfg = getConfigByNameId(ConfigName.Buff, data.index);
            }
            if (!cfg) {
                DEBUG && console.error(`battle_skill.json 或 buff.json 没有 ${data.index}`);
            }
            this.img_icon.source = cfg ? cfg.icon : '';
            this.img_tag.source = cfg && cfg.logo ? cfg.logo : '';

            this.img_main.visible = data.isMain;
        }

        public setSel(isSel = false): void {
            this.img_sel.visible = isSel;
        }

        public isSeled(): boolean {
            return this.img_sel.visible;
        }
    }

    export interface ILingliSkillIconData {
        type: ShenLingType;
        index: number;//技能或者buff的index
        idx: number;//序号，主动技能是999
        lv: number;
        isMaxLv: boolean;//满级否
        hint: boolean;
        isMain?: boolean;
    }
}