namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;
    import facade = base.facade;
    import NvshenShijianConfig = game.config.NvshenShijianConfig;
    import Handler = base.Handler;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import ParamConfig = game.config.ParamConfig;

    export class TimeGoddessEventChallengeMdr extends EffectMdrBase {
        private _view: XujieTansuoBossGridView = this.mark("_view", XujieTansuoBossGridView);
        private _itemList: ArrayCollection;
        private _proxy: GoddessRecordProxy;
        protected _showArgs: NvshenShijianTypeConfig;
        private _index: number;
        private _cfg: NvshenShijianConfig;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._view.btn_zhenrong.visible = true;
            this._view.btn_zhanbao.visible = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_zhenrong, TouchEvent.TOUCH_TAP, this.onClickZhenrong);
            addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);

            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_EVENT_INFO, this.updateView, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.updateBtn, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickZhenrong(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.Zhenrong);
        }

        private onClickChallenge(): void {
            if(!ViewMgr.getIns().checkZhenrong(true)){
                return;
            }
            if(!this._cfg){
                return;
            }
            ViewMgr.getIns().checkZhenrongGod(this._cfg.god, Handler.alloc(this._proxy,this._proxy.c2s_chuang_shi_nv_shen_system_click, [TimeGoddessOpType.Event]));
        }

        private updateView(): void {
            this._view.secondPop.updateTitleStr(this._showArgs.name);

            let index = this._showArgs.index;
            this._index = index;
            let stage = this._proxy.getEventStage(index);
            if(stage <= 0){
                let pCfg: ParamConfig = GameConfig.getParamConfigById("chuangshi_nvshen_touxiang");
                let systemInfo: number[] = pCfg && pCfg.value;//头像ID、相框ID、性别1男2女
                let data: EventChatData = {desc: this._showArgs.desc, systemInfo: systemInfo};
                facade.showView(ModName.More, MoreViewType.EventChat, data);
            }

            let curStage = stage + 1;
            let maxStage = this._proxy.getEventMaxStage(index);
            if(curStage > maxStage){
                this.hide();
                return;
            }
            let cfgList: object = getConfigByNameId(ConfigName.NvshenShijian, index);
            let cfg: NvshenShijianConfig = cfgList[curStage];
            this._cfg = cfg;
            this.addBmpFont(cfg.god + "", BmpTextCfg[BmpTextType.XujietansuoTbs], this._view.gr_power, true, 1, false, 0, true);

            this._itemList.source = cfg.show_reward;

            this._view.bar.show(100,100, false,0,false, ProgressBarType.Percent);
            
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, cfg.bossId);
            this._view.nameItem.updateShow(monsterCfg.name);

            this.updateBtn();
            //todo，背景
        }

        private updateBtn(): void {
            let canChallenge = ViewMgr.getIns().checkZhenrong();
            this._view.btn_challenge.labelDisplay.text = canChallenge ? getLanById(LanDef.tishi_14) : getLanById(LanDef.huanggu_nvshen_tips25);
            this._view.btn_challenge.redPoint.visible = this._proxy.checkEventPerHint(this._index);
        }
    }
}