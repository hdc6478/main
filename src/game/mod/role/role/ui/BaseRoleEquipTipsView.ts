namespace game.mod.role {

    import EquipmentConfig = game.config.EquipmentConfig;
    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class BaseRoleEquipTipsView extends eui.Component {
        public qualityTips: game.mod.BaseQualityTips;
        public lb_name: eui.Label;
        public lb_type: eui.Label;
        public power: game.mod.Power;
        public icon: game.mod.Icon;
        public baseGain: game.mod.BaseGainItem;
        public lb_desc_bottom: eui.Label;
        public exchangeTips: game.mod.ExchangeTips;

        constructor() {
            super();
            this.skinName = "skins.role.BaseRoleEquipTipsSkin";
        }

        //顶部信息
        public updateTopInfo(data: PropData): void {
            if (!data || !data.cfg) {
                return;
            }
            let cfg = data.cfg as EquipmentConfig;
            this.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name + `+${data.zengfu_lv || 0}`, ColorUtil.getColorByQuality2(cfg.quality)));
            this.icon.data = data;
            this.qualityTips.updateShow(cfg.quality);
            this.lb_type.text = getLanById(EquipPosName[cfg.index % 10]);
        }

        public updatePower(power: number): void {
            this.power.setPowerValue(power);
        }

        //底部信息
        public updateBottomInfo(data: PropData): void {
            if (!data) {
                return;
            }

            //显示兑换
            this.exchangeTips.updateExchangeTips(data, Handler.alloc(this, () => {
                facade.sendNt(ViewEvent.ON_VIEW_HIDE);
            }));
            let showExchange = this.exchangeTips.visible;
            this.baseGain.visible = this.lb_desc_bottom.visible = !showExchange;
            if (!showExchange) {
                // 获取途径
                let cfg = data.cfg as EquipmentConfig;
                if (cfg && cfg.gain_id) {
                    this.baseGain.updateShow(cfg.gain_id);
                }
                this.lb_desc_bottom.textFlow = TextUtil.parseHtml(TextUtil.addColor(getLanById(LanDef.equip_tips_lb), 0x4dfd28));
            }
        }
    }
}