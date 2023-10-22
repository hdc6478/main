namespace game.mod.more {


    import nvshen_hunka_struct = msg.nvshen_hunka_struct;
    import NvshenAttrConfig = game.config.NvshenAttrConfig;
    import LanDef = game.localization.LanDef;

    export class HunkaAttrItem extends eui.ItemRenderer {

        private lab_type: eui.Label;
        private lab_attr: eui.Label;
        private img_up: eui.Image;
        private lab_up: eui.Label;

        public data: nvshen_hunka_struct;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let info = this.data;
            let cfg: NvshenAttrConfig = getConfigByNameId(ConfigName.NvshenAttr, info.itype);
            let typeStr = cfg.type_name + info.level;
            this.lab_type.text = typeStr;

            let attrStr = TextUtil.getAttrTextAdd(info.attr, BlackColor.GREEN);
            this.lab_attr.textFlow = TextUtil.parseHtml(attrStr);

            let rate = info.rate;
            this.img_up.visible = this.lab_up.visible = !!rate;
            if(this.lab_up.visible){
                let showRate = Math.max(1, Math.floor(rate / 100));
                let upStr = showRate + "%" + getLanById(LanDef.hunka_tips18);
                this.lab_up.textFlow = TextUtil.parseHtml(TextUtil.addColor(upStr, BlackColor.GREEN));
            }
        }
    }

}