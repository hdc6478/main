namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import delayCall = base.delayCall;

    export class InitMap {
        private static MapData: string = "assets/map/map.json";
        private static _url: string;

        public static getNum(handler: Handler): void {
            let self = this;
            if (gso.configList) {
                handler.exec(0);
                Pool.release(handler);
                return;
            }
            self._url = self.MapData;
            handler.exec(1);
            Pool.release(handler);
        }

        public static load(): void {
            let self = this;
            if (!self._url) {
                return;
            }
            let mgr: LoadMgr = LoadMgr.ins;
            mgr.load(self._url,
                Handler.alloc(self, (data: string[], url: string) => {
                    new JsonTask().start(
                        data,
                        Handler.alloc(self, (obj: { key: string, value: any }) => mgr.addJsonRes(obj.key, obj.value)),
                        Handler.alloc(self, () => {
                            resLoaded();
                            self._url = null;
                        })
                    );
                    delayCall(Handler.alloc(null, () => mgr.unload(url)));
                }),
                LoadPri.Init
            );
        }

    }
}
