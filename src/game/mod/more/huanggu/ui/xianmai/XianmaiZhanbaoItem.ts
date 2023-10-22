namespace game.mod.more {

    import xianmai_zhanbao_data = msg.xianmai_zhanbao_data;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;

    export class XianmaiZhanbaoItem extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public lb_desc: eui.Label;
        public headVip: game.mod.HeadVip;
        public lb_time: eui.Label;

        //type:1个人，2宗门
        data: { type: number, info: xianmai_zhanbao_data };

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data || !data.info) {
                return;
            }
            let mate = data.info.first_name;
            this.headVip.updateShow(mate.head, mate.head_frame, mate.sex, mate.vip, mate.role_id, mate.server_id);

            let timeStr = '';
            if (data.info.time) {
                let time = data.info.time && data.info.time || 0;
                let leaveTime = TimeMgr.time.serverTimeSecond - time;
                let day = Math.floor(leaveTime / Second.Day);
                if (day > 0) {
                    timeStr = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips26), [day]);
                } else {
                    let hour = Math.floor(leaveTime / Second.Hour);
                    if (hour > 0) {
                        timeStr = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips27), [hour]);
                    } else {
                        let mins = Math.floor(leaveTime / Second.Minute);
                        timeStr = mins + '分钟前';
                    }
                }
            }

            let str: string;
            if (data.info.is_success) {
                this.img_bg.source = "liebiaodikuangti2";
                if (data.type == 1) {
                    str = StringUtil.substitute(getLanById(LanDef.xianmaizhengba_tips1), [data.info.first_name.name]);
                } else {
                    str = StringUtil.substitute(getLanById(LanDef.xianmaizhengba_tips3), [data.info.first_name.name, data.info.two_name]);
                }
            } else {
                this.img_bg.source = "liebiaodikuangti";
                if (data.type == 1) {
                    str = StringUtil.substitute(getLanById(LanDef.xianmaizhengba_tips2), [data.info.first_name.name]);
                } else {
                    str = StringUtil.substitute(getLanById(LanDef.xianmaizhengba_tips4), [data.info.first_name.name, data.info.two_name]);
                }
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(str + "(" + timeStr + ")");
        }
    }
}