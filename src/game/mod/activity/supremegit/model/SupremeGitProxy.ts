namespace game.mod.activity {
    import s2c_supreme_git_info = msg.s2c_supreme_git_info;
    import GameNT = base.GameNT;
    import ParamConfig = game.config.ParamConfig;

    export class SupremeGitProxy extends ProxyBase {
        private _model: SupremeGitModel;

        initialize(): void {
            super.initialize();
            this._model = new SupremeGitModel();

            this.onProto(s2c_supreme_git_info, this.s2c_supreme_git_info, this);

        }

        private s2c_supreme_git_info(n: GameNT) {
            let msg: s2c_supreme_git_info = n.body;
            this._model.infos = msg.infos || [];//服务端会下发所有数据，直接覆盖
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UDPATE_ZHIZUN_GIFT_INFO);
        }

        //是否已购买
        public hasBuy(productId: number): boolean {
            for (let info of this._model.infos) {
                if (info.id == productId) {
                    return info.count > 0;
                }
            }
            return false;
        }

        //是否可以全部购买
        public canAllBuy(): boolean {
            //玩家已购买非0元礼包，则不能全部购买
            for (let info of this._model.infos) {
                let rmb = PayUtil.getRmbValue(info.id);
                if (rmb <= 0) {
                    continue;
                }
                if (info.count > 0) {
                    return false;
                }
            }
            return true;
        }

        //礼包红点
        public getHint(productId: number): boolean {
            let hasBuy = this.hasBuy(productId);
            if (!hasBuy) {
                //显示对应商品价格，0元礼包的时候，显示红点
                let rmb = PayUtil.getRmbValue(productId);
                return rmb == 0;
            }
            return false;
        }

        //更新红点
        private updateHint(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.SupremeGit)) {
                return;//功能未开启
            }
            let hint = false;
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("supreme_product_id");
            let items: number[] = paramCfg.value;
            for (let productId of items) {
                if (this.getHint(productId)) {
                    hint = true;
                    break;
                }
            }
            let hintType = this._model.hintType;
            HintMgr.setHint(hint, hintType);
        }

        /**功能开启刷新按钮*/
        protected onOpenFuncUpdate(n: GameNT): void {
            let addIdx: number[] = n.body;
            if (addIdx.indexOf(OpenIdx.SupremeGit) > -1) {
                this.updateHint();
            }
        }
    }
}