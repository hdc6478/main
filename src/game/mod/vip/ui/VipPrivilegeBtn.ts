namespace game.mod.vip {

    export class VipPrivilegeBtn extends BaseRenderer {
        public gr_vip: eui.Group;

        constructor() {
            super();
            this.skinName = `skins.vip.VipPivilegeBtnSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.addBmpFont(`V${VipUtil.getShowVipLv(data)}`, BmpTextCfg[BmpTextType.Vip], this.gr_vip, true, 1, true);
        }
    }
}