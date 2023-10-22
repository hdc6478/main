namespace game.mod.consecrate {


    import UpdateItem = base.UpdateItem;
    import consecrate_infos = msg.consecrate_infos;
    import TimeMgr = base.TimeMgr;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;
    import GameNT = base.GameNT;
    import Handler = base.Handler;

    export class ConsecrateMdr extends EffectMdrBase implements UpdateItem {
        private _view: ConsecrateView = this.mark("_view", ConsecrateView);
        private _proxy: ConsecrateProxy;
        private _doing: consecrate_infos;
        private _prop: PropData;
        private _storage_time:number;

        private readonly num: number = 7;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Consecrate);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.grp_tips, TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
            addEventListener(this._view.btn_lottery, TouchEvent.TOUCH_TAP, this.onClickLottery, this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview, this);
            addEventListener(this._view.btn_auto, TouchEvent.TOUCH_TAP, this.onClickAuto, this);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd, this);

            this.onNt(ConsecrateEvent.ON_UPDATE_CONSECRATE_INFO, this.onUpdateView, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            this._proxy.c2s_consecrate_info();
            super.onShow();
            this._storage_time = this._proxy.model.storage_time;
            // this.onUpdateView();
        }

        private onUpdateView(): void {

            this._doing = this._proxy.getDoingInfo();
            let bool: boolean = !!this._doing;
            this._view.grp_tips.visible = bool;
            // this._view.icon.visible = bool;
            this._view.btn_add.visible = !bool;
            if (bool) {
                this._prop = PropData.create(this._doing.prop_id);
                this._view.icon.setData(this._doing.prop_id);
                this._view.lab_name.textFlow = this._view.icon.getPropName();
                this.removeEft();
                this.addEftByParent(UIEftSrc.GongFengDiZuo,this._view.group_eft);

                TimeMgr.addUpdateItem(this, 1000);
				this.onUpdateTime();
            } else {
                this._view.icon.setData(null);
                this.removeEft();
                TimeMgr.removeUpdateItem(this);
                this._view.lab_name.text = "";
            }

            for (let i = 0; i < this.num; i++) {
                let pos: number = i + 1;
                let item: ConsecrateIconItem = this._view[`item_${pos}`];
                let info = this._proxy.getInfoByPos(pos);
                item.setData(info);
                if(i == 0){
                    //第一个位置做判断
                    if((!info || info.state == ConsecrateState.Null)
                        || (info && info.state == ConsecrateState.Reward)){
                        //当前没供奉的时候，或者可领取奖励的时候
                        GuideMgr.getIns().show(GuideKey.ConsecrateIcon, item, Handler.alloc(item, item.onClick));//指引
                    }
                    if(this._view.grp_tips.visible){
                        //封印中的时候提示加速
                        GuideMgr.getIns().show(GuideKey.ConsecrateSpeed, this._view.btn_speedup, Handler.alloc(this, this.onClickSpeedUp));//指引
                    }
                }
                else if(i == this.num - 1){
                    //最后一个位置做判断
                    GuideMgr.getIns().show(GuideKey.ConsecrateIconFinal, item, Handler.alloc(item, item.onClick));//指引
                }
            }

            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "gongfeng_yijianlingqu");
            let isAct: boolean = ViewMgr.getIns().checkPass(cfg.value);
            let isReward: boolean = this._proxy.getIsReward();
            this._view.btn_auto.visible = isAct && isReward;
            this._view.btn_auto.setHint(isReward);
            this._view.lab_tips.visible = !isAct;
            this._view.lab_tips.text = `${cfg.value}关开启一键领取`;

            this.onUpdateCount();

            if(this._proxy.model.storage_time < this._storage_time){
                PromptBox.getIns().show(`加速成功`);
                console.log("加速成功");
            }

            this._storage_time = this._proxy.model.storage_time;

        }

        private onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "gongfeng_lottery");
            if (keys.indexOf(PropIndexToKey[cfg.value[0]]) > -1) {
                this.onUpdateCount();
            }
        }

        private onUpdateCount(): void {
            let cfg: ParamConfig = getConfigByNameId(ConfigName.Param, "gongfeng_lottery");
            let num: number = BagUtil.getPropCntByIdx(cfg.value[0]);
            this._view.coin.initIcon(cfg.value[0]);
            this._view.coin.lab_cost.text = `${num}/${cfg.value[1]}`;

            this._view.btn_lottery.updateCost(cfg.value, false, "", false);
            this._view.btn_lottery.img_cost.visible = false;
            this._view.btn_lottery.setHint(num >= cfg.value[1]);
        }

        update(time: base.Time): void {
            if (!this._doing) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            let cfg: PropConfig = this._prop.cfg;
            let seconds: number = cfg.param1[0][0];
            let endTime: number = this._doing.begin_time + seconds;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime < 0) {
                leftTime = 0;
            }
            this._view.lab_time.text = TimeUtil.formatSecond(leftTime, "d天H时", true);
        }

        private onClickSpeedUp(): void {
            ViewMgr.getIns().showSecondPop(ModName.Consecrate, ConsecrateViewType.ConsecrateSpeedUp);
        }

        private onClickPreview(): void {
            ViewMgr.getIns().showSecondPop(ModName.Consecrate, ConsecrateViewType.ConsecratePreview);
        }

        private onClickLottery(): void {
            ViewMgr.getIns().showSecondPop(ModName.Consecrate, ConsecrateViewType.ConsecrateLottery);
        }

        private onClickAuto(): void {
            this._proxy.c2s_consecrate_get(2);
        }

        private onClickAdd(): void {
            let list = this._proxy.getPropList();
            if (!list || !list.length) {
                //PromptBox.getIns().show("已无魔魂封印");
                ViewMgr.getIns().showGainWaysTips(PropIndex.MoHun);
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Consecrate, ConsecrateViewType.ConsecrateShelf);
        }

        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.ConsecrateIcon);//清除指引
            GuideMgr.getIns().clear(GuideKey.ConsecrateSpeed);//清除指引
            GuideMgr.getIns().clear(GuideKey.ConsecrateIconFinal);//清除指引
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }
    }
}