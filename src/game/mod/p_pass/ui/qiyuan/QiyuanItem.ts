namespace game.mod.pass {

    export class QiyuanItem extends eui.ItemRenderer {

        public progress: eui.Image;
        public progressbar: eui.Image;
        public lab_step:eui.Label;
        public btn: QiyuanItemBtn;

        private _isFinish: boolean = false;
        private _isInStep: boolean = false;       // 已达到闯关条件
        
        constructor() {
            super();
            this.skinName = "skins.pass.QiyuanItemSkin";
        }

        public get isFinish(): boolean {
            return this._isFinish;
        }

        public set isFinish(value: boolean) {
            this._isFinish = value;
            this.btn.isFinish = value;
        }

        public get isInStep(): boolean {
            return this._isInStep;
        }
        
        protected dataChanged(): void {
            super.dataChanged();

            let qyData: IPassQiyuanData = this.data;
            if(!qyData) {
                return;
            }
            this.lab_step.text = qyData.cfg.limit + "";

            this.currentState = "state" + qyData.state;
            this.isFinish = qyData.isFinish;
            this._isInStep = qyData.isInStep;
            this.progressbar.visible = qyData.isInStep;

            this.btn.setData(qyData);
        }

    }
}