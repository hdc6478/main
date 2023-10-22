namespace game.mod.boss {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import TextEvent = egret.TextEvent;
    import ParamConfig = game.config.ParamConfig;
    import PersonalBossConfig = game.config.PersonalBossConfig;

    export class PersonalBossMdr extends MdrBase implements UpdateItem {
        private _view: PersonalBossView = this.mark("_view", PersonalBossView);
        private _proxy: BossProxy;

        private _bossList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Boss);

            this._bossList = new ArrayCollection();
            this._view.list_boss.itemRenderer = PersonalBossItem;
            this._view.list_boss.dataProvider = this._bossList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_sweep, TouchEvent.TOUCH_TAP, this.onClickSweep);
            addEventListener(this._view.lab_vip, TextEvent.LINK, this.onClickVip);
            this.onNt(BossEvent.ON_PERSONAL_BOSS_UPDATE, this.updateItemList, this);
            this.onNt(BossEvent.UPDATE_BOSS_lIST, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateItemList();
            this.updateVip();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickSweep(): void {
            if (BagUtil.checkBagFull()) {
                return;
            }
            this._proxy.c2s_single_boss_sweep();
        }

        private onClickVip(): void {
            ViewMgr.getIns().openVipView();
        }

        private updateItemList(): void {
            let cfgList: PersonalBossConfig[] = getConfigListByName(ConfigName.PersonalBoss);
            // if(this._bossList.source.length){
            //     this._bossList.replaceAll(cfgList);
            // }
            // else {
            //     this._bossList.source = cfgList;
            // }
            let list: PersonalBossConfig[] = [];
            for (let cfg of cfgList) {
                let openType: number = cfg.open[0];
                let openLv: number = cfg.open[1];
                if (openLv < BossShowRebirthLimit) {
                    list.push(cfg);
                    continue;
                }
                if (openType == ManyBossType.Lv) {
                    if (ViewMgr.getIns().checkLv(openLv)) {
                        list.push(cfg);
                        continue;
                    }
                } else {
                    if (ViewMgr.getIns().checkRebirth(openLv)) {
                        list.push(cfg);
                        continue;
                    }
                }
                if (openLv >= BossShowRebirthLimit) {
                    list.push(cfg);
                }
                break;
            }
            this._bossList.replaceAll(list);
        }

        update(time: base.Time): void {
            let len = this._view.list_boss.numChildren;
            for (let i = 0; i < len; ++i) {
                let item = this._view.list_boss.getChildAt(i) as PersonalBossItem;
                item.updateTime();
            }
        }

        private updateVip(): void {
            let cfg: ParamConfig = GameConfig.getParamConfigById("personal_vip_count");
            let info: number[] = cfg && cfg.value;
            let vipIndex = info[0];
            if (RoleVo.ins.vip_lv >= vipIndex) {
                this._view.lab_vip.visible = false;
                return;
            }
            this._view.lab_vip.visible = true;
            let vipCnt = info[1];
            let vipStr = VipUtil.getVipStr(vipIndex) + "增加" + vipCnt + "次";
            this._view.lab_vip.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(vipStr, WhiteColor.YELLOW, ""));
        }
    }
}