namespace game.mod.main {

    import Handler = base.Handler;
    import Tween = base.Tween;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Quint = base.Quint;
    import Elastic = base.Elastic;

    export class PowerChangeMdr extends EffectMdrBase implements UpdateItem{
        private _view: PowerChange = this.mark("_view", PowerChange);

        private _curPower: number;
        private _endPower: number;
        private _addPower: number;
        private _perAdd: number;

        public _showArgs: number;//上一次战力
        private _showing: boolean;//正在动画

        constructor() {
            super(Layer.tip);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.bottom = 302;
            this._view.touchEnabled = false;
            this._view.touchChildren = false;
        }

        protected onShow(): void {
            super.onShow();
            this.initPower();
            this.showViewTween();
            this.showEffect();
        }

        protected onHide(): void {
            this.removeFont();
            this.removeViewTween();
            this.removeAddTween();
            this.removeEft();
            super.onHide();
        }

        private initPower(): void {
            this._curPower = this._showArgs;
            this._endPower = RoleVo.ins.showpower.toNumber();
            this._addPower = this._endPower - this._curPower;

            let curPowerStr = this._curPower + "";
            let addPowerStr = this._addPower + "";

            let addWidth = (addPowerStr.length + 1) * 31;
            this._view.grp_add.width = addWidth;
            this._view.grp_add.anchorOffsetX = addWidth / 2;
            this._view.grp_add.x = this._view.grp_cur.x + curPowerStr.length * 35 - addWidth / 2;
            this._view.grp_cur.visible = false;
            this._view.grp_add.visible = false;

            this.addBmpFont(curPowerStr, BmpTextCfg[BmpTextType.PowerAdd1], this._view.grp_cur);
            this.addBmpFont("+" + addPowerStr, BmpTextCfg[BmpTextType.PowerAdd2], this._view.grp_add);
        }

        private removeFont(): void {
            this._view.grp_cur.removeChildren();
            this._view.grp_add.removeChildren();
        }

        private showViewTween(): void {
            this.removeViewTween();
            this._showing = true;
            this._view.grp_show.scaleX = this._view.grp_show.scaleY = 0.5;
            Tween.get(this._view.grp_show)
                .to({scaleX: 1, scaleY: 1}, 200, null, Quint.easeIn)
                .exec(Handler.alloc(this, () => {
                    this.showAddTween();
                    this._view.grp_cur.visible = true;
                    this._perAdd = Math.max(Math.floor(this._addPower / 100), 1);
                    TimeMgr.addUpdateItem(this, 15);
                }));
        }

        private removeViewTween(): void {
            Tween.remove(this._view);
        }

        private showAddTween(): void {
            this.removeAddTween();
            this._view.grp_add.visible = true;
            this._view.grp_add.y = 20;
            this._view.grp_add.alpha = 1;
            this._view.grp_add.scaleX = this._view.grp_add.scaleY = 3;
            Tween.get(this._view.grp_add)
                .to({scaleX: 1, scaleY: 1}, 200, null, Elastic.easeOut)
                .delay(1000)
                .to({y: -10, alpha: 0}, 300)
                .exec(Handler.alloc(this, () => {
                    this.checkHide();
                    this._showing = false;
                }));
        }

        private removeAddTween(): void {
            Tween.remove(this._view.grp_add);
        }

        update(time: base.Time): void {
            this.showPowerTween();
        }

        private showPowerTween(): void {
            this._curPower = Math.min(this._curPower + this._perAdd, this._endPower);
            this.addBmpFont(this._curPower + "", BmpTextCfg[BmpTextType.PowerAdd1], this._view.grp_cur);
            if(this._curPower >= this._endPower){
                TimeMgr.removeUpdateItem(this);
                this.checkHide();
                this._showing = false;
            }
        }

        private checkHide(): void {
            if(this._showing){
                return;
            }
            this.hide();
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Showpower, this._view.grp_eft, 0,0,0,null,1);
        }
    }
}
