namespace game.mod.vip {

    import c2s_vip_receive_gift = msg.c2s_vip_receive_gift;
    import GameNT = base.GameNT;
    import c2s_vip_info = msg.c2s_vip_info;
    import s2c_vip_info = msg.s2c_vip_info;
    import VipConfig = game.config.VipConfig;
    import vip_reward_info = msg.vip_reward_info;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;

    /**
     * @description VIP系统
     */
    export class VipProxy extends ProxyBase implements IVipProxy {
        private _model: VipModel;
        private _isLogin = true;//是否登陆情况

        public get model(): VipModel {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new VipModel();
            this.onProto(s2c_vip_info, this.s2c_vip_info, this);
        }

        /**
         * 领取礼包或购买
         * @param type 1.领取2.购买
         * @param idx
         */
        public c2s_vip_receive_gift(type: number, idx: number): void {
            let msg = new c2s_vip_receive_gift();
            msg.type = type;
            msg.idx = idx;
            this.sendProto(msg);
        }

        public c2s_vip_info(): void {
            this.sendProto(new c2s_vip_info());
        }

        private s2c_vip_info(n: GameNT) {
            let msg = n.body as s2c_vip_info;
            let preIdx = this._model.idx;
            if (msg.idx != null) {
                this._model.idx = msg.idx;
            }
            if (msg.exp != null) {
                this._model.exp = msg.exp;
            }
            if (msg.reward_list != null) {
                for (let item of msg.reward_list) {
                    this._model.reward_list[item.idx] = item;
                }
            }
            this.updateHint();
            this.sendNt(VipEvent.UPDATE_VIP_INFO);
            if (preIdx != this._model.idx && !this._isLogin) {
                facade.showView(ModName.Vip, VipViewType.VipUp);
            }
            if (this._isLogin) {
                this._isLogin = false;
            }
        }

        /**=================================================================*/

        /**当前能展示的最大vip等级的配置*/
        public getShowVipCfgList(): VipConfig[] {
            let cfgs: VipConfig[] = getConfigListByName(ConfigName.Vip);
            let rst: VipConfig[] = [];
            let maxShowVip = this.getMaxShowVip();
            for (let cfg of cfgs) {
                let type = Number((cfg.index + '').slice(5, 6));
                if (cfg && type == 0 && VipUtil.getShowVipLv(cfg.index) <= maxShowVip) {
                    rst.push(cfg);
                }
            }
            return rst;
        }

        private _vipCfgs: VipConfig[] = [];

        /**vip相关全部配置，F=0是vip等级*/
        public getVipCfgList(): VipConfig[] {
            if (this._vipCfgs && this._vipCfgs.length) {
                return this._vipCfgs;
            }
            let cfgs: VipConfig[] = getConfigListByName(ConfigName.Vip);
            let rst: VipConfig[] = [];
            for (let cfg of cfgs) {
                let type = Number((cfg.index + '').slice(5, 6));
                if (cfg && type == 0) {
                    rst.push(cfg);
                }
            }
            this._vipCfgs = rst;
            return rst;
        }

        /**当前能展示的最大vip等级  1-10,11-13,14-16*/
        public getMaxShowVip(): number {
            let lv = VipUtil.getShowVipLv(this._model.idx);
            let maxLv: number;
            if (lv < 10) {
                maxLv = 10;
            } else if (lv < 13) {
                maxLv = 13;
            } else {
                maxLv = 16;
            }
            let maxVip = this.getVipCfgList().length - 1;
            maxLv = Math.min(maxLv, maxVip);
            return maxLv;
        }

        public getVipCfg(idx: number): VipConfig {
            return getConfigByNameId(ConfigName.Vip, idx);
        }

        /**是否已达最大vip等级*/
        public isMaxVip(): boolean {
            let idx = this._model.idx;
            if (!this.getVipCfg(idx + 1)) {
                return true;
            }
            return false;
        }

        /**是否领取了奖励*/
        public isActed(idx: number): boolean {
            let info = this._model.reward_list[idx];
            return info && info.state == 2;
        }

        public getRewardInfo(idx: number): vip_reward_info {
            return this._model.reward_list[idx];
        }

        public canGetReward(idx: number): boolean {
            let info = this.getRewardInfo(idx);
            if (info && info.state == 2) {
                return false;
            }
            //小于等于当前vip等级，且不是领取状态，表示可以领取
            if (idx <= this._model.idx && info && info.state != 2) {
                return true;
            }
            // //当前vip等级，未领取但进度条已满
            // if (idx == this._model.idx && info && info.state != 2) {
            //     let cfg = this.getVipCfg(idx);
            //     return this._model.exp >= cfg.levelup_exp;
            // }
            return false;
        }

        /**当前能购买奖励的vip的index*/
        public getMinBuyIdx(): number {
            let cfgs = this.getShowVipCfgList();
            for (let cfg of cfgs) {
                if (this.canBuy(cfg.index)) {
                    return cfg.index;
                }
            }
            return 0;
        }

        //能否购买vip礼包
        public canBuy(index: number): boolean {
            let cfg = this.getVipCfg(index);
            if (!cfg) {
                return false;
            }
            let info = this.getRewardInfo(index);
            if (info && info.timer != 0 && info.timer > TimeMgr.time.serverTimeSecond) {
                return false;
            }
            if (info && info.state == 2) {
                let cost: number[];
                if (info.timer) {
                    cost = cfg.daily_cost_item[0];
                } else {
                    cost = cfg.cost_item[0];
                }
                return cost && BagUtil.checkPropCnt(cost[0], cost[1]);
            }
            let vipLv = VipUtil.getShowVipLv(index);
            if (vipLv == 0) {
                let cost = cfg.cost_item[0];
                return cost && BagUtil.checkPropCnt(cost[0], cost[1]);
            }
            return false;
        }

        public updateHint(): void {
            let list = this.getShowVipCfgList();
            let hint = false;
            for (let cfg of list) {
                if (this.canGetReward(cfg.index) || this.canBuy(cfg.index)) {
                    hint = true;
                    break;
                }
            }
            HintMgr.setHint(hint, this._model.hintPath);
        }

        protected onRoleUpdate(n: GameNT) {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.diamond) > -1) {
                this.updateHint();
            }
        }

        /**当前vip等级的index*/
        public getIdx(): number {
            return this._model.idx;
        }

        /**当前vip经验*/
        public getExp(): number {
            return this._model.exp;
        }
    }
}