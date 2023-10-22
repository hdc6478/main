namespace game {
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;

    let reporter: ErrorReporter;

    /** @internal */ export function initErrorReporter(): void {
        if (gso.is_dbg_report == 1 && gso.report_url && gso.report_url != "") {
            if (!reporter) {
                reporter = new ErrorReporter();
                logger.repE = (data: { time: string, msg: string, stack?: string }) => reporter.reportError(data);
            }
        }
    }

    class ErrorReporter implements UpdateItem {
        private _errList: { error: string, time: string, stack?: string }[];
        private _errLogList: string[];
        private createTextureError: boolean;
        private errorLogTick: number;

        constructor() {
            this._errList = [];
            this._errLogList = [];
            this.errorLogTick = TimeMgr.time.time;
            TimeMgr.addUpdateItem(this);
        }

        public reportError(data: { time: string, msg: string, stack?: string }): void {
            let self = this;
            if (data.msg && data.msg.indexOf("未指明的错误。") > -1) {
                return;
            }
            if (data.msg && data.msg.indexOf("Cannot set property 'glContext' of null") > -1) {
                if (self.createTextureError) {
                    return;
                }
                self.createTextureError = true;
            }
            let error = data.msg.length > 512 ? data.msg.substr(0, 512) : data.msg;
            let stack = (data.msg.length > 512 && data.stack) ? data.stack.substr(0, 512) : data.stack;
            if (self._errLogList.indexOf(error) > -1) {
                return;
            }
            for (let obj of self._errList) {
                if (obj && obj.error === error) {
                    return;
                }
            }
            let time = data.time;
            self._errList.push({error, time, stack});
        }

        public update(time: Time): void {
            let self = this;
            if (self.errorLogTick && time.time - self.errorLogTick > 1000) {
                self._errLogList.length = 0;
                self.errorLogTick = time.time;
            }
            let obj: any = Object.create(null);
            obj.ver = gso.version;
            obj.error = "";
            obj.time = "";
            obj.channel = gso.channel;
            obj.sid = gso.serverId;
            obj.acct = gso.account;
            obj.ip = gso.client_ip;
            obj.ua = gso.ua;
            while (self._errList && self._errList.length) {
                let data = self._errList.shift();
                self._errLogList.push(data.error);
                obj.error = data.error;
                obj.stack = data.stack;
                obj.time = data.time;
                let str: string = JSON.stringify(obj);
                console.info("上报错误日志:"+gso.error_url+"?"+str);
                ggo.webReqGet(gso.error_url, {
                    // counter: "dbgTrace",
                    // key: "xcjkjkkaskd",
                    // env: "dev",
                    data: str
                });
            }
        }
    }
}