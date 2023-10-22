namespace game.mod.activity {

    import TotalTargetConfig = game.config.TotalTargetConfig;
    import LanDef = game.localization.LanDef;
    import ShopConfig = game.config.ShopConfig;
    import GiftBagConfig = game.config.GiftBagConfig;
    import MainTask1Config = game.config.MainTask1Config;
    import Handler = base.Handler;

    export class YjjsItem6 extends BaseListenerRenderer {
        public lb_cond: eui.Label;
        public icon: game.mod.IconGot;
        public btn_go: game.mod.Btn;
        public btn_buy: game.mod.Btn;
        public list: eui.List;
        public img_got: eui.Image;
        public img_got0: eui.Image;

        data: TotalTargetConfig;
        private _proxy: YjjsProxy;
        private _listData: eui.ArrayCollection;
        private _status = 0;//任务状态 0未完成  1完成  2领取
        private _jump: number;
        private _cost: number[];//仙玉购买
        private _reward: number[];

        constructor() {
            super();
            this.skinName = `skins.activity.YjjsItemSkin6`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Yjjs);
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClickBuy, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            let taskId = data.quest_list[0];
            let taskData = TaskUtil.getTask(taskId);
            let status = taskData ? taskData.status : 0;//0未完成  1完成  2领取
            this._status = status;
            let taskDesc = '';
            if (taskData) {
                taskDesc = TaskUtil.getTaskDesc(taskData) + '可领取';
            }
            this.lb_cond.textFlow = TextUtil.parseHtml(taskDesc);

            let taskCfg = TaskUtil.getCfg(taskId);
            if (!taskCfg) {
                return;
            }
            let iconData: IconRewardData = {
                prop: taskCfg.rewards[0],
                isGot: status == 2
            };
            this._reward = taskCfg.rewards[0];
            this.icon.data = iconData;
            //todo
            if (status == 0) {
                this.icon.gr_got.visible = true;
                this.icon.img_gou.visible = false;
            }

            this.img_got.visible = status == 2;
            this.btn_go.visible = !this.img_got.visible;
            this.btn_go.label = status == 1 ? getLanById(LanDef.tishi_29) : getLanById(LanDef.goto);
            this.btn_go.setHint(status == 1);

            this.updateRightView();
        }

        private updateRightView(): void {
            let cfg = this.data;
            let rewards: number[][] = [];
            if (cfg.pay_type == 1) {
                let shopCfg: ShopConfig = getConfigByNameId(ConfigName.Store, cfg.pay_index);
                let price = 0;
                if (shopCfg) {
                    rewards = shopCfg.prop.concat();
                    price = shopCfg.price * shopCfg.discount / 10000;
                    this._cost = [shopCfg.coin_type, price];
                    this.btn_buy.setCost(this._cost);
                }
            } else {
                let giftBagCfg: GiftBagConfig = getConfigByNameId(ConfigName.GiftBag, cfg.pay_index);
                if (giftBagCfg) {
                    rewards = giftBagCfg.awards.concat();
                    this.btn_buy.label = PayUtil.getRmbValue(cfg.pay_index) + PayUtil.getRmbUnit();
                }
            }
            this._listData.replaceAll(rewards);

            // 获取购买状态
            let buyStatus = this._proxy.getHaoliStatus(this.data.index);
            this.img_got0.visible = buyStatus == 2;
            this.btn_buy.visible = !this.img_got0.visible;
        }

        private onClickGo(): void {
            let taskId = this.data.quest_list[0];
            let taskData = TaskUtil.getTask(taskId);
            if (!taskData) {
                DEBUG && console.error(`没有任务数据:${taskId}`);
                return;
            }
            TaskUtil.clickTask(taskData);
        }

        private onClickBuy(): void {
            //不可购买
            if (this._status == 0) {
                let cfg: MainTask1Config = getConfigByNameId(ConfigName.MainTask1, this.data.quest_list[0]);
                if (cfg.jump) {
                    this._jump = cfg.jump;
                }
                ViewMgr.getIns().showConfirm(`条件未达成，无法购买`, Handler.alloc(this, this.onConfirmFunc));
                return;
            }
            //可购买
            if (this.data.pay_type == 1) {
                if (!this._cost || !BagUtil.checkPropCnt(this._cost[0], this._cost[1], PropLackType.Dialog)) {
                    return;
                }
                this._proxy.c2s_yaoji_buy(5, this.data.index);
            } else {
                PayUtil.pay(this.data.pay_index);
            }
        }

        private onConfirmFunc(): void {
            if (this._jump) {
                ViewMgr.getIns().showViewByID(this._jump);
            } else {
                DEBUG && console.error(`没有配置任务jump字段`);
            }
        }

        private onClickIcon(): void {
            if (this._reward) {
                ViewMgr.getIns().showPropTips(this._reward[0]);
            }
        }
    }
}