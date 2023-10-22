namespace game.mod.scene {
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class OnSceneReadyCmd extends CmdBase {

        public exec(n: GameNT): void {
            let self = this;
            SoundMgr.ins.setBg(null);

            //PVP场景设置模型缩放
            //gso.avatarScale = SceneUtil.isPvpScene() ? 1 : 1.25;

            let proxy: SceneProxy = self.retProxy(ProxyType.Scene);

            self.checkEnter(proxy.curSceneType);

            if (proxy.lastSceneIdx > 0) {
                self.sendNt(SceneEvent.CLEAN_SCENE);
                LoadMgr.ins.checkNow();
            }

            self.sendNt(SceneEvent.LOAD_SCENE_CFG);//加载配置
            self.sendNt(SceneEvent.SCENE_CHANGE);
        }

        /**
         * 进入场景关闭界面，资源为加载
         * @param {number} type
         */
        private checkEnter(type: number) {
            if (type != SceneType.Yuanling){
                let yuanlingProxy: IYuanLingProxy = facade.retMod(ModName.Shilian).retProxy(ProxyType.YuanlingFuben);
                yuanlingProxy.onClearInvitedTeam();//清除组队信息
            }
            if (type == SceneType.HangUp2) {
                //挂机战斗不关闭界面
                let passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                passProxy.challengeBoss = false;//重置挑战挂机boss
                return;
            }

            //进入非挂机场景时，保存上一次的界面数据
            ViewMgr.getIns().saveLast();
            /**一般不需要处理，统一走ViewMgr关闭就行了*/
            ViewMgr.getIns().hideMainView();
        }
    }
}
