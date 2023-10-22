namespace game.mod.surface {

    export class TianshenSuitItem extends eui.Component {
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public redPoint: eui.Image;
        public lab_cnt: eui.Label;

        public data: ITianshenSuit;
        public needHint: boolean = true;

        constructor() {
            super();
            this.skinName = "skins.surface.TianshenSuitItemSkin";
        }

        public setData(info: ITianshenSuit): void {
            this.data = info;
            if(!this.data){
                return;
            }
            this.redPoint.visible = this.needHint && this.data.hint;
            this.lab_cnt.text = `${this.data.step}阶`;
            this.img_icon.source = "tianshentz_" + info.type;
            let isActive: boolean = info.suit && !!info.suit.level;
            this.img_lock.visible = !isActive;
        }

    }
}