namespace game.mod.union {

    import facade = base.facade;

    export class UnionTreasureRewardItem extends BaseRenderer {

        private lab: eui.Label;
        private progress: ProgressBarComp;

        private _proxy: UnionProxy;
        public data: UnionTreasureRewardData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.lab.textFlow = TextUtil.parseHtml(this.data.str);

            this.progress.show(this.data.value, this.data.target, false);
        }

    }

    export interface UnionTreasureRewardData {
        str: string;
        value: number;
        target: number;
    }
}