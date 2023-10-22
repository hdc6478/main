/** @internal */
namespace game {
    import PoolObject = base.PoolObject;
    import Event = egret.Event;
    import IOErrorEvent = egret.IOErrorEvent;

    export class ResLdr implements PoolObject {
        public static JsonObj: { [key: string]: any } = Object.create(null);

        /** @internal */ private _loader: egret.EventDispatcher;
        /** @internal */ private _url: string;
        /** @internal */ private _type: string;
        /** @internal */ private _rUrl: string;

        public load(url: string, type: string): void {
            let self = this;
            let ext: string = getUrlExt(url);
            if (type === ResType.JSON) {
                let obj = ResLdr.getJson(url);
                if (obj) {
                    LoadMgr.ins.onSucc(url, obj);
                    return;
                }
                if (gso.zipCfg) {
                    type = ResType.ZIP;
                }
            }
            self._type = type;
            self._url = url;
            let fn = getTypeLdr(url, type);
            self._rUrl = LoadMgr.ins.getRealUrl(url, ext);
            let isFun:boolean = typeof fn === "function";
            if (isFun && self._rUrl) {
                let loadUrl = self._rUrl.indexOf("://") > -1 ? self._rUrl : gso.cdn_url + self._rUrl;
                if (type === ResType.ZIP) {
                    loadUrl = loadUrl.replace(".json", ".zip");
                }

                self._loader = fn(loadUrl, url);

                if(url.indexOf("data.txt") > -1){
                    console.info("data.txt " + url);
                    console.info("data.txt " + self._rUrl);
                }

                self._loader.addEventListener(Event.COMPLETE, self.onSucc, self);
                self._loader.addEventListener(IOErrorEvent.IO_ERROR, self.onFail, self);
            } else {
                // if(!self._rUrl || self._rUrl == ""){
                //     gAlert("加载的链接地址为"+self._rUrl);
                // }
                // if(self._rUrl && self._rUrl.indexOf("data.txt") >= 0){
                //     gAlert("加载data.txt失败，"+ isFun +" ... " +self._rUrl);
                // }
                self.onFail();
            }
        }

        protected onSucc(): void {
            let self = this;
            let fn = getTypeDcd(self._url, self._type);
            if(self._url.indexOf("data.txt") > -1){
                console.info("data.txt onSucc");
            }
            let data: any;
            if (typeof fn === "function") {
                data = fn(self._loader, self._url);
            }
            if (data instanceof Error) {
                console.error(self._url, data);

                if(self._url.indexOf("data.txt") > -1){
                    console.info("data.txt fail");
                }

                LoadMgr.ins.onFail(self._url, self._rUrl, null, null);
            } else {

                if(self._url.indexOf("data.txt") > -1){
                    console.info("data.txt onSucc");
                }

                LoadMgr.ins.onSucc(self._url, data);
            }
        }

        protected onFail(e?: Event): void {

            if(this._url.indexOf("data.txt") > -1){
                console.info("data.txt onFail");
            }

            let errMsg: string, errCode: number;
            if (e && e.data) {
                let data: { code?: number, errMsg?: string } = e.data;
                errMsg = data.errMsg;
                errCode = data.code;
            }
            LoadMgr.ins.onFail(this._url, this._rUrl, errMsg, errCode);
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            if (self._loader) {
                self._loader.removeEventListener(Event.COMPLETE, self.onSucc, self);
                self._loader.removeEventListener(IOErrorEvent.IO_ERROR, self.onFail, self);
            }
            self._loader = undefined;
            self._url = undefined;
            self._rUrl = undefined;
            self._type = undefined;
        }

        /** @internal */ private static getJson(url: string): any {
            return this.JsonObj[url] = parseObj(this.JsonObj[url]);
        }

    }

}
