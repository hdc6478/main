/** @internal */ namespace game.login {
    import Notifier = base.Notifier;
    import getProtoName = base.getProtoName;
    import UpdateItem = base.UpdateItem;
    import getTimer = egret.getTimer;
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;

    let bus: ProtoBus;

    export function initMsg() {
        if (!bus) {
            bus = new ProtoBus();
            base.onMsg = (proto: any) => bus.onMsg(proto);
            base.traceProto = (...params: any[]) => bus.traceProto(params);
        }
    }

    export class ProtoOnActivate extends Cmd {
        public exec(n: GameNT): void {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            proxy.data.isActive = true;
            this.sendNt(LoginEvent.TRY_RECONNECT);
        }
    }

    export class ProtoOnDeactivate extends Cmd {
        public exec(n: GameNT): void {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            proxy.data.isActive = false;
            bus.onDeactivate();
        }
    }

    class ProtoBus extends Notifier implements UpdateItem {
        private readonly _msgs: any[];

        constructor() {
            super();
            this._msgs = [];
            TimeMgr.addUpdateItem(this, 15);
        }

        public onDeactivate(): void {
            while (this._msgs.length > 0) { // 防止放到后台帧率过低，协议不及时处理
                let proto = this._msgs.shift();
                this.sendNt(getProtoName(proto), proto);
            }
        }

        public onMsg(proto: any): void {
            if (!proto) {
                return;
            }
            let proxy: LoginProxy = facade.retMod(ModName.Login).retProxy(ProxyType.Login);
            if (!proxy.data.isActive) {
                this.sendNt(getProtoName(proto), proto);
                return;
            }
            this._msgs[this._msgs.length] = proto;
        }

        public traceProto(params: any[]): void {
            (<any>console).proto.apply(console, params);
        }

        public update(time: Time): void {
            let self = this;
            let msgs = self._msgs;
            let t0 = getTimer();
            while (msgs.length > 0) {
                let proto = msgs.shift();
                this.sendNt(getProtoName(proto), proto);
                let t1 = getTimer();
                if (t1 - t0 > 16) {
                    break;
                }
            }
        }

    }
}