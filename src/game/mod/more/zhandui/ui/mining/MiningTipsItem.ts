namespace game.mod.more {

    import zhandui_zhanbao_data = msg.zhandui_zhanbao_data;
    import HelotTextConfig = game.config.HelotTextConfig;

    export class MiningTipsItem extends BaseRenderer {

        private lab: eui.Label;
        public data: zhandui_zhanbao_data;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg: HelotTextConfig = getConfigByNameId(ConfigName.HelotText, this.data.index);
            this.lab.textFlow = TextUtil.parseHtml(StringUtil.substitute(cfg.text, [this.data.one_name, this.data.two_name]));
        }
    }
}