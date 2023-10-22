namespace game.mod.pay {

    import GameNT = base.GameNT;
    import s2c_direct_buy_info = msg.s2c_direct_buy_info;
    import c2s_check_product_id = msg.c2s_check_product_id;
    import s2c_check_product_id = msg.s2c_check_product_id;
    import c2s_direct_buy_reward = msg.c2s_direct_buy_reward;
    import direct_buy_item = msg.direct_buy_item;
    import Handler = base.Handler;
    import facade = base.facade;

    export class PayProxy extends ProxyBase implements IPayProxy {
        private _model: PayModel;

        initialize(): void {
            super.initialize();
            this._model = new PayModel();
            this.onProto(s2c_direct_buy_info, this.s2c_direct_buy_info, this);
            this.onProto(s2c_check_product_id, this.s2c_check_product_id, this);
        }

        //领取奖励
        public c2s_direct_buy_reward(productId: number): void {
            let msg: c2s_direct_buy_reward = new c2s_direct_buy_reward();
            msg.product_id = productId;
            this.sendProto(msg);
        }

        //更新直购数据
        private s2c_direct_buy_info(n: GameNT) {
            /**这个协议服务端会定时下发*/
            let msg: s2c_direct_buy_info = n.body;
            if (!msg.infos) {
                return;
            }
            let isUpdate = !!this._model.infos;
            if (!this._model.infos) {
                this._model.infos = {};
            }
            let addIdx: number[] = [];
            for (let i of msg.infos) {
                this._model.infos[i.product_id] = i;
                if (isUpdate) {
                    addIdx.push(i.product_id);
                }
            }
            if (addIdx.length) {
                this.sendNt(PayEvent.ON_DIRECT_BUY_UPDATE, addIdx);
            }
        }

        //验证购买
        public c2s_check_product_id(productId: number): void {
            let msg: c2s_check_product_id = new c2s_check_product_id();
            msg.product_id = productId;
            this.sendProto(msg);
        }

        private s2c_check_product_id(n: GameNT) {
            let msg: s2c_check_product_id = n.body;
            if (!msg.can_buy) return;

            let productId = msg.product_id;
            let name = PayUtil.getPayName(productId);
            let rmb = PayUtil.getRmbValue(productId);
            if (rmb <= 0) {
                this.c2s_direct_buy_reward(productId);//配置金额为0的，直接领取奖励
                return;
            }

            let roleVo: RoleVo = RoleVo.ins;
            let extra: string[] = [roleVo.role_id.toString(), gso.serverId.toString(), productId.toString()];
            let desc = name;
            if (gzyyou.sdk.sdkPay(productId, rmb, extra, roleVo.name, roleVo.role_id.toString(),desc)) {
                return;
            }

            //todo
            // 测试充值代码
            ViewMgr.getIns().show("测试充值\nRMB:" + rmb + "，购买:" + name, Handler.alloc(this, () => {
                let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                miscProxy.sendGM("$charge " + productId);
            }));
        }

        /**礼包信息*/
        private getInfo(productId: number): direct_buy_item {
            if (!this._model.infos) {
                return null;
            }
            let info = this._model.infos[productId];
            return info;
        }

        /**可购买次数*/
        public getBuyTimes(productId: number): number {
            let info = this.getInfo(productId);
            return info && info.buy_times || 0;
        }

        /**礼包是否已领取*/
        public hasReceived(productId: number): boolean {
            let info = this.getInfo(productId);
            if (!info) {
                return true;//取不到数据时，表示已购买
            }
            return info.received;
        }

        /**礼包是否可领取*/
        public canReceived(productId: number): boolean {
            let info = this.getInfo(productId);
            if (!info) {
                return false;//取不到数据时，表示已购买
            }
            return info.can_received;
        }
    }
}