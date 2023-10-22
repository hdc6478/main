namespace game.mod.main {

    import Tween = base.Tween;
    import Handler = base.Handler;

    export class MainExpItem extends eui.Component {
        public img_exp: eui.Image;
        public gr_eft: eui.Group;
        public lb_progress: eui.Label;

        private _expWidth = 543;//经验条满的长度
        private _curLv: number;//当前等级

        constructor() {
            super();
            this.skinName = "skins.main.MainExpItemSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            Tween.remove(this.img_exp);
        }

        /**
         * 更新经验条
         * todo 特效待处理
         */
        public updateExp(): void {
            let ins = RoleVo.ins;
            let exp = ins.exp;//当前等级经验
            let levelup_exp = ins.levelup_exp;//升级所需经验

            if (exp && !exp.isZero() && levelup_exp && !levelup_exp.isZero()) {
                //有经验
                this.updateExpValue();
            } else if (levelup_exp && levelup_exp.isZero()) {
                //经验满
                this.img_exp.width = this._expWidth;
                this.lb_progress.text = `100%`;
            } else {
                //经验0
                this.img_exp.width = 0;
                this.lb_progress.text = `0%`;
            }
        }

        //更新经验条
        private updateExpValue(): void {
            let ins = RoleVo.ins;
            let ln: Long = (ins.exp).mul(100).div(ins.levelup_exp);
            let num: number = ln.toNumber() / 100;
            if (num > 1) {
                num = 1;
            }
            if (this._curLv == null) {
                //初始当前级经验
                this._curLv = ins.level;
                this.img_exp.width = this._expWidth * num;
                this.updateProgressValue();
            } else if (this._curLv != ins.level && this._curLv < ins.level) {
                //每一级经验变化
                Tween.get(this.img_exp).to({width: this._expWidth}, 200)
                    .exec(Handler.alloc(this, this.updateProgressValue))
                    .exec(Handler.alloc(this, this.endExpTween));
            } else {
                //当前级经验变化
                Tween.get(this.img_exp)
                    .to({width: (this._expWidth * num)}, 200)
                    .exec(Handler.alloc(this, this.updateProgressValue));
            }
        }

        private endExpTween(): void {
            let ins = RoleVo.ins;
            if (ins.exp && !ins.exp.isZero() && !ins.levelup_exp.isZero()) {
                this.img_exp.width = 0;
                this._curLv += 1;
                this.updateExpValue();
            }
        }

        //更新进度值
        private updateProgressValue(): void {
            let expWidth = this.img_exp.width;
            this.lb_progress.text = `${Math.floor((expWidth / this._expWidth) * 100)}%`;
        }
    }
}