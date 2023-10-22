namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import NvshenIndexConfig = game.config.NvshenIndexConfig;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class GoddessRecordMdr extends EffectMdrBase {
        private _view: GoddessRecordView = this.mark("_view", GoddessRecordView);
        private _proxy: GoddessRecordProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = GoddessRecordRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_goddess, TouchEvent.TOUCH_TAP, this.onClickGoddess);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGoddess(): void {
            //todo
            PromptBox.getIns().show("激活四位女神");
        }

        private updateView(): void {
            let infos: NvshenIndexConfig[] = getConfigListByName(ConfigName.NvshenIndex);
            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }

            let num = this._proxy.getActNum();
            let maxNum = infos.length;
            let numStr = TextUtil.addColor("（" + num + "/" + maxNum + "）", num >= maxNum ? WhiteColor.GREEN : WhiteColor.RED);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.nvshenlu_tips), [numStr]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }
    }
}