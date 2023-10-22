namespace game.mod.enhance {


    export class GemBtnItem extends BaseRenderer {

        public img_add: eui.Image;
        public icon_txt: eui.Image;
        public iconDisplay: eui.Image;
        public redPoint: eui.Image;
        public gr_eff: eui.Group;

        private _pos: number;
        private effId: number;

        constructor() {
            super();
        }

        public setEffect(effStr: string) {
            if (!this.gr_eff) return;
            if (!this.effId) {
                this.effId = this.addEftByParent(effStr, this.gr_eff);
            }
        }

        public removePosEff() {
            if (this.effId) {
                this.removeEffect(this.effId);
                this.effId = null;
            }
        }

        get pos(): number {
            return this._pos;
        }

        set pos(value: number) {
            this._pos = value;
        }

        public set txtIcon(icon: string) {
            if (this.icon_txt) {
                this.icon_txt.source = icon;
            }
        }
    }

}