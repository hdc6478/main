namespace game.mod.shilian {

    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class ForbiddenGateAwd extends eui.Component {

        public pro_rate: ProgressBarComp;
        public icon: game.mod.Icon;
        public redPoint: eui.Image;

        private _canGet: boolean;

        constructor() {
            super();
            this.skinName = "skins.shilian.ForbiddenGateAwdSkin";
        }

        public setData(bigGateCfg: ForbiddenGateConfig, canGet0: boolean): void {
            let bigAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, bigGateCfg.gate_show_reward);
            let awd: number[] = bigAwdPreCfg ? bigAwdPreCfg.content[0] : null;
            this._canGet = canGet0;
            if (canGet0) {
                this.icon.setData(awd, IconShowType.NotTips);
            } else {
                this.icon.setData(awd, IconShowType.Reward);
            }
            this.redPoint.visible = canGet0;
        }

        public get canGet(): boolean {
            return this._canGet;
        }

    }
}