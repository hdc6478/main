namespace game.mod.scene {
    import SceneConfig = game.config.SceneConfig;
    import facade = base.facade;

    export class OnSceneEnterCmd extends CmdBase {
        private _proxy: SceneProxy;
        private _cfg: SceneConfig;

        public exec(n: base.GameNT): void {
            super.exec(n);
            this._proxy = this.retProxy(ProxyType.Scene);
            this._cfg = getConfigByNameId(ConfigName.Scene, this._proxy.curSceneIdx);

            LogUtil.printLogin("进入场景，打开界面");
            this.showView(this._proxy.curSceneType);
            this.checkLastScene(this._proxy.curSceneType, this._proxy.getSceneType(this._proxy.lastSceneIdx));

            // 清掉落飘字队列
            PropTipsMgr.getIns().clear();

            if (this._cfg && this._cfg.music && !gso.isBgMusic) {
                SoundMgr.ins.setBg(ResUtil.getSoundUrl(this._cfg.music));
            }
        }

        /**
         * 检测上一个场景，用于关闭界面或者保存界面数据
         * @param {number} type 当前
         * @param {number} lastType 上一次
         */
        private checkLastScene(type: number, lastType: number): void {
            if (!lastType) {
                return;
            }
            if (this.sceneTypeToViewData[lastType]) {
                let data = this.sceneTypeToViewData[lastType];
                facade.hideView(data[0], data[1]);//副本场景
            }
            if (this.pvpTypeToViewData[lastType]) {
                let data = this.pvpTypeToViewData[lastType];
                facade.hideView(data[0], data[1]);//pvp场景
            }
            if (type == SceneType.HangUp2 && lastType != SceneType.HangUp2) {
                //副本返回挂机场景时，清除奖励预览id
                SceneUtil.resetReward();
                //返回之前的副本界面
                if (lastType == SceneType.Fuben && !gso.fubenChallenge) {
                    //上一次是个人副本界面时，且是第一次挑战
                    let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                    miscProxy.setSetting(SettingKey.fubenChallenge, "1");
                    ViewMgr.getIns().showMain();
                }else if(gso.isBackMain){
                    // 1、挑战幻境之海最后一关，圣界副本 胜利 回到主界面，策划需求，后续要这样的需求，可以同用该变量
                    ViewMgr.getIns().showMain();
                } else {
                    ViewMgr.getIns().backLast();
                }
            }

            if (lastType == SceneType.Forbidden || lastType == SceneType.Xianta) {
                let iProxy: IResultProxy = facade.retMod(ModName.Result).retProxy(ProxyType.Result);
                if (!iProxy.is_success && !PayUtil.checkFirstCharge()) {
                    // facade.showView(ModName.Activity, MainActivityViewType.FirstCharge);
                    ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FirstCharge);
                }
            }
        }

        /**
         * 进入场景(打开界面)
         * @param {number} type
         */
        private showView(type: number): void {
            if (this.sceneTypeToViewData[type]) {
                let data = this.sceneTypeToViewData[type];
                facade.showView(data[0], data[1]);//副本场景
            }
            if (SceneUtil.isPvpScene()) {
                if (this.pvpTypeToViewData[type]) {
                    let data = this.pvpTypeToViewData[type];
                    facade.showView(data[0], data[1]);
                    return;
                }
                //PVP场景通用界面
                facade.showView(ModName.Scene, SceneViewType.PvpFight);
            }
            //特殊场景自己处理下
        }

        /**场景类型映射副本界面，没有自己场景界面的不需要处理，todo*/
        private sceneTypeToViewData: { [sceneType: number]: string[] } = {
            [SceneType.Fuben]: [ModName.Shilian, ShilianViewType.FubenScene],//副本场景
            [SceneType.Xianta]: [ModName.Shilian, ShilianViewType.XiantaScene],//仙塔副本场景
            [SceneType.Forbidden]: [ModName.Shilian, ShilianViewType.ForbiddenScene],//禁地副本场景
            [SceneType.Yuanling]: [ModName.Shilian, ShilianViewType.YuanlingScene],//元灵副本场景
            [SceneType.CrossBoss]: [ModName.Boss, BossViewType.CrossBossScene],//跨服boss场景
            [SceneType.Yijie]: [ModName.Yijie, YijieViewType.YijieScene],//异界场景
            [SceneType.YonghengYijie]: [ModName.Yijie, YijieViewType.YonghengYijieScene],//永恒异界场景
            [SceneType.XianlvShilian]: [ModName.Xianyuan, XianyuanViewType.ShilianScene],//仙侣试炼
            [SceneType.Abyss]: [ModName.Boss, BossViewType.AbyssScene],//坠魔深渊
            [SceneType.Fengmo]: [ModName.More, MoreViewType.FengmoScene],//仙宗封魔
            [SceneType.Sea]: [ModName.Yijie, YijieViewType.SeaScene],//幻境之海
            [SceneType.KuafuDoufa]: [ModName.Compete, CompeteViewType.KuafuDoufaScene],//跨服斗法
            [SceneType.XianjieLuandou]: [ModName.More, MoreViewType.XianjieLuandouScene],//仙界乱斗
        };

        private pvpTypeToViewData: { [sceneType: number]: string[] } = {
            [SceneType.XianlvDoufa]: [ModName.Xianyuan, XianyuanViewType.XianlvDoufaScene],//仙侣斗法
        }

    }
}
