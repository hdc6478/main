namespace game.mod.surface {

    import PropConfig = game.config.PropConfig;

    export class TianshenIconEquip extends eui.ItemRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public img_sel: eui.Image;
        public img_tag: eui.Image;
        public data: ITianshenEquip;
        public needHint: boolean = true;

        constructor() {
            super();
            this.skinName = "skins.common.IconEquipSkin";
        }
        protected dataChanged(): void {
            if(this.data == null){
                this.icon.defaultIcon();
                return;
            }
            this.redPoint.visible = this.needHint && this.data.hint;
            let prop: PropConfig = getConfigByNameId(ConfigName.Prop, this.data.cfg.consume[0][0]);
            this.icon.updateIconImg(prop.icon);
            this.icon.updateCnt(this.data.step ? this.data.step + "阶" : "");

            let isEqpActive: boolean = this.data.eqp && !this.data.eqp.index.isZero();
            if(isEqpActive) {
                this.icon.setImgGray("");
            } else {
                this.icon.setImgGray();
            }
        }

        public setData(data: ITianshenEquip): void {
            this.data = data;
        }
    }

}