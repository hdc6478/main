namespace game.mod {

    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    /**时间组件*/
    export class TimeItem extends eui.Component {
        public lab_time: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.TimeItemSkin";
        }

        /**
         * 更新倒计时
         * 大于1天：dd天HH时
         * 大于1小时：HH时mm分
         * 小于1小时：mm分ss秒
         * @param endTime 结束时间戳，单位秒
         * @param sufStr 时间末尾文本，默认空
         * @param zeroStr 倒计时为0时显示的文本，默认空
         */
        public updateTime(endTime: number = 0, sufStr?: string, zeroStr?: string): void {
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this.updateLeftTime(leftTime, sufStr, zeroStr);
        }

        /**
         * 更新倒计时
         * @param leftTime 剩余时间，单位：秒
         * @param sufStr 时间末尾文本，默认空
         * @param zeroStr 倒计时为0时显示的文本，默认空
         * @param textColor 文本颜色
         */
        public updateLeftTime(leftTime: number = 0, sufStr?: string, zeroStr?: string, textColor?: number): void {
            if (leftTime <= 0) {
                this.lab_time.textFlow = TextUtil.parseHtml(zeroStr ? zeroStr : '');
                return;
            }
            let timeStr = TimeUtil.formatSecond(leftTime, 'd天H时', true) + (sufStr ? sufStr : '');
            if (textColor) {
                this.lab_time.textFlow = TextUtil.parseHtml(TextUtil.addColor(timeStr, textColor));
            } else {
                this.lab_time.text = timeStr;
            }
        }

        /**
         * 更新中控活动倒计时
         * */
        public updateActTime(actInfo: msg.oper_act_item): void {
            let endTime = actInfo.c_end_time;
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }

    }
}