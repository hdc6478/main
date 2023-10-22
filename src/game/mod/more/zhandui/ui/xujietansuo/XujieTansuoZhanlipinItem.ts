namespace game.mod.more {

    export class XujieTansuoZhanlipinItem extends BaseListenerRenderer {
        public lb_desc: eui.Label;
        public list: eui.List;
        private _listData: eui.ArrayCollection;

        data: msg.xujietansuo_challenge_records;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoZhanlipinItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lb_desc.textFlow = TextUtil.parseHtml(data.str || '');
            this._listData.replaceAll(data.props);
        }
    }
}