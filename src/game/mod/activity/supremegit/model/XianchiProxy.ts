namespace game.mod.activity {
    import GameNT = base.GameNT;
    import s2c_xian_chi_qi_yuan_info = msg.s2c_xian_chi_qi_yuan_info;
    import c2s_xian_chi_qi_yuan_click = msg.c2s_xian_chi_qi_yuan_click;
    import ParamConfig = game.config.ParamConfig;
    import prop_tips_data = msg.prop_tips_data;
    import xian_chi_qi_yuan_struct = msg.xian_chi_qi_yuan_struct;
    import XianchiRewardConfig = game.config.XianchiRewardConfig;

    export class XianchiProxy extends ProxyBase {
        private _model: XianchiModel;

        initialize(): void {
            super.initialize();
            this._model = new XianchiModel();

            this.onProto(s2c_xian_chi_qi_yuan_info, this.s2c_xian_chi_qi_yuan_info, this);

        }

        public c2s_xian_chi_qi_yuan_click(type: number): void {
            let msg: c2s_xian_chi_qi_yuan_click = new c2s_xian_chi_qi_yuan_click();
            msg.button_type = type;
            this.sendProto(msg);
        }

        private s2c_xian_chi_qi_yuan_info(n: GameNT) {
            let msg: s2c_xian_chi_qi_yuan_info = n.body;
            if(!msg){
                return;
            }
            if(msg.layer != undefined){
                this._model.layer = msg.layer;
            }
            this._model.rewards = msg.get_rewards || [];
            this.updateHint();
            this.sendNt(ActivityEvent.ON_UPDATE_XIANCHI_INFO);
        }

        public getReward(index: number): prop_tips_data {
            if(!this._model.rewards){
                return null;
            }
            for(let reward of this._model.rewards){
                if(reward.index == index){
                    return reward.props[0];
                }
            }
            return null;
        }

        //祈福消耗，index，count
        public getCost(): number[] {
            let cfg: ParamConfig = GameConfig.getParamConfigById("xianchi_need_item");
            let costInfo: number[] = cfg && cfg.value;
            return costInfo;
        }

        //大奖道具index
        public getLayerRewardIndex(): number {
            let layer = this._model.layer || 1;
            let cfg: XianchiRewardConfig = getConfigByNameId(ConfigName.XianchiReward, layer);
            if(cfg){
                return cfg.rewards[0][0];
            }
            let cfgList: XianchiRewardConfig[] = getConfigListByName(ConfigName.XianchiReward);
            let maxCfg = cfgList[cfgList.length - 1];
            return maxCfg.rewards[0][0];
        }

        //是否领取大奖
        public hasDraw(layer: number): boolean {
            if(!this._model.layer){
                return false;
            }
            return this._model.layer > layer;
        }

        //是否可以领取大奖
        public canDraw(): boolean {
            if(!this._model.rewards || !this._model.rewards.length){
                return false;
            }
            let cfg: ParamConfig = GameConfig.getParamConfigById("xianchi_count");
            let maxCnt = cfg && cfg.value;
            return this._model.rewards.length >= maxCnt;
        }

        public get hintType(): string[] {
            return this._model.hintType;
        }

        private updateHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianchi)){
                return;
            }
            let hint = this.checkHint();
            let hintType = this._model.hintType;
            HintMgr.setHint(hint, hintType);
        }

        private checkHint(): boolean {
            if(this.canDraw()){
                return true;
            }
            let cost = this.getCost();
            let index = cost[0];
            let cnt = cost[1];
            return BagUtil.getPropCntByIdx(index) >= cnt;
        }

        /** 通用背包事件监听 */
        protected onBagUpdateByPropIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let cost = this.getCost();
            let index = cost[0];
            if(indexs.indexOf(index) >= 0){
                this.updateHint();
            }
        }

    }
}