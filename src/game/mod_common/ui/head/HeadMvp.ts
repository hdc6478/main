namespace game.mod {

    import teammate = msg.teammate;

    export class HeadMvp extends BaseRenderer {

        private head: HeadVip;
        private lab_nobody: eui.Label;
        private lab_name: eui.Label;
        private lab_count: eui.Label;
        private lab_power: eui.Label;
        private img_power: eui.Image;
        private img_title: eui.Image;
        private grp_power: eui.Group;

        private readonly _defaultStr: string = "积分：%s";
        private readonly _defaultMvp: string = "mvp2";

        constructor() {
            super();
            this.skinName = `skins.common.CommonHeadMvpSkin`;
        }

        public updateMvp(data: HeadMvpData): void {
            if (!data) {
                this.currentState = "2";
                this.head.defaultHeadShow();
                return;
            }
            this.currentState = "1";
            let info: teammate = data.info;
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip, info.role_id);
            this.lab_name.text = info.name;
            let power: number = info.showpower && info.showpower.toNumber() || 0;
            this.lab_power.textFlow = TextUtil.parseHtml(StringUtil.getPowerNumStr(power));

            let value: string = TextUtil.addColor(`${info.value}`, "0xeca240");
            let str: string = StringUtil.substitute(data.countStr || this._defaultStr, [value]);
            this.lab_count.textFlow = TextUtil.parseHtml(str);

            if (this.img_title) {
                this.img_title.source = data.title || this._defaultMvp;
            }
        }
    }

    export interface HeadMvpData {
        info: teammate,
        title?: string,
        /**xxx:%s */
        countStr?: string,
    }
}