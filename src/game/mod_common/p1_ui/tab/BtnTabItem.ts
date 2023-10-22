namespace game.mod {

    export class BtnTabItem extends BaseRenderer {
        public lab: eui.Label;
        public redPoint: eui.Image;

        public data: BtnTabItemData;

        public setData(data: BtnTabItemData): void {
            this.data = data;
            this.dataChanged();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab.text = data.name;
            this.redPoint.visible = !!this.data.showHint;
        }
    }
}
