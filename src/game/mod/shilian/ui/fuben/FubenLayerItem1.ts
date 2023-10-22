namespace game.mod.shilian {

    export class FubenLayerItem1 extends BaseRenderer {
        public grp_layer: eui.Group;
        public data: {layer?: number, isCur?: boolean};//层数,是否当前显示

        protected dataChanged() {
            if (this.data == null) {
                return;
            }
            if(this.data.layer != undefined){
                let curStr = this.data.layer + "";
                this.addBmpFont(curStr, BmpTextCfg[BmpTextType.Layer], this.grp_layer);
            }
            if(this.data.isCur != undefined){
                this.grp_layer.visible = this.data.isCur;
            }
        }
    }

}