namespace game.mod.xianfa {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import ItemTapEvent = eui.ItemTapEvent;
    import skill_item = msg.skill_item;
    import GameNT = base.GameNT;
    import Handler = base.Handler;

    export class XianfaMdr extends EffectMdrBase {

        private _view: XianfaView = this.mark("_view", XianfaView);
        
        private _proxy: XianfaProxy;
        private _model: XianfaModel;
        
        private _listData: ArrayCollection;

        private _propData: PropData;
        private _isCanWear: boolean;
        private _isCanUpgrade: boolean;
        private _cost: number[];

        protected onInit(): void {
            super.onInit();
            
            this._view.touchEnabled = false;
            this._view.horizontalCenter = 0;
            
            this._proxy = this.retProxy(ProxyType.Xianfa);
            this._model = this._proxy.getModel();

            this._listData = new ArrayCollection();
            this._view.list_skill.dataProvider = this._listData;
            this._view.list_skill.itemRenderer = XianfaSkillItem;
        }

        protected addListeners(): void {
            super.addListeners();

            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            //this.onNt(RoleEvent.ON_ROLE_UPDATE, this.updateCost, this);
            this.onNt(XianfaEvent.UPDATE_XIANFA_INFO, this.updateInfo, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);

            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_wear_one_key, TouchEvent.TOUCH_TAP, this.onWearOneKey);
            addEventListener(this._view.btn_upgrade_one_key, TouchEvent.TOUCH_TAP, this.onUpgradeOneKey);

            for (let i: number = 0; i < XianfaSkillNum; i++) {
                let item: XianfaItem = this._view["item" + i];
                addEventListener(item, TouchEvent.TOUCH_TAP, this.onClickItem);
            }
        }

        protected onShow(): void {
            super.onShow();
            this.updateInfo();
            this.showGuide();
        }
        
        protected onHide(): void {
            GuideMgr.getIns().clear(GuideKey.XianfaOneUp);//清除指引
            super.onHide();
        }

        private updateInfo() {
            this._view.power.setPowerValue(this._model.totalPower);
            
            this.updateCost();
            this.updateItem();
            this.updateList();
            this.updateHint();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            if(keys.indexOf(RolePropertyKey.xianqi) >= 0){
                this.updateInfo();
            }
        }

        private updateCost(): void {
            let cost = this._model.getUpgradeCost(1, 1);
            this._cost = cost;
            this._view.cost.updateShow(cost);
            let cnt:number = BagUtil.getPropCntByIdx(cost[0]);
            this._view.cost.setLabCost(StringUtil.getHurtNumStr(cnt));
            this._propData = PropData.create(cost[0], cost[1]);
        }

        private updateItem() {
            let item: XianfaItem = null;
            for (let i: number = 0; i < XianfaSkillNum; i++) {
                item = this._view["item" + i];
                item.pos = i + 1;
                let info = this._model.getPosInfo(i + 1);
                let cfg = info ? this._model.getXianfaCfg(info.index) : null;
                item.setData(cfg, info, info ? 1 : 0);
            }
        }

        private updateList(): void {
            let ids: number[] = this._model.showXianfaIds;
            let list: IXianfaSkillData[] = [];
            for (let id of ids) {
                let cfg = this._model.getXianfaCfg(id);
                if(!cfg) {
                    continue;
                }
                let info = this._model.getInfo(cfg.index);
                let isWear = info ? this._model.isWear(id) : false;
                let sort = 0;
                if(info) {
                    sort = isWear ? -100 : -10;
                } else {
                    sort = cfg.sort;
                }
                let data: IXianfaSkillData = {
                    cfg: cfg,
                    info: info,
                    star: info ? this._model.getStarCnt(id) : 0,
                    sort: sort
                };
                if(cfg.show == 1) {
                    list.push(data);
                } else if(info || cfg.activate_material.length && cfg.activate_material[0].length 
                    && BagUtil.getPropCntByIdx(cfg.activate_material[0][0])) {
                    list.push(data);
                }
            }

            list.sort((a, b) => {
                if(a.sort < 0 && b.sort < 0) {
                    if(a.sort != b.sort) {
                        return a.sort - b.sort;
                    }
                    if(a.cfg.skill_quality != b.cfg.skill_quality) {
                        return b.cfg.skill_quality - a.cfg.skill_quality;
                    }
                    if(a.star != b.star) {
                        return b.star - a.star;
                    }
                    return b.info.lv - a.info.lv;
                }
                return a.sort - b.sort;
            });

            this._listData.replaceAll(list);
        }

