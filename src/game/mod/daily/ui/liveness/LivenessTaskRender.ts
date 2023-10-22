namespace game.mod.daily {

    export class LivenessTaskRender extends TaskRender {
        protected onClickDraw() {
            TaskUtil.clickTask(this.data, this.btn_go);
        }
    }
}