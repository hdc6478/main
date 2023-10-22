namespace game.mod.activity {


    import yaoji_target = msg.yaoji_target;
    import GameOrderConfig = game.config.GameOrderConfig;

    /**
     * 瑶姬令
     * 协议没有整合
     */
    export class YjjsMdr7 extends GameOrderMdr {
        protected _gameOrderType = GameOrderType.Yaojiling;
        private _yjjsProxy: YjjsProxy;

        protected onInit() {
            super.onInit();
            this._yjjsProxy = this.retProxy(ProxyType.Yjjs);
            this._view.img_banner.source = ResUtil.getUiJpg('guanggaotu_yaojiling');
            this._view.gr_icon.x = 100;
            this._view.img_type1.source = `meishuzi_jiangli`;
            this._view.img_type2.source = `yaojiling`;
        }

        protected addListeners() {
            super.addListeners();
            this.offNt(ActivityEvent.ON_UPDATE_GIVING_LIST);
            this.onNt(ActivityEvent.ON_YJJS_LING_INFO_UPDATE, this.onUpdateView, this);
        }

        protected getEndTime(type: number): number {
            return this._yjjsProxy.getEndTime();
        }

        protected getBtnStatus(type: number): number {
            return this._yjjsProxy.getBtnStatus();
        }

        /**根据类型和索引获取状态 */
        private getStatusByTypeIndex(index: number): yaoji_target {
            return this._yjjsProxy.getStatusByTypeIndex(index);
        }

        protected getListByType(type: number): IGameOrderItemData[] {
            let cfgArr = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
            let act_list = this._yjjsProxy.model.ling_list;
            let list: IGameOrderItemData[] = [];
            let val = act_list ? act_list.length : 0;
            for (let key in cfgArr) {
                let cfg = cfgArr[key];
                let cfgBefore = cfgArr[+key - 1];
                let cfgNext = cfgArr[+key + 1];
                let before = cfgBefore && Math.floor((cfg.target - cfgBefore.target) / 2) + cfgBefore.target || 0;
                let next = cfgNext && Math.floor((cfgNext.target - cfg.target) / 2) + cfg.target || 0;
                let isBought = this.getIsBought(this._gameOrderType);
                if (act_list) {
                    //免费奖励
                    let yaojiTarget = this.getStatusByTypeIndex(cfg.index);
                    //付费奖励
                    let yaojiTarget2 = this._yjjsProxy.model.ling_list2[cfg.index];
                    list.push({
                        cfg,
                        freeStatus: yaojiTarget ? yaojiTarget.state : RewardStatus.NotFinish,
                        payStatus: yaojiTarget2 ? yaojiTarget2.state : RewardStatus.NotFinish,
                        before,
                        next,
                        type: this._gameOrderType,
                        val,
                        isBought
                    });
                } else {
                    list.push({cfg, before, next, type: this._gameOrderType, val, isBought});
                }
            }
            return list;
        }

        protected getIsBought(type: number): boolean {
            return this._yjjsProxy.model.is_ling_buy;
        }

        protected clickBtnStatus2() {
            this._yjjsProxy.c2s_yaoji_receive_reward(6, null);
        }

        /**购买后累计可领取*/
        public getReward(): PropData[] {
            return this._yjjsProxy.getReward() || [];
        }

        /**现在购买立即领取*/
        public getRewardCanGet(): PropData[] {
            return this._yjjsProxy.getRewardCanGet() || [];
        }

        protected onUpdateView() {
            super.onUpdateView();
            let status = this.getBtnStatus(this._gameOrderType);
            if (status == 3) {
                this._view.btn.label = '解锁战令';
            } else {
                this._view.btn.label = "一键领取";
            }

            let day = this._yjjsProxy.model.ling_day;
            let str = `当前累计登录：`
                + TextUtil.addColor(`${day}天`, BlackColor.GREEN);
            this._view.lab_cur.textFlow = TextUtil.parseHtml(str);
        }

        protected clickBtnStatus1() {

        }

        /**获取可领取位置*/
        protected getPosByType(): number {
            let cfgObj: { [index: number]: GameOrderConfig } = getConfigByNameId(ConfigName.GameOrder, GameOrderType.Yaojiling);
            let keys = Object.keys(cfgObj) || [];
            for (let i = 0; i < keys.length; i++) {
                let cfg = cfgObj[keys[i]];
                //免费奖励
                let yaojiTarget = this.getStatusByTypeIndex(cfg.index);
                //付费奖励
                let yaojiTarget2 = this._yjjsProxy.model.ling_list2[cfg.index];
                if ((yaojiTarget && yaojiTarget.state == 1) || (yaojiTarget2 && yaojiTarget2.state == 1)) {
                    return i;
                }
            }
            return 0;
        }
    }
}