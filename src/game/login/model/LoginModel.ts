/** @internal */ namespace game.login {
    export class LoginModel {
        public get map_version(): string {
            return LoadMgr.ins.getRes("assets/map/map_version");
        }

        public isActive: boolean = true;
        public tryingReconnect: boolean;

        public login_time: number;

        public role_id: Long;
        public name: string;
        public level: number;
        public sex: number;
        public age: number;
        public school: number;
        public shape: number;
        public create_time: number;

        public disConnectReason: number = 0;
        public disConnectMsg: string;
        public reConnectCnt: number = 0;

        public disConnectPopBox: msg.s2c_pop_box;

        public gotServerList: boolean = false;
        public serverMap: { [server_id: number]: ServerHost } = Object.create(null);
        public lastServer: ServerHost[];

        public clean(): void {
            this.gotServerList = false;
            this.lastServer = null;
            gso.last_server = null;
            gso.max_server = null;
        }

    }

}
