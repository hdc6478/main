namespace game.mod.activity {


    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import ShenlingConfig = game.config.ShenlingConfig;

    export class ChengshenMdr extends MdrBase implements UpdateItem {
        private _view: ChengshenView = this.mark("_view", ChengshenView);
        private _proxy: ChengshenProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Chengshen);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_jiban, TouchEvent.TOUCH_TAP, this.onClickJiban, this);
            addEventListener(this._view.btn_type1, TouchEvent.TOUCH_TAP, this.onClickType1, this);
            addEventListener(this._view.btn_type2, TouchEvent.TOUCH_TAP, this.onClickType2, this);

            this.onNt(TaskEvent.ON_TASK_UPDATE, this.onTaskUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_CHENGSHEN_REWARD, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateHint();
            this.updateTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onTaskUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if (types.indexOf(TaskType.Chengshen) > -1) {
                this.updateHint();
            }
        }

        private onInfoUpdate(): void {
            this.updateHint();
        }

        private onClickJiban(): void {
            facade.showView(ModName.Activity, MainActivityViewType.ChengshenJiban);
        }

        private onClickType1(): void {
            facade.showView(ModName.Activity, MainActivityViewType.ChengshenTask, ChengshenType.Summon);
        }

        private onClickType2(): void {
            facade.showView(ModName.Activity, MainActivityViewType.ChengshenTask, ChengshenType.Pass);
        }

        private initShow(): void {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("chengshen_rewards");
            let infos: number[][] = paramCfg.value;
            for(let i = 0; i < infos.length && i < 2; ++i){
                let reward = infos[i];
                let propIndex = reward[0];
                let cfg: PropConfig = GameConfig.getPropConfigById(propIndex);
                let index = cfg.param1 ? cfg.param1[0][0] : 0;
                let shenlingCfg = getConfigById(index) as ShenlingConfig;
                let item = this._view["item" + i] as AvatarNameSrItem;
                item.updateShow(shenlingCfg.name, shenlingCfg.quality);
            }
        }

        private updateHint(): void {
            this._view.btn_type1.redPoint.visible = this._proxy.getHintByType(ChengshenType.Summon);
            this._view.btn_type2.redPoint.visible = this._proxy.getHintByType(ChengshenType.Pass);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = this._proxy.getEndTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
            if(leftTime <= 0){
                TimeMgr.removeUpdateItem(this);
            }
        }
    }
}