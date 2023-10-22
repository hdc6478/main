namespace game.mod {

    export class UnionMasterItem extends eui.Component {
        public lab_name: eui.Label;
        public lab_job: eui.Label;
        public img_bg: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.common.UnionMasterItemSkin";
        }

        public updateShow(name: string, job?: string): void {
            this.lab_name.text = name;
            if (job) {
                this.lab_job.text = job;
            }
        }

    }
}