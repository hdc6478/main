namespace game.mod.compete {

    import teammate = msg.teammate;

    export class KuafuDoufaKillItem extends eui.ItemRenderer {
        private img_head: eui.Image;
        private img_frame: eui.Image;
        private lab_name: eui.Label;

        public data: { info: teammate, beKill: boolean };

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this.data.info;
            let beKill = this.data.beKill;

            this.img_frame.source = beKill ? "touxiangkuang_hongse" : "touxiangkuang_lanse";
            if (info.head) {
                this.img_head.source = ResUtil.getDressUpIcon(info.head.toNumber(), info.sex || 1);
            }
            this.lab_name.text = info && info.name || '';
            this.lab_name.textColor = beKill ? 0xff574c : 0x35bfe6;
        }

        public setData(info: teammate, beKill: boolean): void {
            this.data = {info, beKill};
        }
    }
}
