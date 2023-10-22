namespace game.mod.shenling {

    import ShenlingConfig = game.config.ShenlingConfig;

    export class ShenlingEvolveItem extends eui.Component {
        public avatarBaseItem: game.mod.AvatarBaseItem;
        public img_type: eui.Image;
        public redPoint: eui.Image;
        public gr_eft: eui.Group;

        data: any;
        private _proxy: ShenLingProxy;
        private _hub: UIEftHub;
        private _eftId: number;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenlingEvolveItemSkin`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            if (!this._hub) {
                this._hub = new UIEftHub(this);
            }
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this._hub.removeEffect(this._eftId);
        }

        //type:1进化，2进化预览
        public updateView(cfg: ShenlingConfig, type = 1, specialQua?: SpecialQualityType): void {
            if (!cfg) {
                return;
            }
            this.img_type.source = type == 1 ? 'jinhua' : 'jinhuayulan';

            //todo
            let cnt = this._proxy.getEvolvedCnt(cfg.index);
            this.avatarBaseItem.img_bg.source = ResUtil.getBigBg(0, specialQua);
            this.avatarBaseItem.img_frame.source = ResUtil.getBigFrame(0, specialQua);
            let icon = cfg.icons ? cfg.icons.split(',')[cnt] : cfg.icon;
            this.avatarBaseItem.img_avatar.source = ResUtil.getBigIcon(icon);
            this.avatarBaseItem.img_quality.source = '';

            let eftSrc = SpecialQualityEftSrc[specialQua];
            this._hub.removeEffect(this._eftId);
            if (eftSrc) {
                this._eftId = this._hub.add(eftSrc, 0, 0, null, 0, this.gr_eft, -1);
            }
        }
    }
}