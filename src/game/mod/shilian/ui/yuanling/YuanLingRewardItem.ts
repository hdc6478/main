namespace game.mod.shilian {

    import prop_tips_data = msg.prop_tips_data;
    import Handler = base.Handler;

    export class YuanLingRewardItem extends BaseRenderer {
        public img_bg: eui.Image;
        public icon: game.mod.Icon;
        public gr_eft: eui.Group;

        data: prop_tips_data;
        //进行转换，使用 backcard_ 和 card_ 资源  紫橙红
        private _cardAry: number[] = [4, 1, 2];
        private _backEftSrc = [UIEftSrc.Backcard4, UIEftSrc.Backcard1, UIEftSrc.Backcard2];
        private _eftSrc = [null, UIEftSrc.Card1, UIEftSrc.Card2];
        private _turnEftSrc = [UIEftSrc.TurnCard4, UIEftSrc.TurnCard1, UIEftSrc.TurnCard2];

        constructor() {
            super();
            this.skinName = `skins.shilian.YuanLingRewardItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            let pos = Math.floor(this.itemIndex / 4);
            this.img_bg.visible = false;
            if (!data) {
                this.icon.visible = false;
                this.addEftByParent(this._backEftSrc[pos], this.gr_eft);//背面特效
                return;
            }
            this.setTurnEft(pos);
        }

        //翻牌特效
        private setTurnEft(pos: number): void {
            this.removeEft();
            this.addEftByParent(this._turnEftSrc[pos], this.gr_eft, 0, 0, 0, Handler.alloc(this, this.endEft, [pos]), 1);
        }

        //翻牌后，显示正面特效和道具
        private endEft(pos: number): void {
            if (!this.data) {
                return;
            }
            this.icon.data = this.data;
            this.icon.visible = true;

            //正面特效
            this.removeEft();
            let eftSrc = this._eftSrc[pos];
            if (eftSrc) {
                this.addEftByParent(this._eftSrc[pos], this.gr_eft);
            } else {
                let card = this._cardAry[pos];
                this.img_bg.visible = true;
                this.img_bg.source = `card_${card}`;
            }
        }
    }
}