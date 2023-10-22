namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import DemonRewardConfig = game.config.DemonRewardConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import TouchEvent = egret.TouchEvent;

    export class KillBossMdr extends MdrBase {
        private _view: KillBossView = this.mark("_view", KillBossView);
        private _proxy: KillBossProxy;

        private _info: IKillBossData;

        private _listData: ArrayCollection = new ArrayCollection();
        private _listBoss: ArrayCollection = new ArrayCollection();
        private _listServer: ArrayCollection = new ArrayCollection();
        private _listPerson: ArrayCollection = new ArrayCollection();
        private _listLast: ArrayCollection = new ArrayCollection();

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.KillBoss);

            // this._view.img_bg.source = ResUtil.getUiJpg("killboss_bg");

            this._view.list_boss.itemRenderer = KillBossTabItem;
            this._view.list_boss.dataProvider = this._listBoss;

            this._view.list_server.itemRenderer = Icon;
            this._view.list_server.dataProvider = this._listServer;

            this._view.list_person.itemRenderer = Icon;
            this._view.list_person.dataProvider = this._listPerson;

            this._view.list_last.itemRenderer = Icon;
            this._view.list_last.dataProvider = this._listLast;

            // this._view.list.itemRenderer = KillBossItem;
            // this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_boss, ItemTapEvent.ITEM_TAP, this.onClickTab, this);
            addEventListener(this._view.btn1, TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.btn2, TouchEvent.TOUCH_TAP, this.onClickBtn, this);
            addEventListener(this._view.btn3, TouchEvent.TOUCH_TAP, this.onClickBtn, this);

            this.onNt(ActivityEvent.ON_UPDATE_KILLBOSS_INFO, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_KILLBOSS_SELECT_INDEX, this.onSelectIndex, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.onInitTab();
        }

        private onInitTab(): void {
            this._listBoss.source = this._proxy.getCfgListByType(this._proxy.getTypeByIndex());

            this.onUpdateIndex(this._proxy.getInitIndex());
        }

        private onUpdateView(): void {
            this._info = this._proxy.getRewardList(this._proxy.getTypeByIndex(), this._proxy.bossIndex);
            let info: IKillBossData = this._info;
            this._listServer.source = info.cfg.first_skill_reward;
            this._listPerson.source = info.cfg.personal_kill_reward;
            this._listLast.source = info.cfg.end_skill_reward;

            let status = info.status;
            if (status && status.first_name) {
                let str = StringUtil.substitute(getLanById(LanDef.killboss_tips), [TextUtil.addColor(`${status.first_name}`, WhiteColor.GREEN)])
                this._view.lab.textFlow = TextUtil.parseHtml(str);
                this._view.img_kill.visible = true;
            } else {
                this._view.lab.text = "";
                this._view.img_kill.visible = false;
            }

            let first_reward: number = status && status.first_reward || 0;
            this._view.img_get1.visible = first_reward == 2;
            this._view.btn1.visible = !this._view.img_get1.visible;

            let personal_reward: number = status && status.personal_reward || 0;
            this._view.img_get2.visible = personal_reward == 2;
            this._view.btn2.visible = !this._view.img_get2.visible;

            let kill_reward: number = status && status.kill_reward || 0;
            this._view.img_get3.visible = kill_reward == 2;
            this._view.btn3.visible = !this._view.img_get3.visible;

            let open = this._proxy.checkBossOpen(this._proxy.getTypeByIndex());
            if (!open) {
                this._view.btn1.label = this._view.btn2.label = this._view.btn3.label = `${this._proxy.getTypeByIndex()}转开启`;
                this._view.btn1.setLabelColor(Color.RED);
                this._view.btn2.setLabelColor(Color.RED);
                this._view.btn3.setLabelColor(Color.RED);
                return;
            }

            let b1: boolean = first_reward == 1;
            this._view.btn1.setHint(b1);
            this._view.btn1.label = b1 ? "领取" : "前往挑战";
            this._view.btn1.setLabelColor(0x8A5226);

            let b2: boolean = personal_reward == 1;
            this._view.btn2.setHint(b2);
            this._view.btn2.label = b2 ? "领取" : "前往挑战";
            this._view.btn2.setLabelColor(0x8A5226);

            let b3: boolean = kill_reward == 1;
            this._view.btn3.setHint(b3);
            this._view.btn3.label = b3 ? "领取" : "前往挑战";
            this._view.btn3.setLabelColor(0x8A5226);
        }

        private onClickTab(e: ItemTapEvent) {
            this.onUpdateIndex(e.itemIndex);
        }

        private onClickBtn(e: TouchEvent): void {
            let open = this._proxy.getOpenByType(this._proxy.getTypeByIndex());
            if (!ViewMgr.getIns().checkBossOpen(open[0], open[1], true)) {
                return;
            }
            let rewardType = 0;
            let bool: boolean = false;
            switch (e.target) {
                case this._view.btn1:
                    rewardType = 1;
                    bool = !this._info.status || !this._info.status.first_reward;
                    break;
                case this._view.btn2:
                    rewardType = 2;
                    bool = !this._info.status || !this._info.status.personal_reward;
                    break;
                case this._view.btn3:
                    rewardType = 3;
                    bool = !this._info.status || !this._info.status.kill_reward;
                    break;
            }
            if (bool) {
                ViewMgr.getIns().showView(ModName.Boss, BossViewType.BossMain, [BossMainBtnType.Many, this._proxy.getTypeByIndex(), this._view.list_boss.selectedIndex]);
            } else {
                this._proxy.c2s_receive_demon_reward(this._proxy.bossIndex, rewardType);
            }
        }

        private onSelectIndex(n: GameNT): void {
            let index: number = n.body;
            this.onUpdateIndex(index);
        }

        private onUpdateIndex(index: number): void {
            this._view.list_boss.selectedIndex = index;
            let info: DemonRewardConfig = this._listBoss.source[this._view.list_boss.selectedIndex];
            this._proxy.bossIndex = info.index;

            this.onUpdateView()
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node.indexOf(HintMgr.getType([ModName.Activity, MainActivityViewType.KillBoss, `0${this._proxy.getTypeByIndex()}`])) > -1) {
                for (let data of this._listBoss.source) {
                    this._listBoss.itemUpdated(data);
                }
                this._view.btn1.redPoint.visible = this._info.status.first_reward == 1;
                this._view.btn2.redPoint.visible = this._info.status.personal_reward == 1;
                this._view.btn3.redPoint.visible = this._info.status.kill_reward == 1;
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}