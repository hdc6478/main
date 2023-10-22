namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieTansuoLayerItem extends BaseListenerRenderer {
        public lb_layer: eui.Label;

        data: number;

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_layer.text = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips14), [data]);
        }
    }
}