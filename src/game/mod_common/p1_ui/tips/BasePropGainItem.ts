namespace game.mod {

    import TouchEvent = egret.TouchEvent;
    import JumpConfig = game.config.JumpConfig;
    import LanDef = game.localization.LanDef;

    /**
     * 基础道具来源跳转组件
     */
    export class BasePropGainItem extends BaseListenerRenderer {
        public baseZhuangshiItem: BaseZhuangshiItem;
        public btn_gain: Btn;
        public data: number;//获取途径跳转ID

        constructor() {
            super();
            this.skinName = "skins.common.BasePropGainItemSkin";
        }

        protected onAddToStage() {
            super.onAddToStage();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_gain, this.onClick, this);
        }

        protected onClick(): void {
            if (!this.data) {
                return;
            }
            ViewMgr.getIns().showViewByID(this.data);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let id = this.data;
            let cfg: JumpConfig = getConfigByNameId(ConfigName.Jump, id);
            if (!cfg) {
                console.error(`跳转表没有对应的配置：${id}`);
            }
            let nameStr = cfg ? cfg.name : getLanById(LanDef.huodong);//默认会显示一个活动
            this.baseZhuangshiItem.updateShow(nameStr);
            let showJump = ViewMgr.getIns().showJumpBtn(id);//是否显示跳转按钮
            this.btn_gain.visible = showJump;
        }
    }
}