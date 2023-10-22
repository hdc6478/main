namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XiandiItem extends BaseRenderer {

        private grp_eft: eui.Group;
        private lab_name: eui.Label;
        private lab_score: eui.Label;
        private img_rank: eui.Image;
        private img_nobody: eui.Image;

        // private _proxy: XiandiProxy;
        private _eft: number;
        private _index: number;
        public data: msg.teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            // if (!this.data) {
            //     return;
            // }
            let info = this.data;
            this.lab_name.text = info && info.name || getLanById(LanDef.tishi_2);
            if (this.data) {
                this.updateRankUIRole(this.grp_eft, this.data, 0.6);
            }
            this.img_nobody.visible = !this.data;
            // this.img_rank.visible = info && info.rank_num > 0;
            // if (this.img_rank.visible) {
            // }
            this.img_rank.source = `rank${this._index}`;
            this.lab_score.text = `${info && info.value || 0}`;
        }

        public setData(data: msg.teammate, index: number): void {
            this._index = index;
            this.data = data;
        }
    }
}
