namespace game.mod.shenling {


    export class ShenlingLingliSkillDescComp extends eui.Component {
        public img_icon: eui.Image;
        public img_icongray: eui.Image;
        public gr_lv: eui.Group;
        public lb_lv: eui.Label;
        public lb_name: eui.Label;
        public lb_desc: eui.Label;
        public img_tag: eui.Image;

        private _proxy: ShenlingLingliProxy;

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenlingLingliSkillDescCompSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingli);
        }

        /**
         * @param type
         * @param idx 序号
         */
        public updateView(type: ShenLingType, idx: number): void {
            let data = this._proxy.getSkillData(type, idx);
            let lv = data ? data.level : 1;
            let lingliCfg = this._proxy.getConfig(type, lv);
            if (!lingliCfg) {
                return;
            }
            let isMain = idx == LingliMainSkillIdx;
            let index = isMain ? lingliCfg.main_skill : lingliCfg.buff_skills[idx - 1];
            let cfg: any;
            if (isMain) {
                cfg = getConfigByNameId(ConfigName.Skill, index);
            } else {
                cfg = getConfigByNameId(ConfigName.Buff, index);
            }
            if (!cfg) {
                DEBUG && console.error(`技能表或buff表，没有 ${index}`);
                return;
            }
            this.img_icon.source = cfg.icon;
            let quality = isMain ? cfg.quality : cfg.buff_quality;
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(quality)));

            let isActed = data && data.level > 0;
            let desc = isMain ? cfg.describe : cfg.des;
            this.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(desc, isActed ? WhiteColor.DEFAULT : WhiteColor.GRAY));

            this.img_icongray.visible = !isActed;
            this.gr_lv.visible = isActed;
            this.lb_lv.text = `LV.${data && data.level || 0}`;
            this.img_tag.source = isMain ? 'zhudonglingli' : 'beidonglingli';
        }
    }
}