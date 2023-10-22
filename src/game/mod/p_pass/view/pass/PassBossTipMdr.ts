namespace game.mod.pass {

    import Tween = base.Tween;
    import Handler = base.Handler;

    export class PassBossTipMdr extends EffectMdrBase {
        private _view: PassBossTipView = this.mark("_view", PassBossTipView);

        constructor() {
            super(Layer.main);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            let self= this;
            this.addEftByParent(UIEftSrc.BossComing, this._view.group_eft,0,0,0,Handler.alloc(this,function () {
                self.closeUI();
            }),1);
            this._view.group_eft.scaleX = 1.33;
            this._view.group_eft.scaleY = 1.33;

           this.updateData();
        }

        protected onHide(): void {
            super.onHide();
        }
        
        protected updateData() {
            //this._view.group_eft.x = 360;
            this._view.group_eft.x = 720;
            Tween.remove(this._view.group_eft);
            Tween.get(this._view.group_eft)
            //.delay(200)
            .to({x: 360}, 500)
            //.delay(500)
            .exec(Handler.alloc(this, this.over));
        }
        
        private over(): void {
            Tween.remove(this._view.group_eft);
        }

        closeUI():void{
            let handler: Handler = this._showArgs && this._showArgs.handler
            if(handler) {
                handler.exec();
            }
            this.hide();
        }

    }
}