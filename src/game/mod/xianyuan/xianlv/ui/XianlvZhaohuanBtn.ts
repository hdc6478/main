namespace game.mod.xianyuan {

    export class XianlvZhaohuanBtn extends eui.Component {
        public lb_progress: eui.Label;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvZhaohuanBtnSkin";
        }

        public updateView(val: number, maxVal: number): void {
            let progress = val / maxVal;
            if (progress >= 1) {
                progress = 1;
            }
            this.lb_progress.text = Math.floor(progress * 100) + '%';
        }

        public setHint(hint = false): void {
            this.redPoint.visible = hint;
        }
    }

}