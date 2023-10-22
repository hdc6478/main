namespace game.mod.activity {

    export class YjjsItem7 extends BaseListenerRenderer {

        data: any;

        constructor() {
            super();
            this.skinName = ``;
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
        }
    }
}