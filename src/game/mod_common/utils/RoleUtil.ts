namespace game.mod {
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;
    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;

    export class RoleUtil {
        /**开服天数*/
        public static getServerDay(): number {
            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            return roleProxy.serverDay;
        }

        /**登录天数*/
        public static getLoginDay(): number {
            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            return roleProxy.loginDay;
        }

        /**获取当前周几，周日返回：7*/
        public static getCurWeekDay(): number {
            let date = new Date(TimeMgr.time.serverTime);
            let day = date.getDay();
            return day ? day : 7;
        }

        /**
         * 向服务端请求属性，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
         * @param {number} index，策划配置的属性index
         * @param type 传1表示请求军团属性，默认不传
         * @returns {attributes}
         */
        public static getAttr(index: number, type?: number): msg.attributes {
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            return mainProxy.getAttr(index, type);
        }

        /**
         * 向服务端请求属性列表，监听 MainEvent.UPDATE_COMMON_ATTR 更新数据
         * @param {number[]} indexList，策划配置的属性index
         * @param type 传1表示请求军团属性，默认不传
         * @returns {attributes[]}
         */
        public static getAttrList(indexList: number[], type?: number): msg.attributes[] {
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            return mainProxy.getAttrList(indexList, type);
        }

        /**判断是否有某属性，只判断不请求*/
        public static checkAttr(index: number): boolean {
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            return mainProxy.checkAttr(index);
        }

        /**
         * 判断是否有某属性，只判断不请求
         * 全都有返回true，否则false
         */
        public static checkAttrList(indexList: number[]): boolean {
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            return mainProxy.checkAttrList(indexList);
        }

        /**
         * 向服务端请求外显系统属性
         * @param openIdx，功能开启index
         */
        public static getSurfaceAttr(openIdx: number): void {
            let mainProxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
            return mainProxy.c2s_sys_attributes(openIdx);
        }

        /**
         * 取得限制开启的文本描述
         * @param {number[]} info，策划配置的数值，限制类型_数值
         * @param {boolean} isColor, 默认显示颜色
         * @param {boolean} isProgress, 默认显示进度
         * @returns {string}
         */
        public static getLimitStr(info: number[], isColor: boolean = true, isProgress: boolean = true): string {
            let type = info[0];//限制条件类型
            let limit = info[1];//限制条件数值

            let curValue = this.getLimitValueByType(type);//当前进度
            let limitValue = limit;//所需进度，转换后显示的进度

            switch (type) {
                case CommonLimitType.Rebirth:
                    curValue = this.getRebirthLv(curValue);
                    limitValue = this.getRebirthLv(limitValue);
                    break;
                case CommonLimitType.Pass:
                    let passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                    curValue = passProxy.getStepByIdx(curValue);
                    limitValue = passProxy.getStepByIdx(limitValue);
                    break;
            }
            let limitStr = StringUtil.getHurtNumStr(limitValue);
            let str = StringUtil.substitute(getLanById("common_act_tips" + type), [limitStr]);
            if (isProgress) {
                let curStr = StringUtil.getHurtNumStr(curValue);
                str += "（" + curStr + "/" + limitStr + "）";
            }
            if (isColor) {
                return TextUtil.addColor(str, curValue >= limitValue ? WhiteColor.GREEN : WhiteColor.RED);
            }
            return str;
        }

        /**
         * 取得当前达成条件数值
         * @param {number} type，限制类型
         * @returns {number}
         */
        private static getLimitValueByType(type: number): number {
            let curValue = 0;//当前进度
            switch (type) {
                case CommonLimitType.Rebirth:
                    //转生
                    curValue = RoleVo.ins.reincarnate;
                    break;
                case CommonLimitType.Pass:
                    //闯关
                    let _passProxy: IPassProxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
                    curValue = _passProxy.curIndex;//返回的是关卡索引
                    break;
                case CommonLimitType.God:
                    //仙力
                    curValue = RoleVo.ins.god || 0;
                    break;
                case CommonLimitType.Power:
                    //战力
                    curValue = RoleVo.ins.showpower.toNumber() || 0;
                    break;
            }
            return curValue;
        }

        /**
         * 当前限制条件是否满足
         * @param {number[]} info，策划配置的数值，限制类型_数值
         * @returns {boolean}
         */
        public static isLimitOpen(info: number[]): boolean {
            let type = info[0];//限制条件类型
            let limit = info[1];//限制条件数值
            let curValue = this.getLimitValueByType(type);//当前进度
            return curValue >= limit;
        }

        /**X转X重，文本,比如：仙人1转1重
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthStr(index?: number): string {
            if (!index) {
                index = RoleVo.ins.reincarnate;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            let zhuanLv = cfg.relv;
            if (!zhuanLv) {
                return cfg.name;//先天期
            }
            return this.getRebirthLvStr(index) + this.getRebirthSubLvStr(index);
        }

        /**转生名字，文本
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthName(index?: number): string {
            if (!index) {
                index = RoleVo.ins.reincarnate;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            return cfg ? cfg.name : "";
        }

        /**转生转数
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthLv(index?: number): number {
            if (!index) {
                index = RoleVo.ins.reincarnate;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            return cfg.relv;
        }

        /**转生转数文本，X转
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthLvStr(index?: number): string {
            let lvStr = this.getRebirthLvStrNoZhuan(index);
            return lvStr + getLanById(LanDef.zhuan);
        }

        /**转生转数文本，不带转，如：仙人1
         * >=10 就是仙人转数了，比如：10就是仙人1转   【ID1015683】BOSS转生显示
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthLvStrNoZhuan(index?: number): string {
            let lv = this.getRebirthLv(index);
            if (lv >= RebirthMaxLv) {
                lv = lv - RebirthMaxLv + 1;//仙人X转
                return getLanById(LanDef.xianren_tips1) + lv;
            }
            return lv + "";
        }

        /**转生重数
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthSubLv(index?: number): number {
            if (!index) {
                index = RoleVo.ins.reincarnate;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            return cfg.relv2;
        }

        /**转生重数文本，X重
         * @param {number} index 转生index，不传的话取角色自己的
         * */
        public static getRebirthSubLvStr(index?: number): string {
            let lv = this.getRebirthSubLv(index);
            return lv + getLanById(LanDef.chong);
        }

        /**是否有特权*/
        public static hasPrivilege(key: string): boolean {
            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            return roleProxy.hasPrivilege(key);
        }

        /**特权值，万分比*/
        public static getPrivilegeValue(key: string): number {
            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            return roleProxy.getPrivilegeValue(key);
        }

        /**主角光环是否激活*/
        public static isRoleRingAct(type?: RoleRingType): boolean {
            let proxy: IRoleRingProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.RoleRing);
            return proxy.isRoleRingAct(type);
        }

        /**是否加入仙宗 */
        public static isInUnion(): boolean {
            let proxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            return proxy.isInUnion;
        }

        /**仙宗id */
        public static getGuildId(): number {
            let proxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            return proxy.guild_id;
        }

        /**仙宗名字 */
        public static getGuildName(): string {
            let proxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            return proxy.guild_name;
        }

        public static getGuildJob(): number {
            let proxy: IUnionProxy = facade.retMod(ModName.Union).retProxy(ProxyType.Union);
            return proxy.guild_job;
        }

        /**战队id */
        public static getTeamId(): Long {
            let zhanduiProxy: IZhanduiProxy = facade.retMod(ModName.More).retProxy(ProxyType.Zhandui);
            return zhanduiProxy.team_id;
        }

        /**仙侣信息*/
        public static getBanlvInfo(): msg.teammate {
            let xianlvProxy: IXianlvProxy = facade.retMod(ModName.Xianyuan).retProxy(ProxyType.Xianlv);
            return xianlvProxy.getBanlvInfo();
        }

        /**
         * 克隆数据
         */
        public static clone(obj: any): any {
            if (!obj) {
                return null;
            }
            let result = {};
            let keys: string[] = Object.keys(obj);
            for (let k of keys) {
                result[k] = obj[k];
            }
            return result;
        }

        //判断对象是否有值
        public static hasObj(obj: object): boolean {
            for (let k in obj) {
                return true;
            }
            return false;
        }

        //计算闯关关卡
        public static calcGuanqia(index: number): number {
            return index % 10000;
        }

        /**添加修仙女仆的自动挑战副本*/
        public static addAutoChallengeEvent(type: XiuxianNvpuEventType, handler: Handler): void {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            proxy.addAutoChallengeEvent(type, handler);
        }

        /**
         * 移除修仙女仆的自动挑战副本
         * @param type
         * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
         */
        public static removeAutoChallengeEvent(type: XiuxianNvpuEventType, isReset = false): void {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            proxy.removeAutoChallengeEvent(type, isReset);
        }

        /**当前正在处理的修仙女仆自动挑战副本类型*/
        public static getAutoChallengeEventType(): XiuxianNvpuEventType {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            return proxy.autoChallengeEventType;
        }

        /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
        public static isNvpuAct(isTips = false, showConfirm = false): boolean {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            return proxy.isActed(isTips, showConfirm);
        }

        /**女仆神灵幻化等级*/
        public static getNvpuShowIndex(): number {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            if (!proxy.isActed()) {
                return 0;
            }
            return proxy.show_index;
        }

        /**女仆神灵id*/
        public static getNvpuShenlingId(): number {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            return proxy.shenlingId;
        }

        /**判断挂机类型勾选状态*/
        public static isNvpuOnlineSelected(eventType: XiuxianNvpuEventType): boolean {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            return proxy.isNvpuOnlineSelected(eventType);
        }

        /**修改勾选状态 selected表示勾选状态*/
        public static setNvpuOnlineSetting(eventType: XiuxianNvpuEventType, selected: boolean): void {
            let proxy: IXiuxianNvpuProxy = getProxy(ModName.Role, ProxyType.XiuxianNvpu);
            return proxy.setNvpuOnlineSetting(eventType, selected);
        }

        /**
         * god 仙力
         * cfgShowpower 配置表战力  包括道具表和属性表 的 Showpower
         * */
        public static getSurfacePower(god: number, cfgShowpower: number): number {
            if (!god) {
                god = 0;
            }
            if (!cfgShowpower) {
                cfgShowpower = 0;
            }
            let god_rate = RoleVo.ins.getValueByKey(AttrKey.god_rate) || 0;
            let power = cfgShowpower + 2500 * god * (god_rate / 10000);
            return power;
        }
    }
}
