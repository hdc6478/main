namespace game.scene {
    import Handler = base.Handler;
    import Event = egret.Event;

    export class PlayerHp extends BaseHp {

        protected initDsp(): void {
            super.initDsp();
            this.height = 14;
            this.width = 134;
            this.hpWidth = 132;
        }

        public onAlloc(): void {
            super.onAlloc();
            this.getBgRes();
            this.getHpRes();
            this.getGridRes();
        }

        protected getHpRes() {
            this.bmpHp.addEventListener(Event.COMPLETE, this.onGetBmpHp, this);
            this.bmpHp.source = "scene_hp_lv";
        }

        protected getBgRes() {
            this.bmpBg.addEventListener(Event.COMPLETE, this.onGetBmpBg, this);
            this.bmpBg.source = "scene_hp_di";
        }

        protected getGridRes() {
            this.switchGridType();
        }

        protected onGetBmpHp(): void {
            this.bmpHp.y = (this.height - 12) * 0.5;
        }

        protected onGetBmpBg(): void {
            this.bmpBg.y = (this.height - 14) * 0.5;
        }

        protected switchGridType(type?: number) {
            let color = "scene_hp_lv_line";
            if (type == HpColorType.Red) {
                color = "scene_hp_hong_line"
            }
            AssetsMgr.ins.getResAsync(color, Handler.alloc(this, this.onGetBmpGrid));
        }

        public onRelease(): void {
            super.onRelease();
        }
    }
}
