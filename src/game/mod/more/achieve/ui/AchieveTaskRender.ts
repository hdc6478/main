namespace game.mod.more {

    export class AchieveTaskRender extends TaskRenderIcon {
        protected onClickDraw(): void {
            TaskUtil.clickTask(this.data, this.btn_go);
        }
    }
}