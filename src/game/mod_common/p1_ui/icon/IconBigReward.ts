namespace game.mod {
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    export class IconBigReward extends BaseRenderer {
        public icon: Icon;
        public grp_eft1: eui.Group;
        public grp_eft2: eui.Group;

        public data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long;

        private _eftId1: number;//特效
        private _eftId2: number;//特效

        constructor() {
            super();
            this.skinName = "skins.common.IconBigReward";
            this.touchEnabled = false;
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.icon.setData(this.data);
            this.removeEftSel();
            delayCall(Handler.alloc(this, () => {
                this._eftId1 = this.addEftByParent(UIEftSrc.Dajiangtishi, this.grp_eft1, 0, 0, 0, null, 1);
            }), 500);

            this._eftId2 = this.addEftByParent(UIEftSrc.DaJiangDiZuo, this.grp_eft2);
        }

        private removeEftSel() {
            if (this._eftId1) {
                this.removeEffect(this._eftId1);
                this._eftId1 = null;
            }
            if (this._eftId2) {
                this.removeEffect(this._eftId2);
                this._eftId2 = null;
            }
        }

        public setData(data: number[] | msg.prop_tips_data | PropData | number | msg.prop_attributes | Long): void {
            this.data = data;
        }

    }
}