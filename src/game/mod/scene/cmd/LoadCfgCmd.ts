namespace game.mod.scene {
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import SceneTools = game.scene.SceneTools;
    import Texture = egret.Texture;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;

    export class LoadCfgCmd extends CmdBase {
        //private firstEnter: boolean;
        private _proxy:ISceneProxy;

        public exec(n: GameNT): void {
            let self = this;
            this._proxy = self.retProxy(ProxyType.Scene);
            //let p: ISceneProxy = self.retProxy(ProxyType.Scene);
            //self.firstEnter = p.firstEnter;

            let mapId = self.getCurMapId();
            if (!mapId) {
                let proxy: ISceneProxy = this.retProxy(ProxyType.Scene);
                console.error("获取地图id错误！", proxy.curSceneIdx);
                return;
            }

            let mskUrl: string = ResUtil.getMapMaskUrl(mapId);
            LoadMgr.ins.addRef(mskUrl);
            // gAlert("加载地图id111，"+mskUrl);
            LoadMgr.ins.load(mskUrl, Handler.alloc(self, self.onLoadCfg), LoadPri.UIScene);

        }

        private getCurMapId(): number {
            let proxy: ISceneProxy = this.retProxy(ProxyType.Scene);
            return SceneTools.getMapIdByScene(proxy.curSceneIdx);
        }

        private onLoadCfg(data: MapInfo, url: string): void {
            let self = this;
            LoadMgr.ins.decRef(url);
            let mapId = self.getCurMapId();
            if (!mapId) {
                console.error("onLoadCfg error1");
                return;
            }

            if (url != ResUtil.getMapMaskUrl(mapId)) {
                console.error("onLoadCfg error2");
                return;
            }

            self.sendNt(SceneEvent.SCENE_CFG_LOADED, data);
            let blurUrl: string = ResUtil.getMapBlurUrl(mapId);
            LoadMgr.ins.addRef(blurUrl);
            LoadMgr.ins.load(blurUrl, Handler.alloc(self, self.onLoadBlur), LoadPri.UIScene);

            if (this._proxy.firstEnter) {

                this._proxy.setFirstEnter(false);
                self.sendNt(MiscEvent.START_GAME);

                let roleVo = RoleVo.ins;
                let roleId = roleVo.role_id.toString();
                let power = roleVo.showpower ? roleVo.showpower.toString() : 0;
                let lv = roleVo.level;
                let name = roleVo.name;
                let vip = VipUtil.getShowVipLv();
                let money = roleVo.diamond.toString();
                let time = TimeMgr.time.serverTimeSecond;
                let loginProxy: ILoginProxy = facade.retMod(ModName.Login).retProxy(ProxyType.Login);
                if(gzyyou.sdk.pointReport) gzyyou.sdk.pointReport(RoleInfoType.Enter, lv, roleId, name, vip, money, time, loginProxy && loginProxy.create_time);
                gzyyou.sdk.loadReport(REPORT_LOAD.SCENE);
                console.log("===============REPORT_LOAD.SCEN")
                // gAlert("加载地图id333，");
            }
        }

        private onLoadBlur(texture: Texture, url: string): void {
            let self = this;
            LoadMgr.ins.decRef(url);
            let mapId = self.getCurMapId();
            if (!mapId) {
                return;
            }
            if (url != ResUtil.getMapBlurUrl(mapId)) {
                return;
            }
            this.sendNt(SceneEvent.SCENE_BLUR_LOADED, texture);
        }
    }
}
