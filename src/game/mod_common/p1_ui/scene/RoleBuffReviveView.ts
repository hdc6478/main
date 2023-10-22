namespace game.mod {

    /**
     * 角色复活界面
     * 战场技能
     */
    export class RoleBuffReviveView extends eui.Component {
        public grp_died: eui.Group;
        public lab_reviveTime: eui.Label;
        public lab_revive: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.RoleBuffReviveSkin";
            this.lab_revive.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt("立即复活", BlackColor.GREEN, ""));
        }

        /**
         * 更新复活倒计时
         * @param leftTime 剩余时间
         * @param sufStr 时间末尾文本，默认：秒后复活
         */
        public updateShow(leftTime: number, sufStr = '秒后复活'): void {
            this.lab_reviveTime.text = leftTime + sufStr;
        }
    }
}