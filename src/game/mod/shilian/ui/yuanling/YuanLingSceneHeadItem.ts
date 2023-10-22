namespace game.mod.shilian {

    import GPlayerVo = game.scene.GPlayerVo;

    /**场景组队head信息*/
    export class YuanLingSceneHeadVipItem extends BaseListenerRenderer {
        public head: game.mod.HeadVip;
        public bar: game.mod.ProgressBarComp;

        data: GPlayerVo;

        constructor() {
            super();
            this.skinName = `skins.shilian.YuanLingHeadVipSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.bar.labelDisplay.visible = false;
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let info = this.data;
            if (!info) {
                return;
            }
            let vip = info['vip'] ? info['vip'] : 0;//todo
            this.head.updateShow(info.head, info.head_frame, info.sex, vip);

            // 血量更新 todo
            let sceneProxy: ISceneProxy = getProxy(ModName.Scene, ProxyType.Scene);
            let vo = sceneProxy.getVoByRoleId(info.role_id) as GPlayerVo;
            this.bar.show(vo.hp.toNumber(), vo.max_hp.toNumber(), false, 0, false);
        }
    }
}