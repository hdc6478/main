namespace game.mod.activity {

    export class TongtiangeLayerItem extends BaseRenderer {
        public img_layer: eui.Image;
        public img_type: eui.Image;
        public redPoint: eui.Image;
        public group_eft: eui.Group;

        private _layer: number;

        constructor() {
            super();
            this.skinName = `skins.activity.TongtiangeLayerItemSkin`;
        }

        protected dataChanged() {
            let data = this.data as ITongtiangeLayerItemData;
            if (!data) {
                return;
            }
            this._layer = data.layer;
            this.updateSel(data.isSel);
            this.redPoint.visible = !!data.showHint;
        }

        public updateSel(isSel = false): void {
            this.img_type.source = isSel ? 'xuanzhong_1' : 'xuanzhong_0';
            this.removeEft();
            if (isSel) {
                this.img_layer.source = `tongtiange_chong_${this._layer}`;
                this.addEftByParent(UIEftSrc.Choose, this.group_eft);
            } else {
                this.img_layer.source = `tongtiange_chong_hui${this._layer}`;
            }
        }
    }

    export interface ITongtiangeLayerItemData {
        layer: number;
        isSel: boolean;
        showHint?: boolean;
    }
}