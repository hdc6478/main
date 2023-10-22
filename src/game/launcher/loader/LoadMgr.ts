namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;
    import ByteArray = egret.ByteArray;
    import Texture = egret.Texture;
    import delayCall = base.delayCall;

    /** @internal */ export let TextureScale: number = 1;
    /** @internal */ export let VerCfgUrl: string;

    export class LoadMgr implements UpdateItem {
        /** @internal */ private static _ins: LoadMgr;
        public static get ins(): LoadMgr {
            if (!this._ins) {
                this._ins = new LoadMgr();
            }
            return this._ins;
        }

        /** @internal */ public urlHash: any;

        public static SheetData: string = "assets/data/sheet.json";
        public static VCfg: string = "assets/data/vcfg.json";
        public static FailList:{[key: string]:number} = {};

        /** @internal */ private _resMap: { [key: string]: any };
        /** @internal */ private _loadingMap: { [key: string]: LoadingItem };
        /** @internal */ private _workingList: LoadingItem[];
        /** @internal */ private _waitingList: LoadingItem[];
        /** @internal */ private _succList: string[];
        /** @internal */ private _failList: { url: string, realUrl: string, errMsg: string, errCode: number }[];
        /** @internal */ private _groupInfo: { [key: number]: { urls: string[], loaded: string[], onComp: Handler, onProg?: Handler } };
        /** @internal */ private _imgTmp: { [key: string]: { count: number, time: number, pri: number } };

        /** @internal */ private _lastCheck: number;
        /** @internal */ private _uiShow: boolean = false;
        /** @internal */ private _lastGcT: number = 0;
        /** @internal */ private _gcInterval: number;

        //默认资源的释放时间
        private _releaseTime: number;
        //动画资源的释放时间
        private _aniReleaseTime:number;
        //地图释放时间
        private _mapReleaseTime:number;
        //公共资源释放时间
        private _commonUIReleaseTime:number;
        //ui 资源释放时间
        private _UIReleaseTime:number;

        /** @internal */ private static GroupIdx: number = 1;

        /** @internal */ constructor() {
            this.init();
        }

        /** @internal */ private init(): void {
            egret.ImageLoader.crossOrigin = "anonymous";
            let self = this;
            self._resMap = Object.create(null);
            self._loadingMap = Object.create(null);
            self._workingList = [];
            self._waitingList = [];
            self._succList = [];
            self._failList = [];
            self._groupInfo = Object.create(null);
            self._imgTmp = Object.create(null);

            //3分钟
            self._releaseTime = 180000;
            //1分钟
            self._mapReleaseTime = 60000;


            self._gcInterval = 360000;
            self._lastCheck = 0;
            self._lastGcT = base.TimeMgr.time.time;
            TimeMgr.addUpdateItem(self);
        }

        /** @internal */ public loadSheet(handler: Handler): void {
            let self = this;
            let url: string = LoadMgr.SheetData;
            if (!self.exists(url)) {
                handler.exec([url,url]);
                Pool.release(handler);
                return;
            }
            let onLoaded = (data: string[], url: string) => {
                self._resMap[url] = null;
                delete self._resMap[url];
                new JsonTask().start(data,
                    Handler.alloc(self, (obj: { key: string, value: any }) => {
                        self.addJsonRes(obj.key, obj.value);
                    }),
                    Handler.alloc(self, () => {
                        handler.exec([url,url]);
                    }));
            };
            self.load(url, Handler.alloc(self, onLoaded), LoadPri.Init);
        }

        public loadJsonList(jsonList: string[], onProg: Handler, onComp: Handler): void {
            if (!jsonList || !jsonList.length) {
                return;
            }
            let self = this;
            let cnt = 0;
            let tot = jsonList.length;

            let strJsonList = jsonList.toString();
            function compOne() {
                onProg.exec();
                cnt++;
                if (cnt == tot) {
                    onComp.exec([strJsonList,strJsonList]);
                    Pool.release(onProg);
                    Pool.release(onComp);
                }
            }

            function onOneJson(idx: number, url: string): void {
                let data: string[] = self._resMap[url];
                new JsonTask().start(
                    data,
                    Handler.alloc(self, (obj: { key: string, value: any }) => {
                        if (obj.key.indexOf("assets/") > -1) {
                            self.addJsonRes(obj.key, obj.value);
                        } else {
                            self._resMap[obj.key] = obj.value;
                            self.addRef(obj.key);
                        }
                    }),
                    Handler.alloc(self, compOne)
                );
                delayCall(Handler.alloc(self, () => self.unload(url)));
            }

            self.loadGroup(jsonList, null, LoadPri.Init, Handler.alloc(self, onOneJson));
        }

        //提前加载数据
        public loadPreData(url: string) {
            let self = this;

            function onOneJson(data: any): void {
                let _keys: string[] = data ? Object.keys(data) : null;
                if (_keys && _keys.length) {
                    for (let _k of _keys) {
                        self.addJsonRes(_k, data[_k]);
                    }
                }
                delayCall(Handler.alloc(self, () => self.unload(url)));
            }

            self.load(url, Handler.alloc(this, onOneJson), LoadPri.UIScene);
        }

        public getRealUrl(url: string, ext: string): string {
            if (url.indexOf("://") > -1 && url.indexOf(gso.cdn_url) < 0) {
                return url;
            }
            if (/^assets\/\w{2,}\/\w{32}\.\w+$/.test(url)) {
                return url;
            }
            if (ext === ".txt") {
                return url;
            }
            if (url === LoadMgr.VCfg) {
                return VerCfgUrl;
            }
            let self = this;
            if (!self.urlHash) {
                return url;
            }
            let arr = url.split("/");
            let hash: string = self.getHashArr(arr);
            if (hash) {
                let dirname: string = hash.substr(0, 2);
                if (dirname === "ad") {
                    dirname = "dirad";
                }
                return "assets/" + dirname + "/" + hash + ext;
            }
            if (url.indexOf("assets/map/") > -1) {
                hash = LoadMgr.ins.getHashArr(arr.slice(0, 3));
                if (hash) {
                    arr[2] = hash;
                    return arr.join("/");
                }
            }
            return null;
        }

        /** @internal */ private getHashArr(arr: string[]): string {
            let obj: any = this.urlHash;
            let i: number = 0;
            let len: number = arr.length;
            while (obj && i < len) {
                obj = obj[arr[i]];
                i++;
            }
            return typeof obj === "string" ? obj : null;
        }

        public exists(url: string): boolean {
            if (!this.urlHash) {
                return false;
            }
            return this.getHashArr(url.split("/")) !== null;
        }

        public getRes(url: string): any {
            let json = ResLdr.JsonObj[url];
            if (json) {
                return json;
            }
            return this._resMap[url];
        }

        public setUIShow(value: boolean): void {
            let self = this;
            if (self._uiShow === value) {
                return;
            }
            self._uiShow = value;
            if (value) {
                self.checkNow();
            }
        }

        public getAnimDur(url: string): number[] {
            let data: any = this.getRes(url + MergeCfgType.Json);
            if (!data) {
                data = this.getRes(url + MergeCfgType.Bin);
                if (!data) {
                    return null;
                }
            }
            let result: number[] = [];
            let s = MergedBmp;
            let idx: number = s.Pos.indexOf("dur");
            if (Array.isArray(data)) {
                for (let frame = 0, numFrames = data.length; frame < numFrames; frame++) {
                    result.push(data[frame][idx]);
                }
            } else if (data instanceof ByteArray) {
                data.position = 0;
                let numFrames: number = data.readShort();
                for (let frame: number = 0; frame < numFrames; frame++) {
                    data.position = s.HeadSize + (s.Pos.length * frame + idx) * s.Size;
                    result.push(data.readShort());
                }
            }
            return result;
        }

        /**检测是否还需要再次下载*/
        public checkNeedLoad(url:string):boolean{
            let  errorNum = LoadMgr.FailList[url] || 0;
            return errorNum < 1;
        }

        /**已经加载过的资源，重复加载是不会执行onSucc回调的*/
        public load(url: string, onSucc: Handler, priority: number, onFail?: Handler): void {
            if (url == "") {
                return;
            }

            if(!this.checkNeedLoad(url)){
                return ;
            }

            let self = this;
            let workIdx: number = -1;
            let item: LoadingItem = self.getLoadingItem(url);
            if (!item) {
                item = Pool.alloc(LoadingItem);
                item.url = url;
                self._loadingMap[url] = item;
            } else {
                workIdx = self._workingList.indexOf(item);
            }
            let o = this._imgTmp[url];
            if (o && o.pri > priority) {
                o.pri = priority;
            }
            item.priority = priority;
            item.addSucc(onSucc);
            item.addFail(onFail);
            let res: any = self.getRes(url);
            if (res) {
                if (self._succList.indexOf(url) < 0) {
                    self._succList.push(url);
                }
                return;
            }
            if (workIdx > -1) {
                return;
            }
            self.addToWait(item);
        }

        public unload(url: string): void {
            if (!url) {
                return;
            }
            let self = this;
            let item: LoadingItem = self.getLoadingItem(url);
            if (item) {
                if (item.mergedBmp) {
                    let imgItem: LoadingItem = self.getLoadingItem(item.url + ExtPng);
                    if (imgItem) {
                        self.removeWorking(imgItem.url);
                        self.removeProcessing(imgItem.url);
                    }
                }
                self.removeWorking(url);
                self.removeProcessing(url);
            }
            let res = self._resMap[url];
            if (res) {
                if (res instanceof MergedBmp) {
                    Pool.release(res);
                } else if (res instanceof Texture) {
                    Pool.release(res);
                } else if (typeof res.dispose === "function") {
                    res.dispose();
                }
            }
            self._resMap[url] = null;
            delete self._resMap[url];
        }

        public addJsonRes(url: string, res: any): void {
            ResLdr.JsonObj[url] = res;
        }

        public loadMerge(url: string, onSucc: Handler, priority: number, frameRate?: number): void {

            if(!this.checkNeedLoad(url)){
                console.error(url+ " loadMerge 不需要再次触发下载");
                return ;
            }

            let type = MergeCfgType.Json;
            let self = this;
            let item: LoadingItem = self.getLoadingItem(url);
            if (!item) {
                item = Pool.alloc(LoadingItem);
                item.url = url;
                item.priority = priority;
                self._loadingMap[url] = item;
            }
            let o = this._imgTmp[url];
            if (o && o.pri > priority) {
                o.pri = priority;
            }
            item.addSucc(onSucc);

            let res: MergedBmp = self.getRes(url);
            if (res) {
                if (self._succList.indexOf(url) < 0) {
                    self._succList.push(url);
                }
            } else if (!item.mergedBmp) {
                let mergedBmp = Pool.alloc(MergedBmp);
                item.mergedBmp = mergedBmp;
                mergedBmp.init(url, type, priority, frameRate);
                LoadMgr.ins.load(url + ExtPng, Handler.alloc(mergedBmp, mergedBmp.imgLoaded), priority);
                LoadMgr.ins.load(url + type, Handler.alloc(mergedBmp, mergedBmp.cfgLoaded), priority);
            } else {
                if (item.priority > priority) {
                    let pngItem = self.getLoadingItem(url + ExtPng);
                    if (pngItem) {
                        pngItem.priority = priority;
                    }
                    let typeItem = self.getLoadingItem(url + type);
                    if (typeItem) {
                        typeItem.priority = priority;
                    }
                    item.priority = priority;
                }
            }
        }

        /** @internal */ public onMergedLoaded(merged: MergedBmp): void {
            let self = this;
            let url: string = merged.url;
            let item: LoadingItem = self.getLoadingItem(url);
            if (item) {
                item.mergedBmp = null;
            }
            self._resMap[url + ExtPng] = null;
            delete self._resMap[url + ExtPng];
            self._resMap[url] = merged;
            if (self._succList.indexOf(url) < 0) {
                self._succList.push(url);
            }
        }

        public addRef(url: string): void {
            if (!url) {
                return;
            }
            let o = this._imgTmp[url];
            let t = TimeMgr.time.time;
            if (!o) {
                this._imgTmp[url] = {count: 1, time: t, pri: LoadPri.Max};
            } else {
                o.count = o.count + 1;
                o.time = t;
            }
        }

        public decRef(url: string): void {
            if (!url) {
                return;
            }
            let o = this._imgTmp[url];
            if (!o) {
                return;
            }
            o.count = o.count - 1;
            o.time = TimeMgr.time.time;
        }

        public checkNow(): void {
            let self = this;
            let tmpDel = [];
            for (let k in self._imgTmp) {
                let o = self._imgTmp[k];
                if (o && o.count < 1) {
                    self.unload(k);
                    tmpDel.push(k);
                }
            }
            for (let k of tmpDel) {
                delete self._imgTmp[k];
            }
            // if (ggo.triggerGC) {
            //     self._lastGcT = base.TimeMgr.time.time;
            //     ggo.triggerGC();
            // }
        }

        public loadGroup(list: string[], onComp: Handler, priority: number, onProg?: Handler): number {
            let idx = LoadMgr.GroupIdx++;
            this._groupInfo[idx] = {urls: list, loaded: [], onComp, onProg};
            for (let url of list) {
                this.load(url, Handler.alloc(this, this.onGroupOne), priority, Handler.alloc(this, this.onGroupFail));
            }
            return idx;
        }

        /** @internal */ public loadMergeGroup(list: string[], onComp: Handler, priority: number, onProg?: Handler): number {
            let idx = LoadMgr.GroupIdx++;
            this._groupInfo[idx] = {urls: list, loaded: [], onComp, onProg};
            for (let url of list) {
                this.loadMerge(url, Handler.alloc(this, this.onGroupOne), priority);
            }
            return idx;
        }

        /** @internal */ public getGroupLoaded(idx: number): number {
            let info = this._groupInfo[idx];
            if (info) {
                return info.loaded.length;
            }
            return 0;
        }

        /** @internal */ private onGroupOne(data: any, url: string): void {
            this.progGroup(url);
        }

        /** @internal */ private onGroupFail(url: string): void {
            this.progGroup(url);
        }

        /** @internal */ private progGroup(url: string): void {
            let tmpDel = [];
            let idx = this.getGroupIdx(url);
            if (idx === 0) {
                return;
            }
            let info = this._groupInfo[idx];
            if (info.loaded.indexOf(url) < 0) {
                info.loaded.push(url);
            }
            if (info.onProg) {
                info.onProg.exec([idx, url]);
            }
            if (info.loaded.length === info.urls.length) {
                if (info.onComp) {
                    info.onComp.exec(idx);
                }
                tmpDel.push(idx);
            }
            for (idx of tmpDel) {
                info = this._groupInfo[idx];
                this._groupInfo[idx] = null;
                delete this._groupInfo[idx];
                Pool.release(info.onComp);
                Pool.release(info.onProg);
            }
        }

        /** @internal */ private getGroupIdx(url: string): number {
            for (let idx in this._groupInfo) {
                let info = this._groupInfo[idx];
                if (info && info.urls.indexOf(url) > -1) {
                    return +idx;
                }
            }
            return 0;
        }

        /** @internal */ private getLoadingItem(url: string): LoadingItem {
            return this._loadingMap[url];
        }

        /** @internal */ private addToWait(item: LoadingItem): void {
            if (this._waitingList.indexOf(item) > -1) {
                return;
            }
            let list = this._waitingList;
            let idx: number = 0;
            for (; idx < list.length; idx++) {
                let queueItem: LoadingItem = list[idx];
                if (queueItem.priority > item.priority) {
                    break;
                }
            }
            ArrayUtil.insertAt(list, idx, item);
        }

        /** @internal */ private getIsScene(priority: number): boolean {
            return priority === LoadPri.SceneMain
                || priority === LoadPri.SceneMainPet
                || priority === LoadPri.Scene
                || priority === LoadPri.Map;
        }

        /** @internal */ private loadNext(): void {
            let waiting = this._waitingList;
            let working = this._workingList;
            let uiShow = this._uiShow;
            for (let i: number = 0; i < waiting.length; i++) {
                if (working.length >= MAX_LOAD_THREAD) {
                    break;
                }
                let item: LoadingItem = waiting[i];
                if (uiShow && item.type === ResType.IMAGE && this.getIsScene(item.priority)) {
                    continue;
                }
                ArrayUtil.removeAt(waiting, i);
                i--;
                working.push(item);
                item.loader = Pool.alloc(ResLdr);
                item.loader.load(item.url, item.type);
            }
        }

        /** @internal */ private removeWorking(url: string): void {
            let item = this.getLoadingItem(url);
            let idx: number = this._workingList.indexOf(item);
            if (idx > -1) {
                ArrayUtil.removeAt(this._workingList, idx);
            }
        }

        /** @internal */ private removeProcessing(url: string): void {
            let item: LoadingItem = this.getLoadingItem(url);
            if (!item) {
                return;
            }
            let idx: number = this._waitingList.indexOf(item);
            if (idx > -1) {
                ArrayUtil.removeAt(this._waitingList, idx);
            }
            if (item.mergedBmp) {
                Pool.release(item.mergedBmp);
                item.mergedBmp = null;
            }
            if (!item.running) {
                this._loadingMap[url] = null;
                delete this._loadingMap[url];
                Pool.release(item);
            }
        }

        /** @internal */ public onSucc(url: string, data: any): void {
            let self = this;
            self._resMap[url] = data;
            if (self._succList.indexOf(url) < 0) {
                self._succList.push(url);
            }
            self.removeWorking(url);
        }

        /** @internal */ public onFail(url: string, realUrl: string, errMsg: string, errCode: number): void {
            let self = this;
            let item = self.getLoadingItem(url);
            self.removeWorking(url);
            let retryTime = item.priority === LoadPri.Init ? INIT_RETRY_TIME : RETRY_TIME;
            if (item.errCnt < retryTime) {
                item.errCnt++;
                self.addToWait(item);
            } else {
                let update: boolean = false;
                for (let obj of self._failList) {
                    if (obj.url === url) {
                        update = true;
                        obj.errMsg = errMsg;
                        obj.errCode = errCode;
                    }
                }
                if (!update) {
                    self._failList.push({url, realUrl, errMsg, errCode});
                }
            }
        }

        public update(time: Time): void {
            let self = this;
            self.procSucc();
            self.procFail();
            if (time.time - self._lastCheck > 1000) {
                self._lastCheck = time.time;
                self.procRem(time.time);
            }
            self.procWait();
            if (ggo.triggerGC && time.time - self._lastGcT > self._gcInterval) {
                self._lastGcT = time.time;
                ggo.triggerGC();
            }
            self.loadNext();
        }

        /** @internal */ private procWait(): void {
            let self = this;
            let tmpDel = [];
            for (let k in self._imgTmp) {
                let obj = self._imgTmp[k];
                if (!obj || obj.count !== 0) {
                    continue;
                }
                let item: LoadingItem = self.getLoadingItem(k);
                if (!item) {
                    continue;
                }
                let idx: number = self._waitingList.indexOf(item);
                if (idx >= 0) {
                    self.removeProcessing(k);
                    tmpDel[tmpDel.length] = k;
                } else if (item.mergedBmp) {
                    let imgItem: LoadingItem = self.getLoadingItem(item.url + ExtPng);
                    if (!imgItem) {
                        continue;
                    }
                    idx = self._waitingList.indexOf(imgItem);
                    if (idx >= 0) {
                        self.removeProcessing(imgItem.url);
                        self.removeProcessing(item.url);
                        tmpDel[tmpDel.length] = k;
                    }
                }
            }
            for (let k of tmpDel) {
                delete self._imgTmp[k];
            }
        }

        /** @internal */ private procRem(time: number): void {
            let self = this;
            let tmpDel = [];
            for (let k in self._imgTmp) {
                let o = self._imgTmp[k];
                //if (o && o.count < 1 && time - o.time >= self._releaseTime) {
                if (o && o.count < 1) {

                    let releaseTime = self._releaseTime;
                    if(k.indexOf("assets/map") > -1){
                        releaseTime = this._mapReleaseTime;
                    }

                    if(time - o.time >= releaseTime){
                        self.unload(k);
                        tmpDel.push(k);
                    }
                }
            }
            for (let k of tmpDel) {
                delete self._imgTmp[k];
            }
        }

        /** @internal */ private procSucc(): void {
            let self = this;
            for (let url of self._succList) {
                let item = self.getLoadingItem(url);
                if (!item) {
                    continue;
                }
                let data = self.getRes(url);
                item.onSucc(data);
                self.removeProcessing(url);
            }
            self._succList.length = 0;
        }

        /** @internal */ private procFail(): void {
            let self = this;
            for (let obj of self._failList) {
                if (!obj.realUrl) {
                    console.error("res load error:" + "url:" + obj.url);
                    if(!LoadMgr.FailList[obj.url]){
                        LoadMgr.FailList[obj.url] = 1;
                    }else{
                        LoadMgr.FailList[obj.url] += 1;
                    }

                } else if (obj.errCode || obj.errMsg) {
                    if (obj.errCode !== 0 && obj.errMsg !== "time out") {
                        console.error("res load error:" + "url:" + obj.realUrl, "code:" + obj.errCode, "errMsg:" + obj.errMsg);
                        if(!LoadMgr.FailList[obj.url]){
                            LoadMgr.FailList[obj.url] = 1;
                        }else{
                            LoadMgr.FailList[obj.url] += 1;
                        }
                    }
                }
                let url = obj.url;
                let item = self.getLoadingItem(url);
                if (!item) {
                    continue;
                }
                item.onFail();
                self.removeProcessing(url);
            }
            self._failList.length = 0;
        }
    }
}
