namespace game.mod.store {

    import TimeMgr = base.TimeMgr;

    export class StoreType4Mdr extends StoreType3Mdr {
        protected _type = DirectShopType.Weekly;//对应配置表类型，3每日，4每周

        protected onInit() {
            super.onInit();
            this._view.img_bg.source = ResUtil.getUiPng('meizhoushangchengguanggaotu');
        }

        //下周一0点
        protected getEndTime(): number {
            let time = TimeMgr.time.serverTime;
            let date = new Date(time);
            let day = date.getDay();
            if (day == 0) {
                day = 7;
            }
            let leftDay = 7 - day + 1;//间隔天数
            return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, leftDay);
        }
    }

}