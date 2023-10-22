namespace game.mod.more {

    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;

    export class XujieTansuoAreaItem extends BaseRenderer {
        public img_bg: eui.Image;
        public lb_name: eui.Label;
        public gr_num: eui.Group;
        public img_gray: eui.Image;

        data: IXujieTansuoAreaItemData;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoAreaItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_bg.source = `xjts_area_icon_` + data.cfg.type;
            this.lb_name.text = data.cfg.name;
            this.img_gray.visible = !data.isActed;
            if (data.isActed && data.progress != null) {
                let progressStr = Math.floor(data.progress) + '%';
                this.addBmpFont(progressStr, BmpTextCfg[BmpTextType.CommonStage], this.gr_num, true, 0.7, true, -3);
            } else {
                this.clearFont(this.gr_num);
            }
        }
    }

    export interface IXujieTansuoAreaItemData {
        cfg: ZhanduiTansuoTypeConfig;
        progress: number;
        isActed: boolean;
    }
}