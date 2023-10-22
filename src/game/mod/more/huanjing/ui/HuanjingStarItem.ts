namespace game.mod.more {

    import facade = base.facade;

    export class HuanjingStarItem extends BaseListenerRenderer {
        public redPoint: eui.Image;

        data: { systemId: number, pos: number, star: number, showHint: boolean };

        constructor() {
            super();
            this.skinName = `skins.more.HuanjingStarItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.currentState = data.star > 0 ? 'light' : 'dark';
            this.redPoint.visible = !!data.showHint;
        }

        //todo
        private onClick(): void {
            facade.showView(ModName.More, MoreViewType.HuanjingStarSkillTips, {
                systemId: this.data.systemId,
                pos: this.data.pos
            });
        }
    }
}