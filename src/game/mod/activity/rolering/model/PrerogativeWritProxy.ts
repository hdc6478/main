namespace game.mod.activity {

    import c2s_prerogative_writ_get = msg.c2s_prerogative_writ_get;
    import GameNT = base.GameNT;
    import s2c_prerogative_writ_info = msg.s2c_prerogative_writ_info;
    import prerogative_writ_infos = msg.prerogative_writ_infos;

    /**
     * @description 特权令系统
     */
    export class PrerogativeWritProxy extends ProxyBase implements IPrerogativeWritProxy {
        private _model: PrerogativeWritModel;

        public get model(): PrerogativeWritModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new PrerogativeWritModel();
            this.onProto(s2c_prerogative_writ_info, this.s2c_prerogative_writ_info, this);
        }

        //领取特权令奖励
        public c2s_prerogative_writ_get(type: PrerogativeWritType): void {
            let msg = new c2s_prerogative_writ_get();
            msg.type = type;
            this.sendProto(msg);
        }

        //返回特权令信息
        public s2c_prerogative_writ_info(n: GameNT): void {
            let msg = n.body as s2c_prerogative_writ_info;
            if (msg.info != null) {
                for (let item of msg.info) {
                    this._model.info[item.type] = item;
                }
            }
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_PREROGATIVE_WRIT_INFO);
        }

        /**================================= 协议end =================================*/

        //获取每日奖励
        public getDailyReward(type: PrerogativeWritType): number[][] {
            let ary: string[] = ['yuqing', 'shangqing', 'taiqing'];
            let cfg = GameConfig.getParamConfigById(ary[type - 1]);
            if (!cfg) {
                return [];
            }
            return cfg.value;
        }

        //获取展示的奖励
        public getRewardShow(type: PrerogativeWritType): number[][] {
            if (!this.isPayBought(type)) {
                let productId = this.getProductId(type);
                return PayUtil.getRewards(productId);
            }
            return this.getDailyReward(type);
        }

        private _productIdMap: { [key: number]: number } = {};

        //获取商品id
        public getProductId(type: PrerogativeWritType): number {
            if (this._productIdMap[type]) {
                return this._productIdMap[type];
            }
            this._productIdMap = {};
            let cfgs = StoreUtil.getDirectShopCfgListByType(DirectShopType.PrerogativeWrit);
            for (let cfg of cfgs) {
                if (cfg) {
                    this._productIdMap[cfg.param1] = cfg.product_id;
                }
            }
            return this._productIdMap[type];
        }

        //特权令是否购买
        public isPayBought(type: PrerogativeWritType): boolean {
            return !!this.getInfo(type);
            // return PayUtil.hasBuy(this.getProductId(type));
        }

        //每天奖励是否领取
        public isReceived(type: PrerogativeWritType): boolean {
            let info = this._model.info[type];
            return info && info.status == 2;
        }

        //购买了才有
        public getInfo(type: PrerogativeWritType): prerogative_writ_infos {
            return this._model.info[type];
        }

        public getReceivedDay(type: PrerogativeWritType): number {
            let info = this.getInfo(type);
            return info && info.day || 0;
        }

        /**特权令是否全部购买了*/
        public isAllBought(): boolean {
            let ary = [PrerogativeWritType.Yuqing, PrerogativeWritType.Shangqing, PrerogativeWritType.Taiqing];
            for (let type of ary) {
                if (!this.isPayBought(type)) {
                    return false;
                }
            }
            return true;
        }

        /**================================= hint =================================*/

        public getHint(type: PrerogativeWritType): boolean {
            let info = this.getInfo(type);
            return info && info.status == 1;
        }

        public updateHint(): void {
            let hint = false;
            for (let i = 1; i <= 3; i++) {
                if (this.getHint(i)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }
    }
}