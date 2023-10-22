/** @internal */ const _eventMap: { [key: string]: { time: number, list: any[] } } = Object.create(null);

(function initPool() {
    let prototype: any;
    prototype = egret.Texture.prototype;
    prototype.onRelease = function () {
        this.dispose();
        this.disposeBitmapData = true;
    };

    prototype = egret.Rectangle.prototype;
    prototype.onRelease = function () {
        this.setTo(0, 0, 0, 0);
    };

    prototype = egret.Point.prototype;
    prototype.onRelease = function () {
        this.setTo(0, 0);
    };

    egret.Event["create"] = function <T extends egret.Event>(cls: { new(type: string, bubbles?: boolean, cancelable?: boolean): T; eventPool?: egret.Event[] },
                                                             type: string, bubbles?: boolean, cancelable?: boolean): T {
        let name: string = egret.getQualifiedClassName(cls);
        let pool = _eventMap[name];
        if (pool) {
            pool.time = egret.getTimer();
        }
        let e: T;
        if (pool && pool.list && 0 < pool.list.length) {
            e = <T>pool.list.pop();
            e.$type = type;
            e.$bubbles = !!bubbles;
            e.$cancelable = !!cancelable;
            e.$isDefaultPrevented = false;
            e.$isPropagationStopped = false;
            e.$isPropagationImmediateStopped = false;
            e.$eventPhase = 2;
        } else {
            e = new cls(type, bubbles, cancelable);
        }
        return e;
    };

    egret.Event["release"] = function <T extends egret.Event>(e: T): void {
        e["clean"]();
        let name: string = egret.getQualifiedClassName(e);
        let pool = _eventMap[name];
        if (!pool) {
            _eventMap[name] = {time: egret.getTimer(), list: [e]};
            return;
        }
        if (pool.list.indexOf(e) < 0) {
            pool.list[pool.list.length] = e;
        }
    };
})();

(function initByteArray() {
    let prototype: any;
    prototype = egret.ByteArray.prototype;
    prototype.decodeUTF8 = function (data: Uint8Array) {
        return new TextDecoder().decode(data);
    };
    prototype.encodeUTF8 = function (str: string) {
        return new TextEncoder().encode(str);
    };
})();