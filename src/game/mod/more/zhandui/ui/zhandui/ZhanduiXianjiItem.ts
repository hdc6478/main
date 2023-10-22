namespace game.mod.more {

    export class ZhanduiXianjiItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public lb_desc: eui.Label;

        data: string;

        constructor() {
            super();
            this.skinName = `skins.more.ZhanduiXianjiItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let ary = data.split('#n') || [];
            this.lb_name.textFlow = TextUtil.parseHtml(ary[0] || '');
            this.lb_desc.textFlow = TextUtil.parseHtml(ary[1] || '');
        }
    }
}