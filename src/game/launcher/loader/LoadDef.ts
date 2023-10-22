namespace game {
    import Pool = base.Pool;
    import Texture = egret.Texture;
    import HttpResponseType = egret.HttpResponseType;

    /** @internal */ export const RETRY_TIME: number = 2;
    /** @internal */ export const INIT_RETRY_TIME: number = 9;
    /** @internal */ export const MAX_LOAD_THREAD: number = 8;

    export const LoadPri = {
        Map: 10,
        CreateRole: 20,
        UIScene: 50,
        UI: 80,
        Init: 100,
        SceneMain: 198,
        SceneMainPet: 199,
        Scene: 200,
        Max: 9999
    };

    export const MergeCfgType = {
        Bin: ".bin",
        Json: ".json"
    };

    /**
     * 微信小游戏用到
     */
    export enum ResType {
        IMAGE = "image",
        JSON = "json",
        ZIP = "zip",
        TEXT = "text",
        SOUND = "sound",
        BINARY = "binary",
        KTX = "ktx",
    }

    /** @internal */ const ExtType: { [key: string]: string } = {
        ".png": ResType.IMAGE,
        ".jpg": ResType.IMAGE,
        ".gif": ResType.IMAGE,
        ".jpeg": ResType.IMAGE,
        ".bmp": ResType.IMAGE,
        ".ktx": ResType.KTX,

        ".json": ResType.JSON,
        ".zip": ResType.ZIP,

        ".txt": ResType.TEXT,
        ".exml": ResType.TEXT,
        ".tmx": ResType.TEXT,

        ".mp3": ResType.SOUND,
        ".ogg": ResType.SOUND,
        ".mpeg": ResType.SOUND,
        ".wav": ResType.SOUND,
        ".m4a": ResType.SOUND,
        ".mp4": ResType.SOUND,
        ".aiff": ResType.SOUND,
        ".wma": ResType.SOUND,
        ".mid": ResType.SOUND,
    };

    export function parseObj(obj: any): any {
        if (obj instanceof egret.ByteArray) {
            return JSON.parse(obj.readUTFBytes(obj.bytesAvailable));
        }
        if (typeof obj === "string") {
            try {
                obj = JSON.parse(obj);
            } catch (e) {
            }
        }
        return obj;
    }

    export function getUrlExt(url: string): string {
        let idx = url.lastIndexOf(".");
        if (idx < 0) {
            return "";
        }
        let ext: string = url.substring(idx).toLowerCase();
        let ext_idx = ext.indexOf("?");
        if (ext_idx > -1) {
            ext = ext.substring(0, ext_idx);
        }
        return ext;
    }

    export function getResType(ext: string): string {
        let type = ExtType[ext];
        return type ? type : ResType.BINARY;
    }

    /** @internal */ function loadImg(url: string, source: string): egret.EventDispatcher {
        let loader = new egret.ImageLoader();
        loader.load(url);
        return loader;
    }

    /** @internal */ function loadTxt(url: string, source: string): egret.EventDispatcher {
        let loader = new egret.HttpRequest();
        loader.responseType = HttpResponseType.TEXT;
        loader.setRequestHeader("Content-Type", "text/plain");
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }

    /** @internal */ function loadJson(url: string, source: string): egret.EventDispatcher {
        let loader = new egret.HttpRequest();
        loader.responseType = HttpResponseType.TEXT;
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }

    /** @internal */ function loadBin(url: string, source: string): egret.EventDispatcher {
        let loader = new egret.HttpRequest();
        loader.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }

    /** @internal */ function loadSound(url: string, source: string): egret.EventDispatcher {
        let loader = new egret.Sound();
        loader.load(url);
        return loader;
    }

    /**
     * 微信重载此方法
     */
    export function getTypeLdr(source: string, type: string): (url: string, source: string) => egret.EventDispatcher {
        switch (type) {
            case ResType.IMAGE:
                return loadImg;
            case ResType.JSON:
                return loadJson;
            case ResType.TEXT:
                return loadTxt;
            case ResType.SOUND:
                return loadSound;
            case ResType.BINARY:
            case ResType.KTX:
                return loadBin;
        }
        return null;
    }

    /** @internal */ function dcdImg(loader: egret.EventDispatcher): egret.Texture {
        let texture = Pool.alloc(Texture);
        texture.bitmapData = (<egret.ImageLoader>loader).data;
        return texture;
    }

    /** @internal */ function dcdKtx(loader: egret.EventDispatcher, url: string): egret.Texture {
        let texture = Pool.alloc(Texture);
        let data = (<egret.HttpRequest>loader).response;
        // let ktx = new egret.KTXContainer(data, 1);
        // if (ktx.isInvalid) {
        //     console.error(`ktx: is invalid`);
        //     return null;
        // }
        texture.ktxData = data;
        // let bitmapData = new egret.BitmapData(data);
        // bitmapData.debugCompressedTextureURL = url;
        // bitmapData.format = 'ktx';
        // ktx.uploadLevels(bitmapData, false);
        // texture._setBitmapData(bitmapData);
        return texture;
    }

    /** @internal */ function dcdTxt(loader: egret.EventDispatcher): string {
        return (<egret.HttpRequest>loader).response;
    }

    /** @internal */ function dcdJson(loader: egret.EventDispatcher): any {
        let resp: string = (<egret.HttpRequest>loader).response;
        try {
            return JSON.parse(resp);
        } catch (e) {
            return new Error("len:" + (resp ? resp.length : "undefined") + " " + e.name + ":" + e.message);
        }
    }

    /** @internal */ function dcdBin(loader: egret.EventDispatcher): egret.ByteArray {
        let data = (<egret.HttpRequest>loader).response;
        let bytes;
        if (data instanceof ArrayBuffer) {
            try {
                data = ggo.inflate(data);
            } catch (e) {
            }
            bytes = new egret.ByteArray(data);
        }
        return bytes;
    }

    /** @internal */ function dcdSound(loader: egret.EventDispatcher): egret.Sound {
        return (<egret.Sound>loader);
    }

    /**
     * 微信重载此方法
     */
    export function getTypeDcd(source: string, type: string): (loader: egret.EventDispatcher, url?: string) => any {
        switch (type) {
            case ResType.IMAGE:
                return dcdImg;
            case ResType.JSON:
                return dcdJson;
            case ResType.TEXT:
                return dcdTxt;
            case ResType.SOUND:
                return dcdSound;
            case ResType.BINARY:
                return dcdBin;
            case ResType.KTX:
                return dcdKtx;
        }
        return null;
    }

}
