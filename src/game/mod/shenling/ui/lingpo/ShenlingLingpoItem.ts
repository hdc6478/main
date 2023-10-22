namespace game.mod.shenling {

    import ShenlingLingpoTypeConfig = game.config.ShenlingLingpoTypeConfig;

    export class ShenlingLingpoItem extends BaseRenderer {
        public avatarBaseItem: game.mod.AvatarBaseItem;
        public redPoint: eui.Image;
        public lb_progress: eui.Label;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public img_gray: eui.Image;
        public gr_eft: eui.Group;

        data: IShenlingLingpoItemData;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenlingLingpoItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.avatarBaseItem.updateShow(data.cfg);
            this.redPoint.visible = !!data.hint;

            this.img_gray.visible = !data.isActed;
            this.gr_lv.visible = data.progress >= LingPoMaxCnt;
            this.lb_num.text = data.lv + '';

            this.lb_progress.visible = !this.gr_lv.visible;
            this.lb_progress.text = `(${data.progress}/${LingPoMaxCnt})`;

            this.removeEft();
            if (data.isSel) {
                this.addEftByParent(UIEftSrc.SurfaceSel, this.gr_eft);
            }
        }
    }

    export interface IShenlingLingpoItemData {
        isActed: boolean;
        cfg: ShenlingLingpoTypeConfig;
        hint: boolean;
        lv: number;
        progress: number;//进度
        isSel: boolean;
    }
}