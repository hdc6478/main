namespace game.mod.union {


    import GuildStudyConfig = game.config.GuildStudyConfig;

    export class UnionBookItem extends BaseRenderer {

        private _proxy: UnionProxy;

        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public img_quality: eui.Image;
        public lab_level: eui.Label;
        public lab_name: eui.Label;
        public redPoint: eui.Image;
        public name_item: AvatarNameItem;
        public grp_open: eui.Group;
        public lab_open: eui.Label;

        public data: GuildStudyConfig;

        protected onAddToStage(): void {
            this._proxy = getProxy(ModName.Union, ProxyType.Union);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data;
            let info = this._proxy.getBookInfo(cfg.index);
            // let level: number = info && info.level || 0;
            let stage: number = info && info.stage || 0;
            this.img_lock.visible = stage == 0;
            this.lab_level.text = `${stage}`;
            this.lab_name.text = `${cfg.name}`;
            this.img_icon.source = `book_${cfg.index}`;
            this.img_quality.source = `xf_quality_rect_${cfg.quality}`;

            let root: string[] = this._proxy.getBookRoots(cfg.index);
            this.redPoint.visible = HintMgr.getHint(root);


            if (cfg.activate_condition > this._proxy.union_level) {
                this.grp_open.visible = true;
                this.lab_open.text = `仙宗${cfg.activate_condition}级`;
            } else {
                this.grp_open.visible = false;
            }
        }

    }
}