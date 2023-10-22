namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XianmaiMvpItem extends eui.Component {
        public head: game.mod.HeadVip;
        public img_title: eui.Image;
        public lb_name: eui.Label;
        public powerLabel: game.mod.PowerLabel;
        public lb_guild: eui.Label;
        public lb_score: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.XianmaiMvpItemSkin";
        }

        public updateShow(data: msg.teammate): void {
            if (!data) {
                this.defaultView();
                return;
            }
            this.currentState = '1';
            this.head.updateShow(data.head, data.head_frame, data.sex, data.vip, data.role_id, data.server_id);
            this.lb_name.text = data.name;
            this.powerLabel.setPowerValue(data.showpower, 0xf9f3d7);
            this.lb_guild.text = getLanById(LanDef.zongmen) + `：` + data.guild_name;
            this.lb_score.text = getLanById(LanDef.xianmaizhengduo_tips25) + `：` + (data.value ? data.value.toNumber() : 0);
        }

        private defaultView(): void {
            this.currentState = '2';
            this.head.defaultHeadShow();
        }
    }
}