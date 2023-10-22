namespace game.mod.more {


    import PropConfig = game.config.PropConfig;

    export class ArtifactBuweiItem extends BaseRenderer {

        private img_icon: eui.Image;
        private lab_level: eui.Label;
        private lab_act: eui.Label;
        private redPoint: eui.Image;

        private _proxy: SkyPalaceProxy;
        public data: ArtifactBuweiData;

        protected onAddToStage(): void {
            this._proxy = getProxy(ModName.More, ProxyType.SkyPalace);
        }

        protected onRemoveFromStage(): void {
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let cost: number[] = this._proxy.getBuweiCost(this.data.index, this.data.pos);
            let prop: PropData = PropData.create(cost[0]);
            let cfg: PropConfig = prop.cfg;
            this.img_icon.source = cfg.icon;

            let lv: number = this._proxy.getBuweiLevel(this.data.index, this.data.pos);
            this.currentState = !lv ? "lock" : "default";
            this.lab_level.text = `${lv}`;

            if (!this.data.setHint) {
                this.redPoint.visible = false;
                return;
            }
            let next: number[] = this._proxy.getBuweiNextCost(this.data.index, this.data.pos);
            if (next && next.length) {
                this.redPoint.visible = BagUtil.checkPropCnt(next[0], next[1]);
            } else {
                this.redPoint.visible = false;
            }
        }

        public setData(data: ArtifactBuweiData): void {
            this.data = data;
        }
    }
}