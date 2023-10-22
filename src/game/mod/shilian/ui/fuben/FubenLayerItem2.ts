namespace game.mod.shilian {

    export class FubenLayerItem2 extends BaseRenderer {
        public grp_layer: eui.Group;
        public data: number;//层数

        protected dataChanged() {
            if (this.data == null) {
                return;
            }
            let curStr = this.data + "";
            this.addBmpFont(curStr, BmpTextCfg[BmpTextType.Layer], this.grp_layer);
            this.grp_layer.alpha = 0.6;
        }
    }

}