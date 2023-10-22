namespace game.mod.activity {

    export class YjjsDayItem extends BaseListenerRenderer {
        public img_day: eui.Image;
        public lb_progress: eui.Label;
        public redPoint: eui.Image;

        data: IYjjsDayItemData;

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsDayItemSkin`;
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
            this.img_day.source = `tian${data.day}`;
            if (data.unlock) {
                this.lb_progress.text = `${data.val}/${data.max}`;
            } else {
                this.lb_progress.text = `未解锁`;
            }
            this.redPoint.visible = !!data.hint;
        }
    }

    export interface IYjjsDayItemData {
        hint: boolean;
        unlock: boolean;
        day: number;
        val: number;
        max: number;
        sel: boolean;
    }
}