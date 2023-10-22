/** @internal */
namespace game.login {
    import Mdr = base.Mdr;
    import Event = egret.Event;
    import ArrayList = uilib.ArrayList;
    import TouchEvent = egret.TouchEvent;

    export class SelectServerMdr extends Mdr {
        private _view: SelectServerView = this.mark("_view", SelectServerView);
        private _proxy: LoginProxy;
        private _beginItem:ServerItemRender;
        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.Login);
            this._view.listServer.itemRender = ServerItemRender;
            this._view.listServerType.itemRender = ServerTypeRender;
        }

        protected onShow(): void {
            this._beginItem = null;
            let v = this._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            let serverIdList: number[] = this._proxy.serverIdList;
            serverIdList.sort((a: number, b: number) => a - b);
            let maxServerId: number = serverIdList[serverIdList.length - 1];
            let serverNum = 20;
            let typeNum: number = Math.ceil(maxServerId / serverNum);
            let typeList: ServerType[] = [{name: LoginLan.RecentLogin, min: -1, max: -1}];
            while (typeNum > 0) {
                let min = (typeNum - 1) * serverNum + 1;
                let max = typeNum * serverNum;
                let name = StringUtil.substitute(LoginLan.ServerType, [min, max]);
                typeList.push({name, min, max});
                typeNum--;
            }
            this._view.listServerType.dataProvider = new ArrayList(typeList);
            this._view.listServerType.selectedIndex = 0;
            this.updateServerList(typeList[0]);
        }

        protected onHide(): void {
            this._beginItem = null;
            this._view.listServerType.dataProvider.removeAll();
            this._view.listServer.dataProvider.removeAll();
        }

        protected addListeners(): void {
            let addEventListener = this.onEgret.bind(this);
            //addEventListener(this._view.listServer, LoginEvent.TAP_SELECT_SERVER, this.onTapServer);
            addEventListener(this._view.listServerType, LoginEvent.TAP_SERVER_TYPE, this.onTapType);
            addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
            //addEventListener(this._view.listServer,TouchEvent.TOUCH_TAP,this.onTapServerTest);
            addEventListener(this._view.listServer,TouchEvent.TOUCH_BEGIN,this.onTapServerBegin);
            addEventListener(this._view.listServer,TouchEvent.TOUCH_END,this.onTapServerEnd);
            addEventListener(this._view.listServer,TouchEvent.TOUCH_CANCEL,this.onTapServerReset);
            addEventListener(this._view.listServer,TouchEvent.TOUCH_MOVE,this.onTapServerReset);

        }


        private onTapType(e: Event) {
            this.updateServerList(e.data);
        }

        private onTapServerReset(e: Event) {
            this._beginItem = null;
        }

        private onTapServerBegin(e: Event) {
            this._beginItem = e.target;
        }

        private onTapServerEnd(e: Event) {
            if(this._beginItem == e.target){
                this.sendNt(LoginEvent.UPDATE_CURRENT_SERVER, e.target.data);
                this.hide();
                this._beginItem = null;
            }
        }

        private updateServerList(type: ServerType) {
            let list: ServerHost[];
            if (type.min == -1) {
                list = this._proxy.data.lastServer.concat();
            } else {
                list = [];
                for (let i: number = type.max; i >= type.min; i--) {
                    let server: ServerHost = this._proxy.getServerData(i);
                    if (!server) {
                        continue;
                    }
                    list.push(server);
                }
            }
            
            if (this._view.listServer.dataProvider == null) {
                this._view.listServer.dataProvider = new ArrayList(list);
            } else {
                this._view.listServer.dataProvider.source = list;
            }
            this._view.listServer.scrollPos = 0;
        }

        private onTapServer(e: Event) {
            let server: ServerHost = e.data;
            if (server == null) {
                return;
            }
            this.sendNt(LoginEvent.UPDATE_CURRENT_SERVER, server);
            this.hide();
        }

    }
}
