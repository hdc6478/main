namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import Texture = egret.Texture;

    export class AssetsMgr {
        /** @internal */ private static _ins: AssetsMgr;
        public static get ins(): AssetsMgr {
            if (this._ins == null) {
                this._ins = new AssetsMgr();
            }
            return this._ins;
        }

        /** @internal */ public static Root: string = "resource/";

        /** @internal */ public resJson: any;

        /** @internal */ private readonly _cfg: AssetsCfg;
        /** @internal */ private readonly _keyHandler: { [key: string]: Handler[] };
        /** @internal */ private readonly _idxName: { [key: number]: string };
        /** @internal */ private readonly _groupHandler: { [key: string]: { onCompList: Handler[], onProgList: Handler[] } };

        /** @internal */ constructor() {
            this._cfg = new AssetsCfg();
            this._keyHandler = Object.create(null);
            this._idxName = Object.create(null);
            this._groupHandler = Object.create(null);
        }

        public loadConfig(handler: Handler): void {
            let self = this;
            let resUrl = AssetsMgr.Root + "default.res.json";
            if (self.resJson) {
                self._cfg.parse(self.resJson);
                self.resJson = null;
                handler.exec([null,resUrl]);
                Pool.release(handler);
                return;
            }
            LoadMgr.ins.load(resUrl, Handler.alloc(self, (data: any, url: string) => {
                self._cfg.parse(data);
                handler.exec([data,resUrl]);
                Pool.release(handler);
                LoadMgr.ins.unload(url);
            }), LoadPri.Init);
        }

        public getRes(key: string): any {
            let info: ResourceInfo = this.getResInfo(key);
            if (info) {
                let res = LoadMgr.ins.getRes(AssetsMgr.Root + info.url);
                if (res instanceof MergedBmp) {
                    return res.getTexture(key);
                }
                return res;
            }
            return null;
        }

        public getGroup(name: string): string[] {
            return this._cfg.groups[name];
        }

        public getResAsync(key: string, onSucc: Handler): void {
            let self = this;
            let res = self.getRes(key);
            if (res) {
                onSucc.exec([res, key]);
                Pool.release(onSucc);
                return;
            }
            let info: ResourceInfo = self.getResInfo(key);
            if (!info) {
                LoadMgr.ins.load(key, onSucc, LoadPri.UI);
                return;
            }
            let list = self._keyHandler[key];
            if (!list) {
                list = self._keyHandler[key] = [];
            }
            list.push(onSucc);
            if (info.subkeys) {
                LoadMgr.ins.loadMerge(AssetsMgr.Root + info.url, Handler.alloc(self, self.onKeyLoaded), LoadPri.UI);
            } else {
                LoadMgr.ins.load(AssetsMgr.Root + info.url, Handler.alloc(self, self.onKeyLoaded), LoadPri.UI);
            }
        }

        public addRef(key: string): void {
            let info: ResourceInfo = this.getResInfo(key);
            if (info) {
                LoadMgr.ins.addRef(AssetsMgr.Root + info.url);
            } else {
                LoadMgr.ins.addRef(key);
            }
        }

        public decRef(key: string): void {
            let info: ResourceInfo = this.getResInfo(key);
            if (info) {
                LoadMgr.ins.decRef(AssetsMgr.Root + info.url);
            } else {
                LoadMgr.ins.decRef(key);
            }
        }

        /** @internal */ private onKeyLoaded(data: Texture | MergedBmp, url: string): void {
            let self = this;
            let resName: string = self._cfg.urlMap[url.replace(AssetsMgr.Root, "")];
            let info = self.getResInfo(resName);
            let list: Handler[];
            if (info.subkeys) {
                for (let k of info.subkeys) {
                    list = self._keyHandler[k];
                    self._keyHandler[k] = null;
                    self.callHandler(k, list);
                }
            } else {
                list = self._keyHandler[resName];
                self._keyHandler[resName] = null;
                self.callHandler(resName, list);
            }
        }

        /** @internal */ private callHandler(key: string, list: Handler[]): void {
            if (!list) {
                return;
            }
            for (let h of list) {
                h.exec([this.getRes(key), key]);
                Pool.release(h);
            }
        }

        public loadGroup(name: string, onComp: Handler, onProg?: Handler): void {
            let self = this;
            let group = self._cfg.groups[name];
            if (!group) {
                return;
            }
            let urls: string[] = [];
            let isMerged: boolean;
            for (let n of group) {
                let r: ResourceInfo = self.getResInfo(n);
                if (!r) {
                    continue;
                }
                let url: string = AssetsMgr.Root + r.url;
                if (r.subkeys) {
                    isMerged = true;
                }
                if (urls.indexOf(url) < 0) {
                    urls.push(url);
                }
            }
            let groupHandler = self._groupHandler[name];
            if (!groupHandler) {
                groupHandler = self._groupHandler[name] = {
                    onCompList: [],
                    onProgList: []
                };
            }
            let list = groupHandler.onCompList;
            if (list.indexOf(onComp) < 0) {
                list.push(onComp);
            }
            if (onProg) {
                list = groupHandler.onProgList;
                if (list.indexOf(onProg) < 0) {
                    list.push(onProg);
                }
            }
            let idx: number;
            let c: Handler = Handler.alloc(self, self.onGroupComp);
            let p: Handler = Handler.alloc(self, self.onGroupProg);
            if (isMerged) {
                idx = LoadMgr.ins.loadMergeGroup(urls, c, LoadPri.UI, p);
            } else {
                idx = LoadMgr.ins.loadGroup(urls, c, LoadPri.UI, p);
            }
            self._idxName[idx] = name;
        }

        /** @internal */ private onGroupProg(idx: number, url: string): void {
            let name: string = this._idxName[idx];
            if (!this._groupHandler[name]) {
                return;
            }
            let loaded: number = LoadMgr.ins.getGroupLoaded(idx);
            let tmp = [name, url.replace(AssetsMgr.Root, ""), loaded, this.getGroup(name).length];
            let list = this._groupHandler[name].onProgList;
            for (let h of list) {
                h.exec(tmp);
            }
        }

        /** @internal */ private onGroupComp(idx: number): void {
            let self = this;
            let name: string = self._idxName[idx];
            let groupHandler = self._groupHandler[name];
            self._groupHandler[name] = null;
            delete self._groupHandler[name];
            if (!groupHandler) {
                return;
            }
            let list = groupHandler.onCompList;
            for (let h of list) {
                h.exec(name);
                Pool.release(h);
            }
            groupHandler.onCompList = null;
            list = groupHandler.onProgList;
            for (let h of list) {
                Pool.release(h);
            }
            groupHandler.onProgList = null;
        }

        /** @internal */ private getResInfo(key: string): ResourceInfo {
            let cfg = this._cfg;
            if (cfg.subkeyMap[key]) {
                key = cfg.subkeyMap[key];
            }
            return cfg.resMap[key];
        }

    }
}
