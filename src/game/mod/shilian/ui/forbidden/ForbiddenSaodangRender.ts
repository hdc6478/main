namespace game.mod.shilian {

    import LanDef = game.localization.LanDef;
    import ArrayCollection = eui.ArrayCollection;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class ForbiddenSaodangRender extends BaseListenerRenderer {

        public lab_title: eui.Label;
        public list_awd: eui.List;

        public data: {fbdFubenCfg: ForbiddenFubenConfig, fbdGateCfg: ForbiddenGateConfig, 
            passSmallGateId: number, isFinished: boolean};
        private _listData: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.shilian.ForbiddenSaodangItemSkin";
        }

        protected onAddToStage(): void {
            super.onAddToStage();

            this._listData = new ArrayCollection();
            this.list_awd.itemRenderer = Icon;
            this.list_awd.dataProvider = this._listData;
        }

        protected dataChanged(): void {
            if(!this.data) {
                return;
            }
            let chap: number = this.data.fbdFubenCfg.index % 100;
            let finishedStr: string = this.data.isFinished ? TextUtil.addColor("(已完成)", WhiteColor.GREEN)
                : TextUtil.addColor(`(通关可扫荡${this.data.passSmallGateId}/${this.data.fbdGateCfg.gate_id})`, WhiteColor.RED);
            this.lab_title.textFlow = TextUtil.parseHtml(`第${chap}章` + finishedStr);

            let listAwdPreCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, this.data.fbdGateCfg.show_reward);
            listAwdPreCfg && this._listData.replaceAll(listAwdPreCfg.content);
        }

    }
}