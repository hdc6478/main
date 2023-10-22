namespace game.mod.more {

    import TimeMgr = base.TimeMgr;

    export class HundunBtnItem extends Btn {
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public gr_name: eui.Group;
        public lb_name: eui.Label;
        public gr_desc: eui.Group;
        public lb_desc: eui.Label;
        public timeItem: game.mod.TimeItem;
        public group_eff:eui.Group;

        constructor() {
            super();
            this.skinName = `skins.more.HundunBtnItemSkin`;
        }

        /**
         * 更新按钮
         * @param icon
         * @param name
         * @param showHint
         * @param desc
         */
        public updateShow(icon: string, name: string, showHint: boolean = false, desc: string = ''): void {
            this.img_icon.source = icon;
            this.lb_name.textFlow = TextUtil.parseHtml(name);

            this.redPoint.visible = !!showHint;

            this.gr_desc.visible = !!desc;
            this.lb_desc.textFlow = TextUtil.parseHtml(desc ? desc : '');
        }

        /**
         * 更新倒计时
         * @param endTime 结束时间戳，单位：秒
         * @param sufStr 时间末尾文本，默认空
         */
        public updateTime(endTime: number, sufStr?: string): void {
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this.timeItem.visible = false;
                return;
            }
            this.timeItem.visible = true;
            this.timeItem.updateLeftTime(leftTime, sufStr);
        }

        public setHint(hint: boolean = false): void {
            this.redPoint && (this.redPoint.visible = hint);
        }

    }
}