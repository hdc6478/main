namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;

    export class AbyssMyTeamMdr extends MdrBase {

        private _view: AbyssMyTeamView = this.mark("_view", AbyssMyTeamView);
        private _proxy: BossProxy;

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this.onInitList();
        }

        protected onInitList(): void {
            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = AbyssMyTeamItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(SceneEvent.SCENE_CHANGE, this.hide, this);
            // this.onNt(BossEvent.ON_ABYSS_TEAM_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            // this._proxy.c2s_zhuimo_army_ui_show(3);
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected onUpdateView(): void {
            if (this._proxy.my_team.length < 3) {
                this._proxy.my_team.length = 3;
            }
            this._itemList.replaceAll(this._proxy.my_team);

            let str: string = TextUtil.addColor(`+${this._proxy.team_add_hurt / 100}%`, WhiteColor.GREEN);
            this._view.lab_hurt.textFlow = TextUtil.parseHtml(`组队增益: 伤害${str}`);
        }

    }
}
