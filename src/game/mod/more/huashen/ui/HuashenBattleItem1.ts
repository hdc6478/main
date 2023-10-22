namespace game.mod.more {

    import facade = base.facade;
    import PropConfig = game.config.PropConfig;
    import TouchEvent = egret.TouchEvent;
    import HuashenConfig = game.config.HuashenConfig;

    export class HuashenBattleItem1 extends BaseListenerRenderer {
        private grp_item: eui.Group;
        private grp_item2: eui.Group;
        private item: AvatarBaseItem;
        private img_first: eui.Image;
        private item_skill: BattleSkillItemRender;
        private img_add: eui.Image;

        private grp_lock: eui.Group;
        private lab_lock: eui.Label;

        private redPoint: eui.Image;

        public data: number;//开启条件，仙力
        private _surfaceProxy: ISurfaceProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._surfaceProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.item_skill, this.onClickSkill, this);
        }

        private onClickSkill(): void {
            let data: BattleSkillItemRenderData = this.item_skill.data;
            if(!data){
                return;
            }
            ViewMgr.getIns().showSkillNormalTips(data.skillId);
        }

        protected dataChanged(): void {
            if(this.data == null){
                return;
            }
            let limit = this.data;//仙力
            let isOpen = RoleUtil.isLimitOpen([CommonLimitType.God, limit]);
            this.grp_lock.visible = !isOpen;
            this.grp_item.visible = isOpen;
            if(isOpen){
                let pos = this.itemIndex + 1;//位置
                let index = this._surfaceProxy.getPosIndex(ConfigHead.Huashen, pos);
                if(index){
                    //已上阵
                    this.grp_item2.visible = true;
                    this.img_add.visible = false;

                    let cfg: PropConfig | any = getConfigByNameId(ConfigName.Huashen, index);
                    this.item.setData(cfg);

                    this.img_first.visible = pos == 1;//1号位是主位

                    let skillId = (cfg as HuashenConfig).skill;
                    this.item_skill.setData(skillId);
                }
                else {
                    //未上阵
                    this.grp_item2.visible = false;
                    this.img_add.visible = true;
                }
                //红点
                this.redPoint.visible = !index && this._surfaceProxy.canPosBattle(ConfigHead.Huashen);
            }
            else {
                let lockStr = TextUtil.addColor(TextUtil.getAttrsText(AttrKey.god) + limit, UIColor.YELLOW);
                this.lab_lock.textFlow = TextUtil.parseHtml(lockStr);
                this.redPoint.visible = false;
            }
        }
    }
}