namespace game.mod.activity {

    import GameNT = base.GameNT;
    import s2c_cheap_gift_info = msg.s2c_cheap_gift_info;
    import TimeMgr = base.TimeMgr;

    /**
     * @description 特惠礼包&特惠进阶
     */
    export class TehuiLibaoProxy extends ProxyBase {
        private _model: TehuiLibaoModel;

        initialize(): void {
            super.initialize();
            this._model = new TehuiLibaoModel();
            this.onProto(s2c_cheap_gift_info, this.s2c_cheap_gift_info, this);
        }

        private s2c_cheap_gift_info(n: GameNT): void {
            let msg: s2c_cheap_gift_info = n.body;
            if (!msg) {
                return;
            }
            this._model.infos[msg.type] = msg.index;
            this.onUpdateOpen(msg.type);
            this.checkTimeOpen(msg.type);
            this.sendNt(ActivityEvent.ON_UPDATE_TEHUI_LIBAO_INFO);
        }

        public isOpen(type: number): boolean {
            let openIdx: number = this._model.openIdxs[type];
            if (!ViewMgr.getIns().checkViewOpen(openIdx)) {
                return false;
            }
            if (!this.getInfo(type)) {
                return false;
            }
            return true;
        }

        private onUpdateOpen(type: number): void {
            let isOpen = this.isOpen(type);
            let btnIdx = this._model.btnIdxs[type];
            BtnIconMgr.insChaozhilibao().updateOpen(btnIdx, isOpen, null, true);
        }

        public getInfo(type: number): number {
            return this._model.infos[type];
        }

        public getEndTime(): number {
            return TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
        }

        private checkTimeOpen(type: number): void {
            if (type !== TehuiType.TehuiLibao) {
                return;
            }
            if (!this._model.tehuiTime) {
                this._model.tehuiTime = TimeMgr.time.serverTimeSecond;
                return;
            }
            const date1 = new Date(this._model.tehuiTime * 1000);
            const date2 = new Date(TimeMgr.time.serverTimeSecond * 1000);
            if (date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()) {
            } else {
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TehuiLibao, TehuiType.TehuiLibao);
            }
            this._model.tehuiTime = TimeMgr.time.serverTimeSecond
        }


        protected onOpenFuncUpdate(n: GameNT) {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.TehuiLibao) > -1) {
                this.onUpdateOpen(TehuiType.TehuiLibao);
            }
            if (addIdx.indexOf(OpenIdx.JinjieTehui) > -1) {
                this.onUpdateOpen(TehuiType.JinjieTehui);
            }
        }
    }
}