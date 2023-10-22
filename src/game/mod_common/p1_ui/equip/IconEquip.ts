namespace game.mod {

    export class IconEquip extends eui.ItemRenderer {
        public icon: Icon;
        public redPoint: eui.Image;
        public img_sel: eui.Image;
        public img_tag: eui.Image;
        public data: IconEquipData;

        constructor() {
            super();
            this.skinName = "skins.common.IconEquipSkin";
        }
        protected dataChanged(): void {
            if(this.data == null){
                this.icon.defaultIcon();
                return;
            }
            if(this.data.showHint != undefined){
                this.redPoint.visible = this.data.showHint;
            }
            if(this.data.prop != undefined){
                // 未激活装备
                if (typeof this.data.prop === 'number') {
                    this.icon.updateIconImg(`equip_icon_gray_` + this.data.prop);
                    return;
                }
                this.icon.setData(this.data.prop, IconShowType.NotTips);
                this.img_tag.source = this.data.prop.advanced_lv ?  "role_advance_lv" + this.data.prop.advanced_lv : "";
            }
            // if(this.data.lv != undefined){
                let cntStr = this.data.lv ? "+" + this.data.lv : "";
                this.icon.updateCnt(cntStr);
            // }
            if(this.data.sel !== undefined){
                this.img_sel.visible = this.data.sel;
            }
        }

        /**设置数据data，单个icon时候调用*/
        public setData(data: IconEquipData): void {
            this.data = data;
        }
    }

}