namespace game.mod.yishou {

    import facade = base.facade;

    export class YishouShoulingEquipIcon extends BaseListenerRenderer {
        public icon: game.mod.Icon;
        public redPoint: eui.Image;
        public gr_star: eui.Group;
        public lb_starcnt: eui.Label;
        public starView: game.mod.StarListView;

        data: IYishouShoulingEquipIconData;
        private _proxy: YishouProxy;

        constructor() {
            super();
            this.skinName = `skins.yishou.YishouShoulingEquipIconSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                this.icon.defaultIcon();
                this.gr_star.visible = false;
                this.redPoint.visible = false;
                return;
            }
            let cfg = this._proxy.getShoulingCfg(data.index);
            if (!cfg) {
                return;
            }
            let equipId = data.equipId;
            let equipCfg = GameConfig.getEquipmentCfg(equipId);
            if (!equipCfg) {
                return;
            }
            this.icon.setData(equipId, IconShowType.NotTips);
            this.icon.setImgActed(data.star > 0);
            this.redPoint.visible = !!data.hint;
            this.updateStarView();
        }

        private updateStarView(): void {
            this.gr_star.visible = true;
            let star = this.data.star || 0;
            if (star <= 5) {
                this.lb_starcnt.text = '';
                this.starView.updateStar(star, star);
                return;
            }
            this.starView.updateStar(1, 1);
            this.lb_starcnt.text = star + '';
        }

        private onClick(): void {
            facade.showView(ModName.Yishou, YiShouViewType.ShoulingEquipTips, this.data);
        }
    }

    export interface IYishouShoulingEquipIconData {
        index: number;//兽灵id
        equipId: number;//装备id
        idx: number;//索引
        hint: boolean;
        star: number;
    }
}