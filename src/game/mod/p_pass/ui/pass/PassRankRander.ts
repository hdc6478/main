namespace game.mod.pass {

    import facade = base.facade;
    import RankRoleInfo = msg.rank_role_info;

    export class PassRankRander extends BaseRenderer {

        public img_bg: eui.Image;
        public img_icon: eui.Image;
        public lab_rank: eui.Label;
        public lab_role_name: eui.Label;
        public lab_power: eui.Label;
        public lab_step: eui.Label;
        public grp_eff: eui.Group;
        public data: RankRoleInfo;

        private _proxy: PassProxy;

        protected dataChanged(): void {
            super.dataChanged();
            this.removeAllEffects();

            this._proxy = facade.retMod(ModName.Pass).retProxy(ProxyType.Pass);
            this.lab_role_name.text = this.data.name;
            this.lab_power.text = this.data.power + "";
            this.lab_step.text = this._proxy.getStepByIdx(this.data.count) + '';
            this.lab_rank.text = this.data.rank_no > 3 ? "" + this.data.rank_no : '';
            this.img_icon.source = this.data.rank_no > 3 ? "" : 'rank' + this.data.rank_no;
            this.img_bg.source = this.data.rank_no == 1 ? "rank_bg2" : "rank_bg1";

            if (this.data.rank_no == 1) {
                this.addEftByParent(UIEftSrc.Paihangbangtouming, this.grp_eff);
            }
        }

    }
}