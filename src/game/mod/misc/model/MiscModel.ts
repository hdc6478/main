namespace game.mod.misc {
    export class MiscModel {
        public gameInit: boolean;

        public lastSyncTick: number;

        public gameSetting: object = null;

        public isGou: boolean = false;//分享兑换取消红点

        public setSetting(key: string, val: string) {
            if (null == this.gameSetting) {
                this.gameSetting = {};
            }
            this.gameSetting[key] = val;
        }

        private _adCnt: number = 0;
        public get adCnt(): number {
            return this._adCnt;
        }

        public setAdCnt(v: number): void {
            this._adCnt = v;
        }
    }
}
