namespace game {
    import __reg = base.__reg;
    import getTimer = egret.getTimer;
    import TimeMgr = base.TimeMgr;
    import Handler = base.Handler;
    import Pool = base.Pool;

    export let protoVersion: string;

    type ProtoJson = { nested: { [key: string]: any }, version: string };
    let protoJson: ProtoJson;
    let onCreate: Handler;
    let debug: boolean;
    let protobufUrl:string;

    export function initProto(handler: Handler, url?: string) {
        let global: any = window;
        global.Long = global.Long ? global.Long : global.dcodeIO ? global.dcodeIO.Long : undefined;
        protobufUrl = url;
        initLong();
        protobuf.util.Long = Long;
        protobuf.configure();

        if (RELEASE && !url) {
            handler.exec([protobufUrl,protobufUrl]);
            Pool.release(handler);
            return;
        }
        onCreate = handler;
        debug = !url;
        url = url || "assets/data_server/protobuf-bundle.json";
        LoadMgr.ins.load(url, Handler.alloc(null, (data: ProtoJson) => {
            protoJson = data;
            if (debug) {
                return;
            }
            createMsg();
        }), LoadPri.Init);
    }

    export function createMsg(): void {
        debug = false;
        // gAlert("initproto.ts createMsg111 " + protoJson + " type "+type);
        if (!protoJson) {
            return;
        }
        if(protoJson.version){
            protoVersion = protoJson.version;
        }
        // gAlert("initproto.ts createMsg222 " + protoVersion);
        delete protoJson.version;
        let root = protobuf.Root.fromJSON(protoJson);
        for (let k of Object.keys(protoJson.nested)) {
            let m = global[k] = {};
            for (let k1 of Object.keys(protoJson.nested[k].nested)) {
                let path = k + "." + k1;
                let cls = root.lookupType(path).ctor;
                cls.prototype["__class__"] = path;
                cls.prototype.toString = function () {
                    return printMsg(this);
                };
                let msgId = protoJson.nested[k].nested[k1].msgId;
                if (msgId) {
                    (<any>cls).MsgId = msgId;
                    __reg(msgId, cls);
                }
                m[k1] = cls;
            }
        }
        protoJson = null;
        onCreate.exec([protobufUrl,protobufUrl]);
        Pool.release(onCreate);
        onCreate = null;
    }

    function printMsg(obj: any) {
        let tmp = [];
        tmp.push("\"msg_name\":\"" + egret.getQualifiedClassName(obj) + "\"");
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            if (!obj.hasOwnProperty(k)) {
                continue;
            }
            let v = obj[k];
            let t = typeof v;
            if (v == null) {
                tmp.push("\"" + k + "\":" + t);
                continue;
            }
            switch (t) {
                case "number":
                case "boolean":
                case "symbol":
                    tmp.push("\"" + k + "\":" + v.toString());
                    break;
                case "string":
                    tmp.push("\"" + k + "\":\"" + v.replace(/\"/g, "\\\"") + "\"");
                    break;
                case "object":
                    if (Array.isArray(v)) {
                        if (v.length) {
                            if (typeof v[0] === "string") {
                                let s_a = [];
                                for (let s_i = 0, s_l = v.length; s_i < s_l; s_i++) {
                                    s_a.push("\"" + v[s_i].replace(/\"/g, "\\\"") + "\"");
                                }
                                tmp.push("\"" + k + "\":[" + s_a.join(",") + "]");
                            } else if (Long.isLong(v[0])) {
                                let l_a = [];
                                for (let l_i = 0, l_l = v.length; l_i < l_l; l_i++) {
                                    l_a.push("\"" + v[l_i] + "Long\"");
                                }
                                tmp.push("\"" + k + "\":[" + l_a.join(",") + "]");
                            } else {
                                tmp.push("\"" + k + "\":[" + v.toString() + "]");
                            }
                        } else {
                            tmp.push("\"" + k + "\":[" + v.toString() + "]");
                        }
                    } else if (Long.isLong(v)) {
                        tmp.push("\"" + k + "\":\"" + v + "Long\"");
                    } else {
                        tmp.push("\"" + k + "\":" + v.toString());
                    }
                    break;
            }
        }
        return "{" + tmp.join(", ") + "}";
    }

    let _a: () => string;
    let _b: { [key: number]: { [key: number]: { time: number, str: string } } } = Object.create(null);
    let _updateItem: { update(): void };

    function initLong() {
        _a = Long.prototype.toString;
        Long.prototype.toString = function () {
            let self = this;
            let idToStr = _a;
            let idStr = _b;
            if (!idStr[self.high]) {
                let objLow = Object.create(null);
                objLow.time = 0;
                objLow.str = idToStr.call(self);
                let objHigh = Object.create(null);
                objHigh[self.low] = objLow;
                idStr[self.high] = objHigh;
            } else if (!idStr[self.high][self.low]) {
                let objLow = Object.create(null);
                objLow.time = 0;
                objLow.str = idToStr.call(self);
                idStr[self.high][self.low] = objLow;
            }
            idStr[self.high][self.low].time = getTimer();
            return idStr[self.high][self.low].str;
        };
        _updateItem = {update};
        TimeMgr.addUpdateItem(_updateItem);
    }

    function update(): void {
        let idStr = _b;
        let tmpDel = [];
        let t = getTimer();
        let idObj, k, k1;
        for (k in idStr) {
            for (k1 in idStr[k]) {
                idObj = idStr[k][k1];
                if (t - idObj.time > 50000) {
                    tmpDel[tmpDel.length] = k;
                    tmpDel[tmpDel.length] = k1;
                }
            }
        }
        for (let i = 0, len = tmpDel.length; i < len; i += 2) {
            k = tmpDel[i];
            k1 = tmpDel[i + 1];
            let obj = idStr[k];
            obj[k1] = null;
            delete obj[k1];
            if (Object.keys(obj).length === 0) {
                idStr[k] = null;
                delete idStr[k];
            }
        }
    }
}