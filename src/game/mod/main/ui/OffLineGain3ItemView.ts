namespace game.mod.main {

    import PropConfig = game.config.PropConfig;

    export class OffLineGain3ItemView extends eui.Component {

        public lab_speed: eui.Label;
        public img_award: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.main.OffLineGain3ItemSkin";
        }

        public setData(awd: number[]): void {
            if(!awd) {
                return;
            }

            let cfg: PropConfig = getConfigById(awd[0]);
            this.lab_speed.text = `${StringUtil.getHurtNumStr(awd[1])}/时`;
            this.img_award.source = cfg ? cfg.icon : null;
        }
        
    }
}