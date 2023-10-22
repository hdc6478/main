namespace game.mod.activity {

    import GameNT = base.GameNT;
    import c2s_xianlv_libao = msg.c2s_xianlv_libao;
    import s2c_xianlv_libao = msg.s2c_xianlv_libao;

    /**
     * @description 仙侣礼包系统
     */
    export class XianlvGiftProxy extends ProxyBase {
        // 已购买列表 1为仙玉 2 为直购
        public info: number[] = [];
        private _hintType: string[] = [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.XianlvGift];
        private _hint: boolean = true;

        initialize(): void {
            super.initialize();
            this.onProto(s2c_xianlv_libao, this.s2c_xianlv_libao, this);
        }

        // 仙玉礼包购买
        public c2s_xianlv_libao(): void {
            let msg = new c2s_xianlv_libao();
            this.sendProto(msg);
        }

        private s2c_xianlv_libao(n: GameNT): void {
            let msg = n.body as s2c_xianlv_libao;
            if (msg.info != null) {
                this.info = msg.info;
            }
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_XIANLV_GIFT);
        }

        public isBought(type = 1): boolean {
            return this.info.indexOf(type) > -1;
        }

        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.XianlvGift)) {
                return;//功能未开启
            }
            let hint = this._hint;
            let hintType = this._hintType;
            HintMgr.setHint(hint, hintType);
        }

        public set hint(hint: boolean) {
            if(this._hint == hint){
                return;
            }
            this._hint = hint;
            this.updateHint();
        }
    }
}