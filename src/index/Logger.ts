(function (l: Logger) {
    l.clock = {
        _sst: 0,
        _lti: 0,
        _sti: 0,
        tmp: new Date(),
        pad(s: number | string, n?: number): string {
            s = s.toString();
            n = n || 2;
            while (s.length < n) {
                s = "0" + s;
            }
            return s;
        },
        toString(): string {
            this.tmp.setTime(this.st ? this.st : Date.now());
            return "[" + this.tmp.getFullYear() + "-" + this.pad(this.tmp.getMonth() + 1) + "-" + this.pad(this.tmp.getDate()) + " "
                + this.pad(this.tmp.getHours()) + ":" + this.pad(this.tmp.getMinutes()) + ":" + this.pad(this.tmp.getSeconds()) + "."
                + this.pad(this.tmp.getMilliseconds(), 3) + (this.st ? "ST" : "LT") + "]";
        },
        setSt(sti: number, sst: number): void {
            if (sst) {
                this._sst = sst;
            }
            this._lti = Date.now();
            this._sti = sti;
        },
        get st(): number {
            return !this._sst ? 0 : (this._sst * 1000 + this._sti * 10 + Date.now() - this._lti);
        }
    };
    l.getList = function (args: any): string[] {
        let msg = [];
        for (let i = 0; i < args.length; i++) {
            let o = args[i];
            msg.push(o ? o.toString() : o);
        }
        return msg;
    };
    l.toMsgStr = function (msg: string[]): string {
        return l.clock.toString() + " " + msg.join(" ");
    };
    l.getEMsg = function (e: Error): string {
        if (!e) {
            return null;
        }
        let stack = e.stack ? e.stack : "";
        if (stack.indexOf(e.name) < 0 || stack.indexOf(e.message) < 0) {
            return e.name + ":" + e.message + "\n" + stack;
        }
        return stack;
    };
    l.def = {error: console.error, warn: console.warn, log: console.log, debug: console.debug};
    l.nop = function (): void {
    };
    l.error = function (): void {
        let a = [];
        for (let i = 0; i < arguments.length; i++) {
            let o = arguments[i];
            a.push(o instanceof Error ? l.getEMsg(o) : (o ? o.toString() : o));
        }
        l.def.error.call(console, l.toMsgStr(a));
        l.repE({time: l.clock.toString(), msg: a.shift(), stack: a.join(" ")});
    };
    l.warn = function () {
        l.def.warn.apply(console, arguments);
    };
    l.info = function () {
        l.def.log.apply(console, ["%c" + l.toMsgStr(l.getList(arguments)), "color:blue"]);
    };
    l.log = function () {
        l.def.log.apply(console, ["%c" + l.toMsgStr(l.getList(arguments)), "color:olive"]);
    };
    l.debug = function () {
        l.def.debug.call(console, l.toMsgStr(l.getList(arguments)));
    };
    l.proto = function () {
        l.def.log.call(console, l.toMsgStr(l.getList(arguments)));
    };
    l.onerror = function (message: Event | string, source?: string, fileno?: number, columnNumber?: number, error?: Error): boolean {
        if (typeof message !== "string") {
            message = message.type;
        }
        if (message === "Script error.") {
            return true;
        }
        let stack: string = "";
        if (!!error) {
            stack = l.getEMsg(error);
        }
        l.repE({time: l.clock.toString(), msg: message, stack: stack});
        return false;
    };
    l.repE = function (data: { time: string, msg: string, stack?: string }): void {
        //发布环境下的上报在ErrorReporter
        if (DEBUG) {
            if (window.location.href.indexOf("c1.") > -1) {
                if (data.msg.indexOf("脚本报错[游戏") > -1) return;
                let str = JSON.stringify({
                    error: data.msg,
                    stack: data.stack,
                    time: data.time,
                    acct: gso.account,
                    sid: gso.serverId,
                    server_name: gso.serverName,
                });
                if (typeof ggo !== "undefined" && typeof ggo.webReqGet === "function") {
                    ggo.webReqGet(gso.error_url, {
                        // counter: "dbgTrace",
                        // key: "xcjkjkkaskd",
                        // env: "dev",
                        data: str
                    });
                }
            }
        }
    };
    window.onerror = l.onerror;
    l.keys = ["error", "warn", "info", "log", "debug", "proto"];
    l.setLv = function (lv: number, dfasdfa?: string): boolean {
        for (let i = 0; i < l.keys.length; i++) {
            let k = l.keys[i];
            console[k] = (i < lv && (i !== 5 || dfasdfa)) ? l[k] : l.nop;
        }
        return true;
    };
    l.setLv(3);
})(typeof logger === "undefined" ? ((<any>window).logger = Object.create(null)) : logger);