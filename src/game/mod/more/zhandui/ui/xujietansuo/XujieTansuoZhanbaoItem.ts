namespace game.mod.more {

    import xujietansuo_challenge_records = msg.xujietansuo_challenge_records;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class XujieTansuoZhanbaoItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public headVip: game.mod.HeadVip;
        public lb_time: eui.Label;

        data: xujietansuo_challenge_records;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoZhanbaoItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(data.str);
            if (data.atk_role) {
                this.headVip.updateShow(data.atk_role.head, data.atk_role.head_frame, data.atk_role.sex, data.atk_role.vip);
            }

            let timeStr = '';
            if (data.time) {
                let time = data.time && data.time.toNumber() || 0;
                let leaveTime = TimeMgr.time.serverTimeSecond - time;
                let day = Math.floor(leaveTime / Second.Day);
                if (day > 0) {
                    timeStr = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips26), [day]);
                } else {
                    let hour = Math.floor(leaveTime / Second.Hour);
                    timeStr = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips27), [hour > 0 ? hour : 1]);
                }
            }
            this.lb_time.text = timeStr;

        }
    }
}