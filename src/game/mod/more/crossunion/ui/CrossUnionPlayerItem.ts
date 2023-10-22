namespace game.mod.more {

    import teammate = msg.teammate;
    import TouchEvent = egret.TouchEvent;

    export class CrossUnionPlayerItem extends BaseRenderer {

        private lab_name: eui.Label;
        private grp_eft: eui.Group;
        private title: CrossUnionTeamTitle;

        // private _proxy: CrossUnionProxy;
        private _idx: number;

        public data: teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
            // this._proxy = getProxy(ModName.More, ProxyType.CrossUnion);
        }

        protected dataChanged(): void {
            this._idx = this.itemIndex + 1;
            if (!this.data) {
                this.removeAllEffects();

                this.currentState = "1";
            } else {
                this.currentState = "2";

                this.updateRankUIRole(this.grp_eft, this.data, 0.5);
                this.lab_name.text = this.data.name;
            }
            this.title.visible = this.itemIndex < 4;
            if (this.title.visible) {
                this.title.setData(this._idx);
            }
        }

    }
}