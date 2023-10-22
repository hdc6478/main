namespace game.mod.compete {

    import LanDef = game.localization.LanDef;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;

    export class DoufaRecordItem extends eui.ItemRenderer {
        public head: HeadVip;
        public lab_desc: eui.Label;
        public lab_time: eui.Label;

        public data: pvp_battle_pk_data;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);

            let successStr = TextUtil.addColor(info.result ? getLanById(LanDef.success) : getLanById(LanDef.fail), WhiteColor.RED);
            let scoreStr = TextUtil.addColor(info.result || info.addscore == 0 ? "+" + info.addscore : "-" + info.addscore, WhiteColor.GREEN);
            let descStr = getLanById(LanDef.tishi_30) + info.name + successStr + "\n" + getLanById(LanDef.doufa_tips2) + scoreStr;
            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);

            this.lab_time.text = TimeUtil.getLeaveTime(info.pktime.toNumber());
        }
    }
}
