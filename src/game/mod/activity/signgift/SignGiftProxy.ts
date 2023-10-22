namespace game.mod.activity {

    import c2s_sign = msg.c2s_sign;
    import GameNT = base.GameNT;
    import s2c_sign_info = msg.s2c_sign_info;

    /**
     * @description 签到有礼系统
     */
    export class SignGiftProxy extends ProxyBase {
        private _model: SignGiftModel;

        public get model(): SignGiftModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new SignGiftModel();
            this.onProto(s2c_sign_info, this.s2c_sign_info, this);
        }

        /** 签到 */
        public c2s_sign(index: number): void {
            let msg = new c2s_sign();
            msg.index = index;
            this.sendProto(msg);
        }

        /** 签到信息 */
        private s2c_sign_info(n: GameNT): void {
            let msg = n.body as s2c_sign_info;

            //签到完当前所有奖励，跨天后重置签到
            if (msg.index == 1) {
                this._model.list = [];
            }
            this._model.list = msg.list != null ? msg.list : [];

            if (msg.index != null) {
                this._model.index = msg.index;
            }
            if (msg.count != null) {
                this._model.count = msg.count;
            }
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_SIGN_GIFT_INFO);
        }

        /**是否已签到*/
        public isSigned(index: number): boolean {
            return this._model.list.indexOf(index) > -1;
        }

        public getHint(): boolean {
            return this._model.index > 0;
        }

        public updateHint(): void {
            HintMgr.setHint(this.getHint(), [ModName.Activity, MainActivityViewType.SignGift]);
        }
    }
}