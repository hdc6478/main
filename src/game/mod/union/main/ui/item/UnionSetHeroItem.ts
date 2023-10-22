namespace game.mod.union {

    import TouchEvent = egret.TouchEvent;

    export class UnionSetHeroItem extends UnionApplyItem {

        private btn: Btn;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.btn.addEventListener(TouchEvent.TOUCH_TAP, this.onClickSet, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.btn.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickSet, this);
        }

        protected dataChanged(): void {
            super.dataChanged();

            this.btn.visible = !this._proxy.checkHero(this.data.role_id);
            this.btn_agree.visible = this.btn_refuse.visible = false;
        }

        private onClickSet(): void {
            this._proxy.c2s_set_guild_xianzong(this.data.role_id);
        }
    }
}