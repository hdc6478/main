namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XiandiInfoItem extends BaseRenderer {

        private grp_eft: eui.Group;
        private lab_name: eui.Label;
        private lab_power: eui.Label;
        private img_nobody: eui.Image;
        // private img_title: eui.Image;
        private grp_info: eui.Group;

        // private _proxy: XiandiProxy;
        public data: msg.teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            // if (!this.data) {
            //     this.grp_info.visible = false;
            //     return;
            // }
            let info = this.data;
            this.lab_name.text = info && info.name || getLanById(LanDef.tishi_2);
            this.lab_power.text = `${info && info.showpower && info.showpower.toNumber() || 0}`;

            this.img_nobody.visible = !info;
            if (info) {
                this.updateRankUIRole(this.grp_eft, info, 0.8);
            }
        }

        public setData(data: msg.teammate): void {
            this.data = data;
        }
    }
}
