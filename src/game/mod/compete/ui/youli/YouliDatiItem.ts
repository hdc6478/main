namespace game.mod.compete {
    import facade = base.facade;

    export class YouliDatiItem extends eui.ItemRenderer {

        public lab_desc: eui.Label;
        public img_sel: eui.Image;

        public data: number;//答题选项

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let index = this.data;
            let _proxy: CompeteProxy = facade.retMod(ModName.Compete).retProxy(ProxyType.Compete);
            let cfg = _proxy.datiCfg;
            this.lab_desc.text = cfg["option_" + index];

            this.img_sel.visible = RoleUtil.hasPrivilege(RolePrivilegeKey.wander_answer) && index == cfg.ture_option;//答题特权查看答案
        }
    }
}