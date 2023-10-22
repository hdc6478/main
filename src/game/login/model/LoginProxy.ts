/** @internal */

namespace game.login {
    import GameNT = base.GameNT;
    import Proxy = base.Proxy;
    import facade = base.facade;
    import delayCall = base.delayCall;
    import Handler = base.Handler;

    export class LoginProxy extends Proxy implements ILoginProxy {
        private _data: LoginModel;
        static  isLoginAccount = false;
        public get data(): LoginModel {
            return this._data;
        }

        public get role_id(): Long {
            return this._data.role_id;
        }

        public set role_id(v: Long) {
            this._data.role_id = v;
        }

        public get create_time(): number {
            return this._data.create_time;
        }

        public set create_time(v: number) {
            this._data.create_time = v;
        }

        public get disConnectPopBox(): msg.s2c_pop_box {
            return this._data.disConnectPopBox;
        }

        public set disConnectPopBox(v: msg.s2c_pop_box) {
            this._data.disConnectPopBox = v;
        }

        public initialize() {
            this._data = new LoginModel();

            // 特别注意login模块代码里不要import msg.xxxxx，直接使用msg.xxxx
            this.onProto(msg.s2c_signin_account, this.onAccountLogin, this);
            this.onProto(msg.s2c_create_role, this.onCreateRole, this);
            this.onProto(msg.s2c_disconnect, this.onDisconnect, this);
            facade.onNt(LauncherEvent.ON_DEACTIVATE, this.onDeactivate, this);
            facade.onNt(LauncherEvent.ON_ACTIVATE, this.onActivate, this);
        }

        private onActivate(): void {
            LogUtil.printIsLoginAccount("LoginProxy onActivate LoginProxy.isLoginAccount = false");
            LoginProxy.isLoginAccount = false;
        }

        private onDeactivate():void{
            LogUtil.printIsLoginAccount("LoginProxy onDeactivate LoginProxy.isLoginAccount = false");
            LoginProxy.isLoginAccount = false;
        }

        public get serverIdList(): number[] {
            let map = this._data.serverMap;
            let ids: number[] = [];
            for (let k in map) {
                ids.push(map[k].server_id);
            }
            return ids;
        }

        public getServerData(id: number): ServerHost {
            return this._data.serverMap[id];
        }

        public setServerData(id: number, data: ServerHost): void {
            this._data.serverMap[id] = data;
        }

        public getServerInfo(server_id: number): void {
            if (gso.user_status != "1") {
                if(!gso.user_status){
                    gso.user_status = "100";
                }
                facade.showView(ModName.Login, LoginViewType.Alert, ApiUserStatus[gso.user_status]);
                return;
            }

            gso.logList[REPORT_LOAD.START_CONNECT ] = "请求后台区服信息" + server_id;
            gzyyou.sdk.getServerInfo(server_id, (obj) => this.onGotServerInfo(obj));
        }

        private onGotServerInfo(obj: ServerInfo): void {
            this.handleServerInfoObj(obj);
        }

        public handleServerInfoObj(obj: ServerInfo): void {
            // Alert.show("进入游戏111111111111111111");
            gso.logList[REPORT_LOAD.START_CONNECT ] = "后台区服信息返回" + JSON.stringify(obj);
            if (obj.user_status != "0") {
                let str: string = UserStatusName[obj.user_status];
                if (str) {
                    facade.showView(ModName.Login, LoginViewType.Alert, str);
                }
                // Alert.show("进入游戏22222222222222222222");
                return;
            }

            // Alert.show("成功进入游戏111111111111111111");
            if (this._data.serverMap[obj.server_id]) {
                gso.serverName = this._data.serverMap[obj.server_id].name;
            } else {
                gso.serverName = "";
            }
            gso.host = obj.ip;
            gso.port = obj.port;
            gso.isNew = obj.is_new == "1";
            gso.client_ip = obj.client_ip;
            LogUtil.printLogin("obj.server_id = "+obj.server_id);
            gso.serverId = obj.server_id;
            console.info("gso.serverId = "+gso.serverId);
            gso.agent_id = obj.agent_id;
            gso.agent_name = obj.agent_name;
            obj.all_is_new = gso.all_is_new;
            gso.merge_id = obj.merge_id || obj.server_id;

            gso.loginParams = JSON.stringify(obj);

            LogUtil.printLogin("打印登录参数"+gso.loginParams);

            this.sendNt(LoginEvent.ON_GOT_SERVER_INFO);
        }

        public getServerList() {
            gzyyou.sdk.getServerList((obj) => this.onGotServerList(obj));
        }

        private onGotServerList(obj: { server_list: ServerHost[], last_server_list: ServerHost[] }) {
            // if (typeof obj.last_server_list.shift != "function") {
            //     console.log("获取服务器列表错误");
            //     return;
            // }
            if(!obj.last_server_list || obj.last_server_list.length <= 0){
                console.info("获取服务器列表错误");
                return;
            }

            this._data.gotServerList = true;
            if (obj.last_server_list.length > 10) {
                obj.last_server_list.length = 10;
            }
            this._data.lastServer = obj.last_server_list;

            for (let i: number = 0, n: number = obj.server_list.length; i < n; i++) {
                let server: ServerHost = obj.server_list[i];
                if (server.status != "0" || gso.is_white) {
                    this._data.serverMap[server.server_id] = server;
                }
            }
            facade.showView(ModName.Login, LoginViewType.SelectServer);
        }

