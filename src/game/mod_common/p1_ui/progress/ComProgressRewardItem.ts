namespace game.mod {

    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;

    export class ComProgressRewardItem extends BaseRenderer {

        private btn_box: Btn;
        private lab_value: eui.Label;
        private img_got: eui.Image;
        private redPoint: eui.Image;

        public data: ComRewardData;

        constructor() {
            super();
            this.skinName = "skins.common.ComProgressRewardItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage(); //
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClickBtn, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            let state: ComRewardState = this.data.state;
            if (!this.data.index) {
                this.img_got.visible = false;

                this.btn_box.icon = state == ComRewardState.Done ? "box_open" : "box_close";
            } else {
                let index: number = this.data.index;
                if (index > BOX_ASSETS_COUNT) {
                    index = BOX_ASSETS_COUNT;
                }
                this.currentState = `${index}`;
                this.img_got.visible = state == ComRewardState.Done;
            }
            this.lab_value.text = `${this.data.count}`;
            this.redPoint.visible = state == ComRewardState.Reward;
        }

        private onClickBtn(): void {
            let state: ComRewardState = this.data.state;
            if (!state) {
                ViewMgr.getIns().showBoxReward(this.data.content || "", this.data.rewards);
                return;
            }
            if (state == 1 && this.data.handler) {
                this.data.handler.exec();
            }
        }

        setData(data: ComRewardData) {
            this.data = data;
        }
    }

    export interface ComRewardData {
        /**index改变currentState 宝箱资源显示 !index使用另一套资源 */
        index?: number;
        /**次数 */
        count: number;
        /**0不可领取 1可领取 2已领取 */
        state: ComRewardState;
        /**奖励预览 */
        rewards: number[][];
        /**领取回调 */
        handler: Handler;
        /**奖励预览文本 */
        content?: string;
    }

    /**0不可领取 1可领取 2已领取 */
    export const enum ComRewardState {
        NotReward = 0,
        Reward = 1,
        Done = 2
    }

    /**ComRewardSkin 宽度 */
    export const ITEM_WIDTH: number = 136;

    export const BOX_ASSETS_COUNT: number = 5;
}