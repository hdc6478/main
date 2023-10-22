namespace game.mod.jiban {

    export class RoleGatherBarItem extends BaseListenerRenderer {
        public img_bg: eui.Image;
        public lb_cnt: eui.Label;

        data: { cnt: number, isActed: boolean };

        constructor() {
            super();
            this.skinName = "skins.jiban.RoleGatherBarItemSkin";
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_cnt.text = data.cnt + '';

            this.img_bg.source = data.isActed ? `xiaokuang_huangse` : 'xiaokuang_huise';
        }
    }
}