namespace game.mod.yijie {

    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TouchEvent = egret.TouchEvent;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class SeaRewardMdr extends EffectMdrBase implements UpdateItem {
        private _view: SeaRewardView = this.mark("_view", SeaRewardView);

        private _itemList: ArrayCollection;
        private _proxy: SeaProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Sea);

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            let type = this._proxy.type;
            let titleStr = getLanById("sea_reward_tips" + type);
            this._view.secondPop.updateTitleStr(titleStr);

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
            this.onNt(SeaEvent.ON_SEA_INFO_UPDATE, this.updateState, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateShow();
            this.removeEft();
            this.addEftByParent(UIEftSrc.XingKongGuDing,this._view.group_eft);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickDraw(): void {
            let type = this._proxy.type;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Reward, type);
        }

        private updateShow(): void {
            let type = this._proxy.type;

            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);

            let bigGate = this._proxy.getCurBigGate(type);
            let smallGate = this._proxy.getPassSmallGate(type);
            let smallGateCfg = this._proxy.getSmallGateCfg(bigGate, smallGate);
            if(!smallGateCfg){
                smallGateCfg = this._proxy.getSmallGateCfg(bigGate, smallGate + 1);//防报错处理
            }
            this._view.seaRewardItem.setData(smallGateCfg.pass_reward);


            let startTime = this._proxy.getStartTime(type);
            //累计挂机时间
            let hour = 0;
            if(startTime){
                let time = TimeMgr.time.serverTimeSecond - startTime;
                hour = Math.floor(time/3600);
            }

            let rate = 0;
            if(hour){
                if(hour < cfg.per_time){
                    rate = cfg.per_time;
                }else if(cfg.per_time < hour && hour < cfg.max_time){
                    rate = hour;
                }else{
                    rate = cfg.max_time;
                }
            }else{
                rate = 0;
            }

            //对数据进行修改
            let data:number[][] = smallGateCfg.pass_reward.concat();
            for(let i = 0; i < data.length; i++){
                data[i] = smallGateCfg.pass_reward[i].concat();
                data[i][1] = data[i][1]*rate;
            }

            this._itemList.source = data;

            let isOpen = this._proxy.isRewardOpen(type);
            if(!isOpen){
                this._view.currentState = "lock";
                this._view.lab_tips.text = cfg.desc;
            }
            else {
                this.updateState();
            }
        }

        private updateState(): void {
            let type = this._proxy.type;
            let canDraw = this._proxy.canRewardDraw(type);
            if(canDraw){
                this._view.currentState = "draw";
                this._view.btn_draw.redPoint.visible = true;
            }
            else {
                this._view.currentState = "time";
                TimeMgr.addUpdateItem(this, 1000);
                this.updateTime();
            }
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let type = this._proxy.type;
            let nextTime = this._proxy.getNextTime(type);
            this._view.timeItem.updateTime(nextTime, getLanById(LanDef.sea_tips9));

            let leftTime = nextTime - TimeMgr.time.serverTimeSecond;
            if(leftTime <= 0){
                TimeMgr.removeUpdateItem(this);
                this.updateState();
            }
        }

    }
}