namespace game.mod.jiban {

    import JumpConfig = game.config.JumpConfig;
    import LanDef = game.localization.LanDef;

    export class RoleHuanHuaIconItem extends BaseListenerRenderer {
        public img_di: eui.Image;
        public icon: game.mod.Icon;
        public lab_gain: eui.Label;

        data: IRoleHuanHuaIconData;
        private _gainId: number;
        private _proxy: ShoujiHuanhuaProxy;

        constructor() {
            super();
            this.skinName = `skins.jiban.JibanBaseItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_di.visible = false;
            this.lab_gain.touchEnabled = true;
            this._proxy = getProxy(ModName.Jiban, ProxyType.ShoujiHuanhua);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_gain, this.onClickGain, this);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this._gainId = null;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let cfg = getConfigById(data.index);
            if (!cfg) {
                DEBUG && console.error(`RoleHuanHuaIconItem 找不到配置 ${data.index}`);
                return;
            }
            this.icon.setHint(!!data.hint);
            this.icon.updateIconImg(cfg.icon);
            this.icon.updateQualityImg(ResUtil.getPropQualityImg(cfg.quality));
            let jumpCfg: JumpConfig = getConfigByNameId(ConfigName.Jump, cfg.gain_id);
            let gainName = jumpCfg && jumpCfg.name || '';
            if (cfg.gain_vip) {
                let vipLv = VipUtil.getShowVipLv(cfg.gain_vip);
                gainName = gainName + vipLv;
            }
            this.lab_gain.textFlow = jumpCfg ? TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(gainName, BlackColor.YELLOW)) : TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.huodong), BlackColor.YELLOW));
            this.lab_gain.visible = !data.isAct;

            if (data.isAct) {
                this.icon.setImgGray('');
                this._gainId = null;
            } else {
                if (Array.isArray(cfg.gain_id)) {
                    this._gainId = cfg.gain_id[0];
                } else {
                    this._gainId = cfg.gain_id;
                }
                this.icon.setImgGray();
            }
        }

        private onClickGain(): void {
            if (this._gainId) {
                ViewMgr.getIns().showViewByID(this._gainId);
            }
        }

        private onClickIcon(): void {
            if (this._proxy.canActHuanHuaIcon(this.data.suitIndex, this.data.index)) {
                this._proxy.c2s_huanhua_act(0, this.data.suitIndex, this.data.index);
                return;
            }
            let cfg = getConfigById(this.data.index);
            if (cfg && cfg.material) {
                ViewMgr.getIns().showPropTips(cfg.material[0][0]);
            }
        }
    }

    export interface IRoleHuanHuaIconData {
        suitIndex: number;//套装index
        index: number;//外显index
        idx: number;//序号
        isAct: boolean;
        hint: boolean;
    }
}