namespace game.mod.xianyuan {

    import GameNT = base.GameNT;
    import facade = base.facade;

    export class TaskPropItem extends eui.Component {
        public img_cost: eui.Image;
        public lb_cost: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.TaskPropItemSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            facade.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.updateCost(PropIndex.Ssscoin);
        }

        private onRemoveFromStage(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            facade.offNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        public updateCost(index: number): void {
            let cnt = BagUtil.getPropCntByIdx(index);
            this.lb_cost.text = cnt + '';
            let cfg = GameConfig.getPropConfigById(index);
            this.img_cost.source = cfg.icon;
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Ssscoin) > -1) {
                this.updateCost(PropIndex.Ssscoin);
            }
        }

        private onClick(): void {
            ViewMgr.getIns().openExchangeShopView(`0${ExchangeShopType.Type5}`);
        }
    }
}