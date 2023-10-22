namespace game.mod.more {

    import Handler = base.Handler;
    import facade = base.facade;

    export class HunkaSelIcon extends BaseRenderer {

        private icon: Icon;
        private starListFuView: StarListFuView;

        private _proxy: GoddessRecordProxy;
        public data: PropData;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.icon.setClickHandler(Handler.alloc(this, this.onClickTap));
        }

        private onClickTap(): void {
            if(!this.data){
                return;
            }
            facade.showView(ModName.More, MoreViewType.HunkaTips, this.data);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.icon.setData(this.data);
            let star = this.data.hunka_star;
            this.starListFuView.updateStar(star, -10);

            let selQulity = this._proxy.hunkaSelQuality;
            this.currentState = selQulity == this.data.quality ? "selected" : "default";
        }
    }

}