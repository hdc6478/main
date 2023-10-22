namespace game.mod {

    export class HeadKillView extends eui.Component {
        public img_kill: eui.Image;

        public img_frame0: eui.Image;
        public img_head0: eui.Image;
        public lab_name0: eui.Label;

        public img_frame1: eui.Image;
        public img_head1: eui.Image;
        public lab_name1: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.CommonHeadKillSkin";
        }

        /**
         * 更新击杀提示
         * @param msgInfo
         */
        public updateShow(msgInfo: msg.s2c_scene_kill_notice): void {
            if (!msgInfo) {
                this.visible = false;
                return;
            }

            if (msgInfo.kill_info) {
                let info = msgInfo.kill_info;
                this.img_head0.source = ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
                this.lab_name0.text = info && info.name || '';
                this.lab_name0.textColor = 0x35bfe6;
            }
            if (msgInfo.be_kill_info) {
                let info = msgInfo.be_kill_info;
                this.img_head1.source = ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
                this.lab_name1.text = info && info.name || '';
                this.lab_name1.textColor = 0xff574c;
            }

            this.img_kill.source = "kuafu_doufa_kill_tips" + Math.min(msgInfo.kill_num, 5);
        }
    }
}