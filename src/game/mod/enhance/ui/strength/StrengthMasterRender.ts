namespace game.mod.enhance {

    import attributes = msg.attributes;
    import LanDef = game.localization.LanDef;

    export class StrengthMasterRender extends BaseRenderer {

        public lab_title: eui.Label;
        public lab_limit: eui.Label;
        // public list_attr: game.mod.AttrListView;
        public lab_attr: eui.Label;

        public data: { isCur: boolean, masterLv: number, attr: attributes, 
            reachTitle: string, curReachCnt: number, needReachCnt: number };

        protected dataChanged(): void {
            let isMax = !this.data.isCur && (!this.data.attr || !this.data.attr.showpower);
            this.lab_title.text = this.data.isCur ? getLanById(LanDef.cur_step) + "：" : getLanById(LanDef.next_step) + "：";
            let hasAttr: boolean = this.data.attr && !!this.data.attr.showpower;
            // this.list_attr.visible = hasAttr;
            this.lab_limit.bold = isMax;
            if (isMax) {
                let fullStr = TextUtil.addColor(getLanById(LanDef.max_step), WhiteColor.RED);
                this.lab_limit.textFlow = TextUtil.parseHtml(fullStr);
            } else if(hasAttr) {
                let isAct: boolean = this.data.isCur;
                let canAct: boolean = (this.data.curReachCnt >= this.data.needReachCnt);

                let str1 = TextUtil.addColor(" (" + getLanById(LanDef.actived) + ")", WhiteColor.GREEN);
                let str2 = ` (${this.data.curReachCnt}/${this.data.needReachCnt})`;
                let str3 = TextUtil.addColor(str2, canAct ? WhiteColor.GREEN : WhiteColor.RED);
                this.lab_limit.textFlow = TextUtil.parseHtml(this.data.reachTitle + (isAct ? str1: str3));

                // this.list_attr.updateAttrAdd(this.data.attr);
                if(this.data.isCur) {
                    this.lab_attr.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(this.data.attr, WhiteColor.GREEN, "\n", " "));
                } else {        // 下一阶始终灰色
                    this.lab_attr.textColor = WhiteColor.GRAY;
                    this.lab_attr.textFlow = TextUtil.parseHtml(TextUtil.getAttrText(this.data.attr, WhiteColor.GRAY, "\n", " "));
                }
            } else {
                this.lab_limit.text = "";
            }
        }

    }
}