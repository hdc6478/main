namespace game.mod.activity {


    export class ZcxMdr5 extends GameOrderMdr {
        protected _gameOrderType = GameOrderType.Chaojilicai;

        protected onUpdateView() {
            super.onUpdateView();

            let isAllDraw = this._proxy.isRewardAllDraw(this._gameOrderType);
            if (isAllDraw) {
                this._view.btn.label = GameOrderTypeBtnStr[this._gameOrderType];
            }
        }
    }

}