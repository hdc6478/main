namespace game.mod.more {

    import Monster1Config = game.config.Monster1Config;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import LanDef = game.localization.LanDef;
    import ZhanduiTansuoTypeConfig = game.config.ZhanduiTansuoTypeConfig;
    import Handler = base.Handler;

    export class XujieTansuoBossGridMdr extends EffectMdrBase {
        private _view: XujieTansuoBossGridView = this.mark("_view", XujieTansuoBossGridView);
        private _proxy: XujieTansuoProxy;
        private _gridItemData: IXujieTansuoGridItemData;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_zhanbao, egret.TouchEvent.TOUCH_TAP, this.onClickZhanbao, this);
            addEventListener(this._view.btn_challenge, egret.TouchEvent.TOUCH_TAP, this.onClickChallenge, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._gridItemData = this._showArgs;
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            let data = this._gridItemData;
            let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            if (gridInfo && gridInfo.grid_type == XujieTansuoGridStatus.Null) {
                this.hide();
                return;
            }
            this.updateView();
        }

        //todo 背景图
        private updateView(): void {
            let data = this._gridItemData;
            let grid = data.grid;
            let monsterCfg: Monster1Config = getConfigByNameId(ConfigName.Monster, grid[1]);
            this._view.secondPop.updateTitleStr(monsterCfg && monsterCfg.name || '');

            let power = grid[2];
            this.addBmpFont(power + '', BmpTextCfg[BmpTextType.XujietansuoTbs], this._view.gr_power, true, 1, false, 0, true);
            let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, grid[4]);
            if (rewardCfg) {
                this._listData.replaceAll(rewardCfg.content);
            }

            let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            let hp = gridInfo && gridInfo.boss_hp ? gridInfo.boss_hp.toNumber() : 0;
            let maxHp = gridInfo && gridInfo.boss_max_hp ? gridInfo.boss_max_hp.toNumber() : 0;
            this._view.bar.show(hp, maxHp, false, 0, false, ProgressBarType.Percent);

            let cfg: ZhanduiTansuoTypeConfig = getConfigByNameId(ConfigName.ZhanduiTansuoType, data.type);
            this._view.nameItem.updateShow(cfg.name);
        }

        private onClickZhanbao(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoZhanbao, this._gridItemData);
        }

        private onClickChallenge(): void {
            let data = this._gridItemData;
            if (!this._proxy.shenling_list) {
                PromptBox.getIns().show(getLanById(LanDef.xujietansuo_tips15));
                return;
            }

            let legionAttr = this._proxy.legion_attr;
            let curPower = legionAttr && legionAttr.legion_god ? legionAttr.legion_god.toNumber() : 0;
            let needPower = this._gridItemData.grid[2];
            let mainProxy: IMainProxy = getProxy(ModName.Main, ProxyType.Main);
            let isSel = mainProxy.getNotTipsType(NotTipsType.XujieTansuo);
            if (!isSel) {
                if (curPower < needPower) {
                    ViewMgr.getIns().showNotTips(getLanById(LanDef.xujietansuo_tips5), NotTipsType.XujieTansuo, Handler.alloc(this, this.confirmFunc));
                    return;
                }
            }

            this.confirmFunc();
        }

        private confirmFunc(): void {
            let data = this._gridItemData;
            if (!data) {
                return;
            }
            let gridInfo = this._proxy.getGridInfo(data.type, data.layer, data.row, data.col);
            if (gridInfo && gridInfo.is_challenge) {
                //可以扫荡 todo
                ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoSaodang, this._gridItemData);
            } else {
                //直接挑战 todo
                this._proxy.c2s_zhandui_xujietansuo_role_click(XujieTansuoOperType.Oper5, data.type, data.layer, data.row, data.col);
            }
        }
    }
}