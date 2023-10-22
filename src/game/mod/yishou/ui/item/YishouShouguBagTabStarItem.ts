namespace game.mod.yishou {

    import LanDef = game.localization.LanDef;

    export class YishouShouguBagTabStarItem extends BaseListenerRenderer {
        public redPoint: eui.Image;
        public lab_name: eui.Label;

        data: IYishouShouguBagTabStarItemData;

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
            this.lab_name.text = data.star + getLanById(LanDef.soul2);
            this.redPoint.visible = !!data.showHint;
        }
    }

    export interface IYishouShouguBagTabStarItemData {
        star: number;//星级
        showHint: boolean;
    }
}