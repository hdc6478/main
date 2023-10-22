namespace game.mod.more {

    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;

    export class ZhanduiCreateItem extends IconSel {
        public img_flag: eui.Image;

        data: ZhanduiQizhiConfig;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_flag.source = ResUtil.getZhanduiFlag(data.index);
        }
    }
}