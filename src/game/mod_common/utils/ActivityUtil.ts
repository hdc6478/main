namespace game {


    import IPunshListProxy = game.mod.IPunshListProxy;
    import facade = base.facade;
    import rank_info = msg.rank_info;
    import IFirstProxy = game.mod.IFirstProxy;
    import IGodProxy = game.mod.IGodProxy;
    import ViewMgr = game.mod.ViewMgr;

    export class ActivityUtil {

        public static getType(): number {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.type;
        }

        public static getOpenIdx(type: number): number {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.getOpenIdx(type);
        }

        public static checkOpen(type: number = this.getType()): boolean {
            if (!type) {
                return false;
            }
            let openIdx: number = this.getOpenIdx(type);
            return ViewMgr.getIns().checkViewOpen(openIdx) && ViewMgr.getIns().checkViewOpen(OpenIdx.PunshList);
        }

        public static getRoleType(): number[] {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.roleType;
        }

        public static checkRoleType(): boolean {
            let type: number = this.getType();
            if (!type) {
                return false;
            }
            let types: number[] = this.getRoleType();
            return types.indexOf(type) > -1;
        }

        public static getSurfaceType(): number[] {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.surfaceType;
        }

        public static checkSurfaceType(): boolean {
            let type: number = this.getType();
            if (!type) {
                return false;
            }
            let types: number[] = this.getSurfaceType();
            return types.indexOf(type) > -1;
        }

        public static getPunshListEndTime(): number {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.getEndTime();
        }

        public static getRankTypeByOpenIdx(openIdx: number): number {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.getRankTypeByOpenIdx(openIdx);
        }

        public static getOpenIdxs(): number[] {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.openIdxs;
        }

        public static getSurfaceHintNodes(type: number): string[] {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.getSurfaceHintNodes(type);
        }

        public static getRankFirst(): rank_info {
            let proxy: IPunshListProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.PunshList);
            return proxy.getRankFirst();
        }

        public static getFirstChargeCacheTimes(): boolean {
            let proxy: IFirstProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.First);
            return proxy.cache_times;
        }

        /**天帝激活 */
        public static getActivateByTiandi(type: number): boolean {
            let proxy: IGodProxy = getProxy(ModName.God, ProxyType.God);
            return proxy.getActivate(type);
        }
    }
}