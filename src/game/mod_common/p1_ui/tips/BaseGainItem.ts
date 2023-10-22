namespace game.mod {

    import JumpConfig = game.config.JumpConfig;
    import LanDef = game.localization.LanDef;

    /**
     * 通用的获取途径item
     * 跳转界面后监听 ViewEvent.ON_VIEW_HIDE 以关闭界面
     */
    export class BaseGainItem extends BaseStageEventItem {
        public title_item: game.mod.BaseNameItem;
        public list: eui.List;

        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.common.BaseGainItemSkin`;
            this.list.itemRenderer = BaseGainBtn;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickList, this);
        }

        protected onRemoveFromStage() {
            super.onRemoveFromStage();
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickList, this);
            this._listData.removeAll();
        }

        private onClickList(): void {
            let data: JumpConfig = this.list.selectedItem;
            if (!data) {
                return;
            }
            ViewMgr.getIns().showViewByID(data.index);
        }

        /**
         * 设置标题
         * @param titleName 标题文本
         */
        private setTitle(titleName: string = getLanById(LanDef.wupinlaiyuan)): void {
            this.title_item.setTitle(TextUtil.addColor(titleName, BlackColor.YELLOW));
        }

        /**
         * 设置物品来源跳转路径（需监听 ViewEvent.ON_VIEW_HIDE 以关闭界面）
         * @param gain 获取途径跳转ID
         * @param titleName 默认：物品来源
         */
        public updateShow(gain: number[], titleName: string = getLanById(LanDef.wupinlaiyuan)): void {
            this.setTitle(titleName);
            if (!gain || !gain.length) {
                return;
            }
            let jumps: JumpConfig[] = [];
            for (let item of gain) {
                let cfg: JumpConfig = getConfigByNameId(ConfigName.Jump, item);
                jumps.push(cfg);
            }
            this._listData.replaceAll(jumps);
        }

    }

    export class BaseGainBtn extends BaseRenderer {
        public iconDisplay: eui.Image;
        public labelDisplay: eui.Label;
        public redPoint: eui.Image;

        protected childrenCreated() {
            super.childrenCreated();
            this.redPoint.visible = false;
        }

        protected dataChanged() {
            let data = this.data as JumpConfig;
            if (!data) {
                return;
            }
            this.iconDisplay.source = data.icon;
        }
    }

}