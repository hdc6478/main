namespace game.mod.union {


    import TouchEvent = egret.TouchEvent;
    import guild_ware_donate = msg.guild_ware_donate;

    export class UnionStorageMsgItem extends BaseRenderer {

        private lab_content: eui.Label;
        private lab_equip: eui.Label;

        public data: guild_ware_donate;

        protected onAddToStage(): void {
            super.onAddToStage();
            // TextUtil.addLinkHtmlTxt()
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_equip, this.onClickProp, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let time: string = TimeUtil.formatTimeSecond(this.data.time);
            let name: string = TextUtil.addColor(this.data.name, WhiteColor.BLUE);
            this.lab_content.textFlow = TextUtil.parseHtml(`[${time}]${name}捐献`, true);
            let prop: PropData = PropData.create(this.data.item_id);
            this.lab_equip.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(prop.getPropNameStr(true)), true);
        }

        private onClickProp(): void {
            let prop: PropData = PropData.create(this.data.item_id);
            ViewMgr.getIns().showPropTips(prop);
        }
    }

}