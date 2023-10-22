namespace game.mod.more {

    export class XujieJitanSeacomItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public img_flag: eui.Image;

        data: { isActed: boolean, txt: string };

        constructor() {
            super();
            this.skinName = `skins.more.XujieJitanSeacomItemSkin`;
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            this.lb_desc.textFlow = TextUtil.parseHtml(TextUtil.addColor(data.txt, data.isActed ? BlackColor.WHITE : BlackColor.GRAY));
            this.img_flag.source = data.isActed ? 'jiyuantubiaolvse' : 'jiyuantubiaohuise';
        }
    }
}