namespace game.mod.god {

    import BuffConfig = game.config.BuffConfig;

    export class GodDragonoathSuitItem extends eui.Component {
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public lab_cnt: eui.Label;

        public data: number[];

        constructor() {
            super();
            this.skinName = "skins.god.GodDragonoathSuitItemSkin";
        }

        public setData(info: number[]): void {
            this.data = info;
            if (!this.data) {
                return;
            }
            this.lab_cnt.text = `${info[0]}阶`;
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, info[1]);
            this.img_icon.source = cfg.icon;
        }

    }
}