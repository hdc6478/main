namespace game.mod.more {

    export class ZhenrongItem extends BaseRenderer {
        public img_add: eui.Image;
        public gr_eft: eui.Group;
        private _effId: number;

        data: number;

        constructor() {
            super();
            this.skinName = `skins.more.ZhenrongItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            this.removeEffect(this._effId);
            if (!data) {
                this.img_add.visible = true;
                return;
            }
            this.img_add.visible = false;
            this._effId = this.addAnimate(data, this.gr_eft);

            let type = PropData.getPropParse(data);
            if (type == ConfigHead.Shenling || type == ConfigHead.Huashen) {
                this.gr_eft.scaleX = 0.5;
                this.gr_eft.scaleY = 0.5;
            } else {
                this.gr_eft.scaleX = 1;
                this.gr_eft.scaleY = 1;
            }
        }
    }
}