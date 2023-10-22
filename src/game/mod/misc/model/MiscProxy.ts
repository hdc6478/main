namespace game.mod.misc {
    import s2c_ping = msg.s2c_ping;
    import c2s_setting = msg.c2s_setting;
    import c2s_ping = msg.c2s_ping;
    import GameNT = base.GameNT;
    import s2c_sync_time = msg.s2c_sync_time;
    import TimeMgr = base.TimeMgr;
    import c2s_gm_code = msg.c2s_gm_code;
    import s2c_tips = msg.s2c_tips;
    import s2c_war_tips = msg.s2c_war_tips;
    import c2s_sync_time = msg.c2s_sync_time;
    import s2c_server_msgbox = msg.s2c_server_msgbox;
    import s2c_login_role = msg.s2c_login_role;
    import sdk = gzyyou.sdk;
    import setting = msg.setting;
    import c2s_change_name_sex = msg.c2s_change_name_sex;
    import facade = base.facade;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;

    export class MiscProxy extends ProxyBase implements IMiscProxy {
        private _data: MiscModel;

        public get data(): MiscModel {
            return this._data;
        }

        public intiGameSetting(settings: setting[]): void {
            this._data.gameSetting = {};

            if (settings) {
                for (let i: number = 0, len: number = settings.length; i < len; i++) {
                    this.initSetting(settings[i].key, settings[i].value);
                }
            }
        }

        private initSetting(key: string, val: string) {
            this._data.gameSetting[key] = val;
            this.updateSetting(key,val);
        }

        private updateSetting(key: string, val: string):void{
            if(key == SettingKey.gameModel){
                if(!val || val == "3"){
                    //屏蔽其他玩家
                    gso.isHideOtherPlayer = false;
                    //屏蔽其他玩家跟随
                    gso.isHideOtherPlayerPet = false;
                    //屏蔽其他玩家特效
                    gso.isHideOtherPlayerEft = false;
                    //屏蔽自己特效
                    gso.isHideSeflEft = false;
                }else if( val == "2"){
                    //屏蔽其他玩家跟随
                    gso.isHideOtherPlayerPet = true;
                    //屏蔽其他玩家特效
                    gso.isHideOtherPlayerEft = true;

                    //屏蔽其他玩家
                    gso.isHideOtherPlayer = false;
                    //屏蔽自己特效
                    gso.isHideSeflEft = false;

                }else if(val == "1"){
                    //屏蔽其他玩家
                    gso.isHideOtherPlayer = true;
                    //屏蔽其他玩家跟随
                    gso.isHideOtherPlayerPet = true;
                    //屏蔽其他玩家特效
                    gso.isHideOtherPlayerEft = true;
                    //屏蔽自己特效
                    gso.isHideSeflEft = true;
                }
            }
            else if(key == SettingKey.gameShake){
                gso.isHideSceneShake = val == "1";
            }
            else if(key == SettingKey.bgMusic){
                gso.isBgMusic = val == "1";
            }
            else if(key == SettingKey.gameMusic){
                gso.isGameMusic = val == "1";
            }
            else if(key == SettingKey.autoHuashen){
                gso.autoHuashen = val == "1";
            }
            else if(key == SettingKey.fubenChallenge){
                gso.fubenChallenge = val == "1";
            }
        }

        public getSetting(key: string): string {
            if (null == this._data.gameSetting) {
                return null;
            }
            return this._data.gameSetting[key];
        }

        public getSettingN(key: string): number {
            if (null == this._data.gameSetting) {
                return null;
            }
            return Number(this._data.gameSetting[key]);
        }


        public get lastSyncTick(): number {
            return this._data.lastSyncTick;
        }

        public set lastSyncTick(v: number) {
            this._data.lastSyncTick = v;
        }

        public get isGou(): boolean {
            return this._data.isGou;
        }

        public set isGou(v: boolean) {
            this._data.isGou = v;
        }


        public initialize() {
            this._data = new MiscModel();

            Object.defineProperty(gso, "openPay", {
                get: function () {
                    return gso.open_pay == "1" && !sdk.payDisabled;
                }
            });

            this.onProto(s2c_login_role, this.onRoleLogin, this);
            this.onProto(s2c_ping, this.onPing, this);
            this.onProto(s2c_sync_time, this.onSyncTime, this);
            this.onProto(s2c_server_msgbox, this.onServerMsgBox, this);
            this.onProto(s2c_tips, this.onTips, this);
            this.onProto(s2c_war_tips, this.onTips, this);
        }

        private onRoleLogin(ntfy: GameNT) {

            LogUtil.printLogin("服务器返回角色信息");
            let msg: s2c_login_role = ntfy.body;
            TimeMgr.setServerTime(msg.now, msg.starttime);
            RoleVo.ins.starttime = msg.starttime;
            RoleVo.ins.server_open_date = msg.server_open_date;

            //this.sendNt(MiscEvent.ON_ROLE_LOGIN, msg);
            this.intiGameSetting(msg.settings);

            //更新角色信息
            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            roleProxy.updateRole(msg.propertys, msg.attrs);
            roleProxy.updateDay(msg.server_day, msg.login_day);
            //this.sendNt(MiscEvent.ON_RECEIVE_SETTING);
            //同步系统时间
            this.sendNt(MiscEvent.START_SYNC_TIME);

            if (!this.data.gameInit) {

                LogUtil.printLogin("游戏层级初始化");
                initMainLayer();
                //
                this.sendNt(MiscEvent.INIT_MISC);
                //
                this.sendNt(SceneEvent.INIT_SCENE_MDR);
                this.data.gameInit = true;
            }

            if(logger && logger.clock){
                logger.clock.setSt(msg.now, msg.starttime);
            }

            gzyyou.sdk.loadReport(REPORT_LOAD.S2C_ROLE_ENTER);

            //上报用户信息
            if(gzyyou.sdk.reportUseInfo){
                let power = RoleVo.ins.showpower ? RoleVo.ins.showpower.toNumber() : 0;
                let vipLv = VipUtil.getShowVipLv();
                let roleid = gso.roleId.toString();
                gzyyou.sdk.reportUseInfo(RoleVo.ins.level, power, RoleVo.ins.name, vipLv, roleid);
            }

            // if (gzyyou.sdk.onPowerUpdate) {
            //     let time: number = TimeMgr.time.serverTimeSecond;
            //     gzyyou.sdk.onPowerUpdate(power, time);
            // }
        }

        private onTips(ntfy: GameNT): void {
            let msg: { index: number, params: string[] } = ntfy.body;
            let str: string = getConfigByNameId(ConfigName.ServerTips, msg.index);
            str = StringUtil.substitute(str, msg.params);
            if (!str || str.trim() == "") {
                str = "s2c_tips提示不存在" + msg.index;
            }
            PromptBox.getIns().show(str);
        }

        private onSyncTime(ntfy: GameNT) {
            let msg: s2c_sync_time = ntfy.body;
            TimeMgr.setServerTime(msg.now);
            logger.clock.setSt(msg.now);
            this._data.lastSyncTick = TimeMgr.time.time;
        }

        private onServerMsgBox(n: GameNT) {
            let s2c: s2c_server_msgbox = n.body;
            this.sendNt(MiscEvent.SERVER_ERR, s2c);
        }

        private onPing() {
            let c2s: c2s_ping = new c2s_ping();
            this.sendProto(c2s);
        }

        public setSetting(key: string, val: string, now: boolean = false) {
            this._data.setSetting(key, val);
            this.updateSetting(key, val);
            let c2s: c2s_setting = new c2s_setting();
            c2s.key = key;
            c2s.value = val;
            this.sendProto(c2s);
        }

        public sendGM(text: string) {
            let c2s: c2s_gm_code = new c2s_gm_code();
            c2s.gm_str = text;
            this.sendProto(c2s);
        }

        //修改姓名和性别
        public changeName(name: string, sex: number): void {
            let c: c2s_change_name_sex = new c2s_change_name_sex();
            c.new_name = name;
            c.new_sex = sex;
            this.sendProto(c);
        }

        public syncTime() {
            this.sendProto(new c2s_sync_time());
        }
    }
}
