namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;

    const DefaultCfgRoot: string = "assets/data/";
    const ServerCfgRoot: string = "assets/data_server/";

    export class InitCfg {
        private static _urlList: string[];
        private static CfgRoot: string;

        public static getNum(handler: Handler): void {
            let self = this;
            let mgr = LoadMgr.ins;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            // if (gso.jzsj_channel === CHANNEL_NAME.VIVO || gso.jzsj_channel === CHANNEL_NAME.OPPO) {
            //     self.CfgRoot = "assets/data_ov/";
            // }
            // else if (gso.jzsj_channel === CHANNEL_NAME.SHOUQ || gso.jzsj_channel === CHANNEL_NAME.QZONE) {
            //     self.CfgRoot = "assets/data_shouq/";
            // }else
            if (gso.isWeixin || gso.source == CHANNEL_NAME.SHENGYE || gso.source == CHANNEL_NAME.SHENGYEAUDIT || gso.source == CHANNEL_NAME.SHENGYE_SHIPIN) {
                self.CfgRoot = "assets/data_weixin/";
            } else {
                self.CfgRoot = DefaultCfgRoot;
            }
            console.info("加载配置文件");
            mgr.load(self.CfgRoot + "data_cfg.json",
                Handler.alloc(self, (list: string[], url: string) => {
                    self._urlList = [];
                    for (let f of list) {
                        self._urlList.push(self.CfgRoot + f);
                    }
                    self._urlList.push(ServerCfgRoot + "tips_client.json");

                    self._urlList.push(ServerCfgRoot + "gm_doc.json");
                    handler.exec(self._urlList.length);
                    Pool.release(handler);
                }),
                LoadPri.Init);
        }

        public static load(): void {
            let self = this;
            if (!self._urlList) {
                return;
            }
            let mgr = LoadMgr.ins;
            mgr.loadGroup(self._urlList,
                Handler.alloc(self, (idx: number): void => {
                    if (self.CfgRoot !== DefaultCfgRoot) {
                        for (let url of self._urlList) {
                            if (url.indexOf(self.CfgRoot) === 0) {
                                let res = mgr.getRes(url);
                                mgr.unload(url);
                                mgr.addJsonRes(url.replace(self.CfgRoot, DefaultCfgRoot), res);
                            }
                        }
                    }
                    self._urlList = null;
                }),
                LoadPri.Init,
                Handler.alloc(self, (idx: number, url: string) => resLoaded())
            );
        }

    }
}
