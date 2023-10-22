namespace game.mod.bag {
    import s2c_melt_equip = msg.s2c_melt_equip;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class MeltTipsMdr extends EffectMdrBase implements UpdateItem{
        private _view: MeltTipsView = this.mark("_view", MeltTipsView);

        public _showArgs: s2c_melt_equip;/**奖励*/
        private _curCnt: number;
        private _addCnt: number;
        private _perAdd: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.initReward();
            this.showTween();
            this.showEffect();

            TimeMgr.addUpdateItem(this, 15);
        }

        protected onHide(): void {
            this.removeTween();
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private initReward(): void {
            if(!this._showArgs || !this._showArgs.props){
                this.hide();
                return;
            }
            let reward = this._showArgs.props[0];
            this._view.icon.setData(reward, IconShowType.NotCnt);
            //let value = this._showArgs.value ? this._showArgs.value : 0;
            //let cntStr = "+" + reward.cnt + TextUtil.addColor("(+" + value + "%)", WhiteColor.GREEN);
            //this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            this._curCnt = 0;
            this._addCnt = reward.cnt;
            this._perAdd = Math.max(Math.ceil(this._addCnt / 100), 1);
            this._view.lab_cnt.text = "";
        }

        private showTween(): void {
            this.removeTween();
            
            this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
            Tween.get(this._view.img_type)
                .to({scaleX: 1, scaleY: 1}, 200);
        }

        private removeTween(): void {
            Tween.remove(this._view.img_type);
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Success, this._view.grp_eft, 0,0,0,null,1);
            this.addEftByParent(UIEftSrc.TipsBg, this._view.grp_eft2);
        }

        update(time: base.Time): void {
            this.showCntTween();
        }

        private showCntTween(): void {
            this._curCnt = Math.min(this._curCnt + this._perAdd, this._addCnt);

            let value = this._showArgs.value ? this._showArgs.value : 0;
            let cntStr = "+" + this._curCnt + TextUtil.addColor("(+" + value + "%)", WhiteColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            if(this._curCnt >= this._addCnt){
                TimeMgr.removeUpdateItem(this);
            }
        }
    }
}