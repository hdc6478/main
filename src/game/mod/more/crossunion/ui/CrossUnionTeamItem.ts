namespace game.mod.more {

    export class CrossUnionTeamItem extends BaseRenderer {

        private lab_cnt: eui.Label;
        private powerLab: PowerLabel;
        private title: CrossUnionTeamTitle;

        // private _proxy: CrossUnionProxy;
        private _idx: number;
        public data: { team_index: number, power: number, count: number };

        protected onAddToStage(): void {
            super.onAddToStage();
            // this._proxy = getProxy(ModName.More, ProxyType.CrossUnion);
        }

        protected dataChanged(): void {
            this._idx = this.itemIndex + 1;
            this.title.setData(this._idx);

            this.lab_cnt.text = `${this.data.count}`;
            this.powerLab.setPowerValue(this.data.power);
        }

    }
}