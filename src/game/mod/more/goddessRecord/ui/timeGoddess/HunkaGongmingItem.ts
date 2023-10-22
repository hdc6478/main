namespace game.mod.more {

    import NvshenHunkaScoreConfig = game.config.NvshenHunkaScoreConfig;
    import facade = base.facade;

    export class HunkaGongmingItem extends eui.ItemRenderer {

        private img_pingjia: eui.Image;
        private img_lv: eui.Image;
        private lab_desc: eui.Label;

        public data: NvshenHunkaScoreConfig;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            let type = cfg["index"];
            let cfgLv = cfg.lv;
            let _proxy: GoddessRecordProxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            let lv = _proxy.getHunkaLv(type);
            let isAct = lv >= cfgLv;

            let pingjiaStr = isAct ? "pingjia1" : "pingjia0";
            this.img_pingjia.source = pingjiaStr;

            let lvStr = "hunka_score" + cfgLv;
            if(!isAct){
                lvStr += "_0";
            }
            this.img_lv.source = lvStr;

            let descStr = TextUtil.addColor(cfg.desc, isAct ? BlackColor.GREEN : BlackColor.GRAY);
            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);
        }
    }

}