        private onHintUpdate(n: GameNT) {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._model.oneKeyUpgradeHint)) {
                this._view.btn_upgrade_one_key.setHint(data.value);
            } else if (data.node == HintMgr.getType(this._model.oneKeyWearHint)) {
                this._view.btn_wear_one_key.setHint(data.value);
            }
        }

        private updateHint(): void {
            let upgradeHint = this._proxy.updateOneKeyUpgradeHint();
            this._view.btn_upgrade_one_key.setHint(upgradeHint);
            this._isCanUpgrade = upgradeHint;

            let wearHint = this._proxy.getOneKeyWearHint();
            this._view.btn_wear_one_key.setHint(wearHint);
            this._isCanWear = wearHint;
        }
        
        private onClickItem(e: TouchEvent) {
            let item = e.currentTarget as XianfaItem;
            if(!item.isWear) {
                PromptBox.getIns().show("未装配仙法技能");
                return;
            }
            if(!item.data.cfg) {
                return;
            }
            ViewMgr.getIns().showSecondPop(ModName.Xianfa, XianfaViewType.XianfaSkillTip, item.data.cfg.index);
        }

        private onWearOneKey() {
            if(!this._isCanWear) {
                PromptBox.getIns().show("无更好的技能可佩戴");
                return;
            }
            this._proxy.c2s_skill_takeon(XianfaType.Type1, 2);
        }

        private onUpgradeOneKey() {
            let enough = false;
            // let infos: {[id: string]: skill_item} = this._model.getAllInfos();
            // for (let id in infos) {
            //     let info = infos[id];
            //     if(!info) {
            //         continue;
            //     }
            //     let cfg = this._model.getXianfaCfg(Number(id));
            //     let curLv = info ? info.lv : 0;
            //     let cost = this._model.getUpgradeCost(info ? curLv + 1 : 1, cfg.skill_quality);
            //     if(!cost.length) {
            //         continue;
            //     }
            //     enough = BagUtil.checkPropCnt(cost[0], cost[1]);          // 消耗足够
            //     if(enough) {
            //         break;
            //     }
            // }

            for (let i: number = 0; i < XianfaSkillNum; i++) {
                let pos = i + 1;
                let info = this._model.getPosInfo(pos);
                if(!info) {
                    continue;
                }
                let cfg = this._model.getXianfaCfg(info.index);
                let curLv = info.lv;
                let cost = this._model.getUpgradeCost(curLv + 1, cfg.skill_quality);
                if(!cost.length) {
                    continue;
                }
                enough = BagUtil.checkPropCnt(cost[0], cost[1]);          // 消耗足够
                if(enough) {
                    break;
                }
            }
            
            if(!enough) {
                // PromptBox.getIns().show("材料不足");
                ViewMgr.getIns().showGainWaysTips(this._cost[0]);
                return;
            } else if(!this._isCanUpgrade) {
                PromptBox.getIns().show("升星佩戴仙法可继续升级");
                return;
            }
            this._proxy.c2s_skill_levelup(XianfaType.Type1, 2, 1);
        }

        //-------------------------------------指引相关------------------------------------------------
        private showGuide(): void {
            GuideMgr.getIns().show(GuideKey.XianfaOneUp, this._view.btn_upgrade_one_key, Handler.alloc(this, this.onUpgradeOneKey));//指引
        }

    }
}