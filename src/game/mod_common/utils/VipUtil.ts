namespace game.mod {

    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import VipConfig = game.config.VipConfig;

    export class VipUtil {
        /**获取VIP、SVIP图标*/
        public static getShowVipMainBg(vipId: number): string {
            //todo,SVIP
            //return vipId > VIP_MAX ? "main_btn_svip" : "main_btn_vip";
            return "main_btn_vip";
        }

        /**获取VIP等级，缺省表示自己的VIP等级*/
        public static getShowVipLv(vipId?: number) {
            if (vipId == undefined) {
                vipId = RoleVo.ins.vip_lv;
            }
            //todo,SVIP，有修改的话需要全局搜下，有些功能拿等级来判断的
            let lv = vipId % 100;
            return lv;
        }

        /**获取VIP、SVIP文本，例如：VIP1*/
        public static getVipStr(vipId?: number): string {
            let lv = this.getShowVipLv(vipId);
            //todo,SVIP
            return "VIP" + lv;
        }

        /**获取VIP、SVIP字体*/
        public static getVipFont(vipId?: number): string {
            let lv = this.getShowVipLv(vipId);
            //todo,SVIP，"S" + lv;
            return "V" + lv;
        }

        /**VIP提示弹窗，vip等级不足，是否前往提升？*/
        public static showTips(): void {
            ViewMgr.getIns().showConfirm(getLanById(LanDef.vip_up_tips), Handler.alloc(this, () => {
                ViewMgr.getIns().openCommonRechargeView();
            }));
        }

        private static vipRmbMap: { [vip: number]: number };

        /**
         * 购买后可达vip等级
         * @param rmb 金额
         */
        public static getNextVipByPay(rmb: number): number {
            let chargeRmb = RoleVo.ins.charge_rmb || 0;
            let nextRmb = chargeRmb + rmb;
            if (!this.vipRmbMap) {
                this.vipRmbMap = {};
                let cfgList: VipConfig[] = getConfigListByName(ConfigName.Vip);
                let size = cfgList && cfgList.length || 0;
                for (let i = 0; i < size; i++) {
                    if (i == size - 1) {
                        continue;
                    }
                    let cfg = cfgList[i];
                    this.vipRmbMap[cfg.level + 1] = cfg.levelup_exp / 100;
                }
            }
            let vipKeys = Object.keys(this.vipRmbMap);
            for (let i = vipKeys.length - 1; i >= 0; i--) {
                let vip = +vipKeys[i];
                let vipRmb = this.vipRmbMap[vip];
                if (nextRmb >= vipRmb) {
                    return vip;
                }
            }
            return 0;
        }
    }
}