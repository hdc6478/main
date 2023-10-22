namespace game.mod.role {
    import s2c_sync_role_attr = msg.s2c_sync_role_attr;
    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import property = msg.property;
    import attributes = msg.attributes;
    import s2c_on_new_day = msg.s2c_on_new_day;
    import s2c_privilege_info = msg.s2c_privilege_info;

    export class RoleProxy extends ProxyBase implements IRoleProxy {
        private _model: RoleModel;
        private _roleVo: RoleVo;

        onStartReconnect(): void {
            super.onStartReconnect();
        }

        public initialize(): void {
            this._model = new RoleModel();
            RoleVo.setIns(this._roleVo = new RoleVo());
            this.onProto(s2c_sync_role_attr, this.s2c_sync_role_attr, this);
            this.onProto(s2c_on_new_day, this.s2c_on_new_day, this);
            this.onProto(s2c_privilege_info, this.s2c_privilege_info, this);
        }

        private s2c_on_new_day(n: GameNT) {
            let msg: s2c_on_new_day = n.body;
            this.updateDay(msg.server_day, msg.login_day);
            this.sendNt(RoleEvent.ON_SERVER_DAY_UPDATE);
        }

        public updateDay(serverDay : number, loginDay: number): void {
            this._model.serverDay = serverDay;
            this._model.loginDay = loginDay;
        }
        //开服天数，RoleUtil直接取
        public get serverDay(): number {
            return this._model.serverDay;
        }
        //登录天数，RoleUtil直接取
        public get loginDay(): number {
            return this._model.loginDay;
        }

        private s2c_sync_role_attr(n: GameNT) {
            let msg: s2c_sync_role_attr = n.body;
            if (!msg || (!msg.attrs && !msg.propertys)) {
                return;
            }

            let updateKeys: string[] = this.updateRole(msg.propertys, msg.attrs);
            if (updateKeys.length) {
                this.sendNt(RoleEvent.ON_ROLE_UPDATE, updateKeys);
            }
        }

        public updateRole(prop: property, attr: attributes): string[] {
            if (!prop && !attr) {
                return null;
            }

            //this._roleVo.backup();
            let keys: string[] = [];
            if (prop) {
                this._roleVo.update(prop, keys);
            }
            if (attr) {
                this._roleVo.update(attr, keys);
            }
            return keys;
        }

        public getLeftTime(endDay: number): number {
            let openDate = new Date(this._model.openServerTime * 1000);
            openDate.setDate(openDate.getDate() + endDay);
            openDate.setHours(0, 0, 0, 0);
            return openDate.getTime() - TimeMgr.time.serverTime;
        }

        /**根据功能开启id 获取红点路径 */
        public getOpenIdxToHintType(openIdx: number): string[] {
            return this._model.openIdxToHintType[openIdx] || null;
        }

        //主动推送特权
        private s2c_privilege_info(n: GameNT) {
            let msg: s2c_privilege_info = n.body;
            if(msg.list){
                let addKey: string[] = [];
                for (let info of msg.list) {
                    if (this.hasPrivilege(info.key)) {
                        continue;
                    }
                    addKey.push(info.key);
                }
                this._model.privilegeList = msg.list;
                if (addKey.length) {
                    this.sendNt(RoleEvent.ON_ROLE_PRIVILEGE_UPDATE, addKey);
                }
            }
        }
        //是否有特权
        public hasPrivilege(key: string): boolean {
            for(let info of this._model.privilegeList){
                if(key == info.key){
                    return true;
                }
            }
            return false;
        }
        //特权值
        public getPrivilegeValue(key: string): number {
            for(let info of this._model.privilegeList){
                if(key == info.key){
                    return info.value;
                }
            }
            return 0;
        }
    }
}
