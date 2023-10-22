namespace game.mod.compete {

    import DoufaJinengConfig = game.config.DoufaJinengConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import BuffConfig = game.config.BuffConfig;

    export class KuafuDoufaSkillItem extends BaseListenerRenderer {
        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public lab_desc: eui.Label;
        public btn_buy: Btn;

        private _proxy: CompeteProxy;
        private _cost: number[];
        public data: DoufaJinengConfig;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            //let index = this.data.index;
            this._cost = this.data.cost;
            //let cfg: BattleSkillConfig = getConfigByNameId(ConfigName.Skill, index);
            let buffId = this.data.buffid;
            let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffId);
            if(!cfg){
                console.error("buff 表缺少配置 id = "+buffId);
                return ;
            }
            this.img_icon.source = cfg.icon;
            this.lab_name.text = cfg.name;
            this.lab_desc.textFlow = TextUtil.parseHtml(cfg.des);
            this.btn_buy.setCost(this._cost);
        }

        private onClick(): void {
            if(!this.data){
                return;
            }
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }

            let index = this.data.index;
            // this._proxy.c2s_new_cross_boss_hurt_reward(index);
            this._proxy.c2s_kuafudoufa_scene_use_buff(index);
        }
    }
}
