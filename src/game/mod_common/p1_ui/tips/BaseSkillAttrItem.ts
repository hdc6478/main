namespace game.mod {

    import PropConfig = game.config.PropConfig;

    /**
     * 通用属性组件
     */
    export class BaseSkillAttrItem extends eui.ItemRenderer {
        public lb_name: eui.Label;
        public lb_val: eui.Label;
        public icon: eui.Image;
        public data: string[];//已经转换好的文本

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.lb_name.textFlow = TextUtil.parseHtml(this.data[0]);

            let arr: string[] = this.data[1].split(",");
            this.currentState = `${arr.length}`;
            if (arr.length > 1) {
                let cfg: PropConfig = GameConfig.getPropConfigById(arr[0]);
                this.icon.source = cfg.icon || "";
            }
            this.lb_val.textFlow = TextUtil.parseHtml(arr[arr.length - 1]);
        }
    }
}