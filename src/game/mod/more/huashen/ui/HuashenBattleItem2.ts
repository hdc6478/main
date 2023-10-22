namespace game.mod.more {

    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import PropConfig = game.config.PropConfig;
    import ride_item = msg.ride_item;
    import HuashenConfig = game.config.HuashenConfig;
    import LanDef = game.localization.LanDef;

    export class HuashenBattleItem2 extends BaseListenerRenderer {
        private item: AvatarBaseItem;
        private item_skill: BattleSkillItemRender;
        private grp_sel: eui.Group;

        private _proxy: HuashenProxy;
        private _surfaceProxy: ISurfaceProxy;
        public data: ride_item;//外显数据

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.Huashen);
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.item_skill, this.onClickSkill, this);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.item, this.onClick, this);
        }

        private onClickSkill(): void {
            let data: BattleSkillItemRenderData = this.item_skill.data;
            if(!data){
                return;
            }
            ViewMgr.getIns().showSkillNormalTips(data.skillId);
        }

        private onClick(): void {
            if(this.data == null){
                return;
            }

            let index = this.data.index;
            if (this._surfaceProxy.isBattle(ConfigHead.Huashen, index)) {
                PromptBox.getIns().show(getLanById(LanDef.huashen_battle_tips));
                return;
            }
            let pos = this._proxy.selIndex + 1;
            this._surfaceProxy.c2s_ride_oper_up_star(SurfaceStarOpType.Battle, index, ConfigHead.Huashen, pos);//上阵
        }

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }

            let index = this.data.index;
            let cfg: PropConfig | any = getConfigByNameId(ConfigName.Huashen, index);
            this.item.setData(cfg);

            let skillId = (cfg as HuashenConfig).skill;
            this.item_skill.setData(skillId);

            let isBattle = this._surfaceProxy.isBattle(ConfigHead.Huashen, index);
            this.grp_sel.visible = isBattle;
        }
    }
}