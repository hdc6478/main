namespace game.mod.shenling {


    export class ShenLingTypeIcon extends BaseListenerRenderer {
        public img_di: eui.Image;
        public img_sel: eui.Image;
        public img_icon: eui.Image;
        public img_shuxing: eui.Image;
        public gr_lv: eui.Group;
        public lb_num: eui.Label;
        public redPoint: eui.Image;
        public lb_act: eui.Label;
        public img_lock: eui.Image;

        private _proxy: ShenLingProxy;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenLingTypeIconSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
        }

        protected dataChanged() {
            let data = this.data as ISLTypeIconData;
            if (!data) {
                return;
            }
            this.redPoint.visible = !!data.hint;
            if (data.mdrType == ShenLingMdrType.Lingpo || data.mdrType == ShenLingMdrType.Lingli) {
                this.img_icon.source = `sl_type_${data.type}`;
                this.img_di.source = 'tubiaokuang';
                this.switchVisible(false);
                return;
            }
            this.switchVisible();
            this.img_shuxing.source = `shuxingtubiao_${data.type}`;
            let info = this._proxy.getTypeInfo(data.type);
            if (info && info.upindex) {
                this.actView();
                return;
            }
            let cfg = this._proxy.getFirstActByType(data.type);
            if (cfg) {
                this.canActView();
            } else {
                this.notActView();
            }
        }

        private switchVisible(isShow = true): void {
            this.img_shuxing.visible = this.gr_lv.visible
                = this.img_lock.visible = this.lb_act.visible = isShow;
        }

        /**有第一个神灵可激活的情况*/
        private canActView(): void {
            this.gr_lv.visible = false;
            this.img_lock.visible = this.lb_act.visible = true;
            let cfg = this._proxy.getFirstActByType(this.data.type);
            let icon = cfg.icon;
            let quality = cfg.quality;
            if (cfg.subtype && cfg.subtype == 1) {
                icon = cfg.icons.split(',')[0];
                quality = SpecialQuality[cfg.character[0]];
            }
            this.img_icon.source = icon;
            this.img_di.source = `shenling_yuan_${quality}`;
        }

        /**已激活的情况*/
        private actView(): void {
            this.gr_lv.visible = true;
            this.img_lock.visible = this.lb_act.visible = false;
            let data = this.data;
            let info = this._proxy.getTypeInfo(data.type);
            this.lb_num.text = info.level + '';
            let cfg = this._proxy.getShenLingCfg(info.upindex);
            let icon = cfg.icon;
            let quality = cfg.quality;
            if (cfg.subtype && cfg.subtype == 1) {
                let singleInfo = this._proxy.getInfoByIndex(info.upindex);
                let evolveCnt = singleInfo && singleInfo.evolutions || 0;
                let icons = cfg.icons.split(',');
                let cnt = Math.max(evolveCnt - 1, 0);
                icon = icons[cnt];
                let initQua = cfg.character[0];
                quality = SpecialQuality[initQua + cnt];
            }
            this.img_icon.source = icon;
            this.img_di.source = `shenling_yuan_${quality}`;
        }

        /**未激活情况*/
        private notActView(): void {
            this.gr_lv.visible = false;
            this.img_lock.visible = this.lb_act.visible = false;
            this.img_icon.source = 'icon_jia';
            this.img_di.source = `shenling_yuan_0`;
        }
    }

    export interface ISLTypeIconData {
        type: ShenLingType,
        mdrType: ShenLingMdrType;
        hint: boolean;
    }

}