        public getNotice() {
            gzyyou.sdk.getNotice((notice) => this.onGotNotice(notice));
        }

        private onGotNotice(notice: { notice: string, notice_title: string, notice_date: string, update_date: string }) {
            gso.updateNotice = notice;
            if (notice) {
                // let updateDate: Date = new Date(parseInt(notice.update_date) * 1000);
                gso.isNoticeActive = notice.notice_title != null ;//Date.now() < updateDate.getTime();
                if (gso.isNoticeActive) {
                    this.sendNt(LoginEvent.SHOW_NOTICE);
                }
            }
        }

        public clean() {
            this._data.clean();
        }

        onStartReconnect(): void {
            super.onStartReconnect();
            this._data.role_id = null;
        }

        private onAccountLogin(ntfy: GameNT): void {
            let self = this;
            let msg: msg.s2c_signin_account = ntfy.body;

            LogUtil.printLogin("账号请求返回 msg.result = "+msg.result);

            gso.logList[REPORT_LOAD.START_CONNECT + "5"] = "s2c_signin_account"  + JSON.stringify(msg);
            if (msg.result != 1) {
                if (SignAccountMsg[msg.result]) {
                    facade.showView(ModName.Login, LoginViewType.Alert, SignAccountMsg[msg.result]);
                }
                LogUtil.printIsLoginAccount("onAccountLogin  LoginProxy.isLoginAccount = false 1");
                LoginProxy.isLoginAccount = false;
                return;
            }
            if(!msg.role_id || msg.role_id.isZero()){
                facade.showView(ModName.Login, LoginViewType.Alert, "创角出错，s2c_signin_account 角色id为：" + msg.role_id);
                LogUtil.printIsLoginAccount("onAccountLogin LoginProxy.isLoginAccount = false 2");
                LoginProxy.isLoginAccount = false;
                return;
            }

            self._data.role_id = msg.role_id;
            self._data.name = msg.name;
            self._data.level = msg.level;
            self._data.sex = msg.sex;
            self._data.school = msg.school;
            self._data.shape = msg.shape;
            self._data.create_time = msg.create_time;
            gso.createTime = msg.create_time;
            // gso.open_verify = msg.open_verify ? "1" : "0";
            self.sendNt(LoginEvent.ON_ACCOUNT_LOGIN);
            gso.loginParams = null;

        }

        private onCreateRole(ntfy: GameNT) {
            console.info("接收登入信息...onCreateRole");
            let msg: msg.s2c_create_role = ntfy.body;
            gso.logList[REPORT_LOAD.START_CONNECT + "4"] = "服务端返回 s2c_create_role"  + msg.result;
            this.sendNt(LoginEvent.ON_ROLE_CREATE, msg);
            if(msg.result == 1){
                //给后台打点创角
                gzyyou.sdk.loadReport(REPORT_LOAD.S2C_CREATE_ROLE);
                //给平台打点创角（不准，先去掉）
                // gzyyou.sdk.pointReport(RoleInfoType.Create, 0, RoleVo.ins.role_id +"", gso.roleName, 0, "0", TimeMgr.time.serverTimeSecond, 0,0,"",0,"0");
            }
        }

        private onDisconnect(ntfy: GameNT) {
            let msg: msg.s2c_disconnect = ntfy.body;
            this._data.disConnectReason = msg.reason;
            this._data.disConnectMsg = msg.content;
            console.info("s2c_disconnect reason",msg.reason);
            LoginProxy.isLoginAccount = false;
            gso.logList[REPORT_LOAD.START_CONNECT + "3"] = "服务端返回 s2c_disconnect"  + msg.reason + " " +msg.content;
        }

        public createRole(name: string, sex: number, age: number, school: number): void {
            let c2s: msg.c2s_create_role = new msg.c2s_create_role();
            this._data.name = c2s.name = name;
            this._data.sex = c2s.sex = sex;
            this._data.age = c2s.age_type = age;
            this._data.school = c2s.school = school;
            this.sendProto(c2s);
        }

        public loginAccount(params: string): void {

            LogUtil.printIsLoginAccount("LoginProxy.hasCode = "+this.hashCode);
            LogUtil.printIsLoginAccount("LoginProxy.isLoginAccount = " + LoginProxy.isLoginAccount);

            if(LoginProxy.isLoginAccount){
                return;
            }

            LoginProxy.isLoginAccount = true;

            let c2s: msg.c2s_signin_account = new msg.c2s_signin_account();
            c2s.param = params;
            c2s.channel = gso.channel;
            c2s.pb_version = protoVersion;
            c2s.map_version = this._data.map_version;
            this.sendProto(c2s);
            LogUtil.printLogin("账号登录请求");
            LogUtil.printLogin("协议版本号" + protoVersion);
            gso.logList[REPORT_LOAD.START_CONNECT + "4"] = "请求 c2s_signin_account 服务端版本号"  + protoVersion;

            // let self = this;
            // delayCall(Handler.alloc(self, function () {
            //     self._isLoginAccount = false;
            // }), 1000);
        }

        public loginRole(role_id: Long): void {
            if (!role_id) {
                return;
            }
            LogUtil.printLogin("前端请求角色登录，角色id: "+role_id);
            let c2s: msg.c2s_login_role = new msg.c2s_login_role();
            c2s.role_id = role_id;
            this.sendProto(c2s);
        }

    }
}