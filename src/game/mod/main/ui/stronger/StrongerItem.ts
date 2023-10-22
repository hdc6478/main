namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import StrongerConfig = game.config.StrongerConfig;

    export class StrongerItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public starListView: StarListView;
        public lab_desc: eui.Label;
        public btn_goto: game.mod.Btn;

        public data: StrongerConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_goto, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let cfg = this.data;
            this.img_icon.source = cfg.icon;
            this.starListView.updateNewStar(cfg.star);
            this.lab_desc.textFlow = TextUtil.parseHtml(cfg.desc);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            ViewMgr.getIns().showViewByID(this.data.jump);
        }
    }
}