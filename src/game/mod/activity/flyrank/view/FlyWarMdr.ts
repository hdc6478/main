namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import act_reward = msg.act_reward;
    import Tween = base.Tween;

    export class FlyWarMdr extends EffectMdrBase {
        private _view: FlyWarView = this.mark("_view", FlyWarView);
        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _itemList: ArrayCollection;
        private _exp: number;//飞升经验

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FlyWarRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_unlock, TouchEvent.TOUCH_TAP, this.onClickUnlock);

            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE_WAR, this.onInfoUpdate, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateExp();
            this.updateBuy();
            this.updateItemList();
            this.updatePos();
        }

        protected onHide(): void {
            Tween.remove(this._view.scroller.viewport);
            super.onHide();
        }

        private onClickUnlock(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FlyWarUnlock);
        }

        private onInfoUpdate(): void {
            this.updateBuy();
            this.updateItemList();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.feisheng_exp) > -1){
                this.updateExp();
                this.updateItemList();
            }
        }

        private initShow(): void {
            let actInfo = this._proxy.curOpenAct;
            let warRewardList = this._flyRankProxy.getWarRewardList(actInfo);
            let reward = warRewardList[warRewardList.length - 1].rewards[0];
            this._view.icon.setData(reward);
            this._view.lab_name.textFlow = this._view.icon.getPropName();
        }

        private updateExp(): void {
            let index = PropIndex.Feishengjingyanzhi;
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            let cnt = BagUtil.getPropCntByIdx(index);
            this._exp = cnt;
            let str = "当前" + cfg.name+ "：" + TextUtil.addColor( cnt + "", BlackColor.GREEN);
            this._view.lab_cur.textFlow = TextUtil.parseHtml(str);
        }

        private updateBuy(): void {
            let actInfo = this._proxy.curOpenAct;
            let hasBuy = this._flyRankProxy.hasWarBuy(actInfo.act_id);
            this._view.btn_unlock.visible = !hasBuy;
            this._view.btn_unlock.setImage("jiesuofeisheng");
        }

        private updateItemList(): void {
            let actInfo = this._proxy.curOpenAct;
            let rewardList = this._flyRankProxy.getNormalRewardList(actInfo);

            if(this._itemList.source.length){
                this._itemList.replaceAll(rewardList);
            }
            else {
                this._itemList.source = rewardList;
            }

            let showReward: act_reward;
            let maxShowReward: act_reward;
            for(let reward of rewardList){
                if(!this._flyRankProxy.isWarShow(reward)){
                    continue;
                }
                let limitExp = this._flyRankProxy.getLimitExp(reward);
                if(limitExp > this._exp){
                    showReward = reward;
                    break;
                }
                maxShowReward = reward;
            }
            if(!showReward){
                showReward = maxShowReward;
            }
            this._view.item.setShowReward(showReward);
        }

        private updatePos(): void {
            let actInfo = this._proxy.curOpenAct;
            let index1 = this._flyRankProxy.getWarIndex1(actInfo.act_id);
            if(index1 >= 4){
                let pos = index1 - 1;
                egret.callLater(() => {
                    ScrollUtil.moveVToAssign(this._view.scroller, pos, 138, 10);
                }, this)
            }
        }
    }
}