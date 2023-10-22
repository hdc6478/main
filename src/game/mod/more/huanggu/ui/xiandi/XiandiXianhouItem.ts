namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XiandiXianhouItem extends eui.Component {

        private lab_name1: eui.Label;
        private lab_name2: eui.Label;
        private head1: Head;
        private head2: Head;
        private lab_power1: eui.Label;
        private lab_power2: eui.Label;

        public showInfo(): void {
            let proxy: XiandiProxy = getProxy(ModName.More, ProxyType.Xiandi);

            let tiandi_info = proxy.tiandi_info;
            this.lab_name1.text = tiandi_info && tiandi_info.name || getLanById(LanDef.tishi_2);
            let showpower1 = tiandi_info && tiandi_info.showpower && tiandi_info.showpower.toNumber() || 0;
            this.lab_power1.text = StringUtil.getPowerNumStr(showpower1);
            if (tiandi_info) {
                this.head1.updateHeadShow(tiandi_info.head, tiandi_info.head_frame, tiandi_info.sex, tiandi_info.role_id);
            } else {
                this.head1.defaultHeadShow();
            }

            let xianhou_info = proxy.xianhou_info;
            this.lab_name2.text = xianhou_info && xianhou_info.name || getLanById(LanDef.tishi_2);
            let showpower2 = xianhou_info && xianhou_info.showpower && xianhou_info.showpower.toNumber() || 0;
            this.lab_power2.text = StringUtil.getPowerNumStr(showpower2);
            if (xianhou_info) {
                this.head2.updateHeadShow(xianhou_info.head, xianhou_info.head_frame, xianhou_info.sex, xianhou_info.role_id);
            } else {
                this.head2.defaultHeadShow();
            }
        }

    }
}
