namespace game.mod.shilian {

    import forbidden_item = msg.forbidden_item;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import Monster1Config = game.config.Monster1Config;
    import facade = base.facade;

    export class ForbiddenGateItemRender extends eui.ItemRenderer {

        public img_icon: eui.Image;
        public lab_name: eui.Label;
        public img_lock: eui.Image;
        public img_finished: eui.Image;
        public redPoint: eui.Image;

        public data: IFbdGateData;

        constructor() {
            super();
            this.skinName = "skins.shilian.ForbiddenGateItemSkin";
        }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }

            let openStr = "";
            if(this.data.showOpenStr){
                openStr = this.data.isLimitOpen ? "可挑战" : RoleUtil.getLimitStr(this.data.cfg.open, false, false);
            }
            let mcfg: Monster1Config = getConfigByNameId(ConfigName.Monster, this.data.cfg.bossId[0]);
            if(!mcfg){
                console.error(`monster1.json缺少怪物id${this.data.cfg.bossId[0]}，请检查配置`);
            }
            this.lab_name.text = this.data.isOpen ? mcfg.name : openStr;
            this.img_icon.source = mcfg.res_id;
            this.img_lock.visible = !this.data.isOpen;
            this.img_finished.visible = this.data.isOpen && this.data.isFinished;

            let _proxy: ShilianProxy = facade.retMod(ModName.Shilian).retProxy(ProxyType.Shilian);
            this.redPoint.visible = _proxy.hasBigAwd(_proxy.curFbdType, this.data.cfg.index) ||
                (_proxy.getSaodangHint(_proxy.curFbdType) && this.data.isOpen) || //扫荡红点
                (_proxy.getChallengeHint(_proxy.curFbdType) && this.data.isOpen && !this.data.isFinished);//挑战红点绑定到当前开启的关卡上
        }

    }
}