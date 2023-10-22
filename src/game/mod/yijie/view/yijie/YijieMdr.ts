namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import YijieConfig = game.config.YijieConfig;
    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import yijie_ui_info = msg.yijie_ui_info;
    import Monster1Config = game.config.Monster1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import Handler = base.Handler;
    import GameNT = base.GameNT;
    import YonghengConfig = game.config.YonghengConfig;
    import Event = egret.Event;

    export class YijieMdr extends EffectMdrBase implements UpdateItem {
        private _view: YijieView = this.mark("_view", YijieView);
        private _proxy: YijieProxy;

        private _selIndex: number;/**当前选中的boss*/
        private _selCfg: YijieConfig| YonghengConfig;/**当前选中的配置*/
        private _selInfo: yijie_ui_info;/**当前选中的boss*/
        private _effId: number;
        private _lastIndex: number;//上一次显示的外显

        private _itemList: ArrayCollection;
        private _bossList: ArrayCollection;
        private _costIdx: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yijie);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._bossList = new ArrayCollection();
            this._view.list_boss.itemRenderer = YijieItem;
            this._view.list_boss.dataProvider = this._bossList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_boss, Event.CHANGING, this.onClickBoss);

            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_magic, TouchEvent.TOUCH_TAP, this.onClickMagic);
            addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
            addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckbox);

            this.onNt(YijieEvent.ON_YIJIE_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(YijieEvent.ON_YIJIE_SEL_UPDATE, this.onSelUpdate, this);
            this.onNt(BossEvent.UPDATE_BOSS_lIST, this.reqBossInfo, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
        }

        protected onShow(): void {
            super.onShow();

            this._proxy.curType = YijieBossType.Yijie;
            this._selIndex = 0;
            this.reqBossInfo();
            this.updateItemList();
            this.indexUpdateInfo();
            this.updateCount();
            this.updateSel();
            this.updateCost();

            TimeMgr.addUpdateItem(this, 1000);
            this._view.btn_gift.visible = PayUtil.checkShowGift(ProductId.Id100014);
            this._view.currentState = "1";

            this._view.checkBoxNvpu.updateShow(XiuxianNvpuEventType.Yijie);
        }

        protected onHide(): void {
            this._effId = 0;
            this._lastIndex = 0;
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickBoss(e: Event): void {
            let index = this._view.list_boss.selectedIndex;
            if(index == this._selIndex){
                return;
            }
            let cfg = this._view.list_boss.selectedItem as YijieConfig;
            if(!this._proxy.isBossOpen(cfg, true)){
                e.preventDefault();
                return;
            }
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        private onClickGift(): void {
            ViewMgr.getIns().showGift(ProductId.Id100014);
        }

        private onClickReward(): void {
            if(!this._selCfg){
                return;
            }
            let tipStr1 = TextUtil.addColor(getLanById(LanDef.yijie_tips1), WhiteColor.DEFAULT);
            let tipStr2 = TextUtil.addColor(getLanById(LanDef.yijie_tips2), WhiteColor.DEFAULT);
            let tips: string[] = [tipStr1, tipStr2];
            ViewMgr.getIns().bossReward(this._selCfg.reward_big, tips);
        }

        private onClickMagic(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Consecrate);
        }

        private onClickRule(): void {
            ViewMgr.getIns().showRuleTips(getLanById(LanDef.yijie_tips));
        }

        private onClickChallenge(): void {
            if(!this._selCfg){
                return;
            }

            SceneUtil.setReward(SceneType.Yijie, this._selCfg.reward_big);
            this._proxy.c2s_yijie_boss_challenge(this._selCfg["stage"]);//字段定义没导出
        }

        private onClickCheckbox(): void {
            if(this._view.checkbox.selected){
                //勾选时提示确认
                ViewMgr.getIns().showConfirm(getLanById(LanDef.yijie_open_tips), Handler.alloc(this, () => {
                    this._proxy.c2s_yijie_sanbei();
                }), Handler.alloc(this, () => {
                    this._view.checkbox.selected = false;
                }));
            }
            else {
                this._proxy.c2s_yijie_sanbei();
            }
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateCount();
            this.updateSel();
        }

        private onSelUpdate(): void {
            this.updateCost();
            this.updateSel();
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            if(indexs.indexOf(this._costIdx) < 0){
                return;
            }
            this.updateCost();
        }

        private updateItemList(): void {
            let bossList = this._proxy.getBossList();
            if(this._bossList.source.length){
                this._bossList.replaceAll(bossList);
            }
            else {
                this._bossList.source = bossList;
            }
            this._view.list_boss.selectedIndex = this._selIndex;
        }

        private indexUpdateInfo(): void {
            let bossList = this._proxy.getBossList();

            this._selCfg = bossList[this._selIndex];
            this._selInfo = this._proxy.getBossInfo(this._selCfg["stage"]);//字段定义没导出
            if(!this._selCfg){
                return;
            }
            this.updateBoss();
            this.updateReward();
        }

        private updateBoss(): void {
            let index = this._selCfg.index;
            if(index == this._lastIndex){
                return;
            }
            this._lastIndex = index;
            if(this._effId) {
                this.removeEffect(this._effId);
            }
            let monsterIndex = this._selCfg.monster_index[0];
            this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, monsterIndex);
            this._view.avatarNameItem.updateShow(monsterCfg.name);
        }

        private updateReward(): void {
            let index = this._selCfg.reward_big;
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, index);
            this._itemList.source = cfg.content.slice(0,8);//取前面奖励
        }

        private updateCount(): void {
            let cnt = this._proxy.count;
            let fontStr = cnt + "";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.XianYu1], this._view.grp_cnt, true, 0.8, true);
        }

        private updateSel(): void {
            let isAct = RoleUtil.isRoleRingAct(RoleRingType.Type2);
            this._view.checkbox.visible = isAct;
            if(isAct){
                this._view.checkbox.selected = this._proxy.selState;
            }
        }

        private updateCost(): void {
            let cost = this._proxy.getCost();
            let index = cost[0];
            let cnt = cost[1];
            this._costIdx = index;
            this._view.cost.updateShow([index, cnt]);
        }

        private reqBossInfo(): void {
            this._proxy.c2s_yijie_open_ui();
        }

        update(time: base.Time): void {
            let len = this._view.list_boss.numChildren;
            for(let i = 0; i < len; ++i){
                let item = this._view.list_boss.getChildAt(i) as YijieItem;
                item.updateTime();
            }
        }

    }
}