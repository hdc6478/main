namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import Monster1Config = game.config.Monster1Config;
    import LanDef = game.localization.LanDef;
    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;

    export class FengmoFightMdr extends MdrBase {
        private _view: FengmoFightView = this.mark("_view", FengmoFightView);

        private _itemList: ArrayCollection;
        private _proxy: FengmoProxy;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Fengmo);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_saodang, TouchEvent.TOUCH_TAP, this.onClickSao);
            addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            this._view.progress.showMax();
            this._view.progress.showLabel("100%");

            let guild_fengmo_model: number = this._proxy.guild_fengmo_model;
            let monster: Monster1Config = getConfigByNameId(ConfigName.Monster, guild_fengmo_model);
            this._view.lab_name.text = monster.name;

            let hurt: string = StringUtil.getHurtNumStr(this._proxy.my_max_damage);
            let color: string = TextUtil.addColor(hurt, BlackColor.GREEN);
            let str: string = StringUtil.substitute(getLanById(LanDef.xianzong_tips13), [color]);
            this._view.lab_maxhurt.textFlow = TextUtil.parseHtml(str);

            let str2: string = StringUtil.substitute(getLanById(LanDef.xianzong_tips12), [color]);
            this._view.lab_hurt.textFlow = TextUtil.parseHtml(str2);

            this._view.countItem.setData(this._proxy.times, Handler.alloc(this, this.onUpdateCount));

            this._itemList.replaceAll(this._proxy.reward)
        }

        private onUpdateCount(): void {
            let count: number = this._view.countItem.getCnt;
            let hurt: string = StringUtil.getHurtNumStr(this._proxy.my_max_damage * count);
            let color: string = TextUtil.addColor(hurt, BlackColor.GREEN);
            let str: string = StringUtil.substitute(getLanById(LanDef.xianzong_tips12), [color]);
            this._view.lab_hurt.textFlow = TextUtil.parseHtml(str);

            let list: PropData[] = [];
            for (let data of this._proxy.reward) {
                list.push(PropData.create(data.idx, data.cnt * count));
            }
            this._itemList.replaceAll(list)
        }

        private onClickSao(): void {
            let count: number = this._view.countItem.getCnt;
            this._proxy.c2s_guild_fengmo_battle(2, count);
            this.hide();
        }

        private onClickFight(): void {
            this._proxy.c2s_guild_fengmo_battle(1);
            this.hide();
        }
    }
}