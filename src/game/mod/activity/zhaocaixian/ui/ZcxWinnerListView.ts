namespace game.mod.activity {

    export class ZcxWinnerListView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public headVip: game.mod.HeadVip;
        public lb_top: eui.Label;
        public list: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.ZCXWinnerListSkin";
        }
    }

    export class ZcxWinnerItem extends BaseListenerRenderer {
        public lb_name: eui.Label;
        public lb_num: eui.Label;

        data: msg.teammate;
        private _proxy: ZcxProxy;

        constructor() {
            super();
            this.skinName = 'skins.activity.ZCXWinnerItemSkin';
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Zhaocaixian);
        }

        protected dataChanged() {
            if (!this.data) {
                return;
            }
            this.lb_name.text = this.data.name;
            this.lb_num.text = `${this._proxy.getSixLuckNum(this.data.value.toNumber())}`;
        }
    }
}