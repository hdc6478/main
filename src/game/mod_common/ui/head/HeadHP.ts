namespace game.mod {

    import teammate = msg.teammate;

    export class HeadHP extends BaseRenderer {
        public head: HeadVip;
        public lab_name: eui.Label;
        public progress: ProgressBarComp

        constructor() {
            super();
            this.skinName = `skins.common.CommonHeadHPSkin`;
        }

        public updateMyHead(): void {
            this.head.updateMyHead();
            this.lab_name.text = RoleVo.ins.name;
        }

        public updateShow(info: teammate): void {
            this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
            this.lab_name.text = info.name;
        }

        public updateHP(value: number): void {
            this.progress.show(value, 10000, false, 0, false, ProgressBarType.Percent);
        }
    }
}