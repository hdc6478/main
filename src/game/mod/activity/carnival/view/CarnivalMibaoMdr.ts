namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;

    export class CarnivalMibaoMdr extends EffectMdrBase implements UpdateItem{
        private _view: CarnivalMibaoView = this.mark("_view", CarnivalMibaoView);
        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;
        private _itemList: CarnivalMibaoRender[];
        private _lineList: eui.Image[];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._carnivalProxy = this.retProxy(ProxyType.Carnival);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);//属性刷新，有货币
            this.onNt(ActivityEvent.ON_CARNIVAL_MIBAO_UPDATE, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTime();
            this.updateItemList();
            this._proxy.checkActTips(NotTipsType.Carnival);

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            let key = PropIndexToKey[this._view.costItem.index];
            if(key && keys.indexOf(key) >= 0){
                this._view.costItem.updateShow();
            }
        }

        private initShow(): void {
            let actInfo = this._proxy.curOpenAct;
            let propIndex = this._carnivalProxy.getMibaoProp(actInfo);
            let cfg: PropConfig = GameConfig.getPropConfigById(propIndex);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.carnival_tips1), [cfg.name]);
            this._view.lab_tips.text = tipsStr;
            this._view.costItem.setDataYellow(propIndex);

            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5,
                this._view.item6,
                this._view.item7,
                this._view.item8,
                this._view.item9
            ];
            let addEventListener = this.onEgret.bind(this);
            for(let item of this._itemList){
                addEventListener(item.btn_draw, TouchEvent.TOUCH_TAP, this.onClickItem);
            }

            this._lineList = [
                this._view.img_line1,
                this._view.img_line2,
                this._view.img_line3,
                this._view.img_line4,
                this._view.img_line5,
                this._view.img_line6,
                this._view.img_line7,
                this._view.img_line8
            ];
        }

        private onClickItem(e: TouchEvent): void {
            let actInfo = this._proxy.curOpenAct;
            let clickBtn = e.target;
            for (let i = 0; i < this._itemList.length; ++i) {
                let item = this._itemList[i];
                if (item.btn_draw != clickBtn) {
                    continue;
                }
                //点击宝箱
                let data = item.data;
                ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.CarnivalMibaoReward, {data: data, actId: actInfo.act_id});
                break;
            }
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateItemList(): void {
            let actInfo = this._proxy.curOpenAct;
            let rewardList = actInfo.reward_list;
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let isShow = i < rewardList.length;//配置的宝箱可能小于9
                item.visible = isShow;
                let hasDraw = false;//已领取
                if(isShow){
                    let reward = rewardList[i];
                    let index = reward.index;
                    hasDraw = this._carnivalProxy.hasMibaoDraw(actInfo.act_id, index);
                    let canDraw = this._carnivalProxy.canMibaoDraw(actInfo.act_id, reward);
                    let hasLastDarw = this._carnivalProxy.hasLastMibaoDraw(actInfo.act_id, index);
                    let isBig = i == this._itemList.length - 1;
                    let data: CarnivalMibaoData = {reward: reward, hasDraw: hasDraw, canDraw: canDraw, hasLastDarw: hasLastDarw, isBig: isBig};
                    item.setData(data);
                }

                let line = i < this._lineList.length ? this._lineList[i] : null;
                if(line){
                    let isShowLine = i < rewardList.length - 1;//9个宝箱8条线
                    line.visible = isShowLine && hasDraw;
                }
            }
        }
    }
}