namespace game.mod.activity {


    export class ZcxMdr6 extends ZcxMdr5 {
        protected _gameOrderType = GameOrderType.Zhizunlicai;


        protected onUpdateView() {
            super.onUpdateView();

            let time = this._proxy.getValueByType(this._gameOrderType);
            let timeStr: string;
            if (time >= Second.Day) {
                timeStr = TimeUtil.formatSecond(time, 'd天H时');
            } else {
                timeStr = TimeUtil.formatSecond(time, 'H时m分');
            }
            let str = GameOrderTypeStr[this._gameOrderType] + TextUtil.addColor(timeStr, BlackColor.GREEN);
            this._view.lab_cur.textFlow = TextUtil.parseHtml(str);
        }
    }

}