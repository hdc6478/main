namespace game.mod.more {

    import s2c_chuang_shi_nv_shen_hun_ka_compose_viewer = msg.s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;
    import LanDef = game.localization.LanDef;

    export class HunkaPreviewItem extends eui.ItemRenderer {

        private lab_tips: eui.Label;
        private hunkaAttrListView: HunkaAttrListView;

        public data: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer;//魂卡数据

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let countDown = this.data.attr_count_down;
            let countUp = this.data.attr_count_up;
            let countStr = TextUtil.addColor(countDown == countUp ? countUp + "" : countDown + "-" + countUp, WhiteColor.GREEN);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.hunka_tips17), [countStr]);
            this.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);

            let prop = this.data.hunka;
            this.hunkaAttrListView.updateShow(prop.shuiji, true);
        }

        public setData(data: s2c_chuang_shi_nv_shen_hun_ka_compose_viewer): void {
            this.data = data;
        }
    }

}