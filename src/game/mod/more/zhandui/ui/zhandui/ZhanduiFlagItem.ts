namespace game.mod.more {

    import ZhanduiQizhiConfig = game.config.ZhanduiQizhiConfig;
    import LanDef = game.localization.LanDef;

    export class ZhanduiFlagItem extends IconSel {
        public img_sel: eui.Image;
        public redPoint: eui.Image;
        public img_tag: eui.Image;
        public img_gray: eui.Image;
        public lb_cond: eui.Label;
        public img_flag: eui.Image;

        data: IZhanduiFlagItemData;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_tag.visible = data.type == 2;
            let notAct = data.type == 0;
            this.img_gray.visible = notAct;
            if (notAct && data.cfg.cond) {
                this.lb_cond.visible = true;
                this.lb_cond.text = StringUtil.substitute(getLanById(LanDef.medal_cond0), [data.cfg.cond]);
            } else {
                this.lb_cond.visible = false;
            }

            if (this.img_flag)
                this.img_flag.source = ResUtil.getZhanduiFlag(data.cfg.index);
        }
    }

    export interface IZhanduiFlagItemData {
        type: number;//0未激活，1已激活，2当前使用中
        cfg: ZhanduiQizhiConfig;
    }
}