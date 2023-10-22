namespace game.mod.role {


    import Gate1Config = game.config.Gate1Config;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import AyahLevelConfig = game.config.AyahLevelConfig;
    import LanDef = game.localization.LanDef;

    export class XiuxianNvpuOnlineSettingMdr extends MdrBase implements UpdateItem {
        private _view: XiuxianNvpuOnlineSettingView = this.mark("_view", XiuxianNvpuOnlineSettingView);
        private _proxy: XiuxianNvpuProxy;
        private _mainProxy: IMainProxy;
        private _passProxy: IPassProxy;
        private _listData0: eui.ArrayCollection;
        private _listData1: eui.ArrayCollection;
        private _listData2: eui.ArrayCollection;
        private _checkBoxList: eui.CheckBox[] = [];
        private _eventTypes: number[] = [];//当前勾选的
        private _initEventTypes: number[] = [];//全部的
        private _confirmEditTime = 5;//点击勾选后有一定延迟时间供玩家确认修改，不用频繁发送协议
        private _isClickCheckBox = false;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XiuxianNvpu);
            this._mainProxy = getProxy(ModName.Main, ProxyType.Main);
            this._passProxy = getProxy(ModName.Pass, ProxyType.Pass);

            this._view.list0.itemRenderer = XiuxianNvpuOnlineSettingItem;
            this._view.list0.dataProvider = this._listData0 = new eui.ArrayCollection();

            this._view.list1.itemRenderer = XiuxianNvpuOnlineSettingItem;
            this._view.list1.dataProvider = this._listData1 = new eui.ArrayCollection();

            this._view.list2.itemRenderer = XiuxianNvpuOnlineSettingItem;
            this._view.list2.dataProvider = this._listData2 = new eui.ArrayCollection();

            this._view.btn_receive.setImage('lingquguaji');
            // this._view.img_bg.source = ResUtil.getUiJpg('xiuxiannvpu_guajishezhi_bg');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.checkBoxAll, egret.TouchEvent.TOUCH_TAP, this.onClickCheckboxAll, this);
            addEventListener(this._view.lb_checkBoxAll, egret.TouchEvent.TOUCH_TAP, this.onClickCheckboxAllLab, this);
            addEventListener(this._view.btn_act0, egret.TouchEvent.TOUCH_TAP, this.onClickBtnAct0, this);
            addEventListener(this._view.btn_act1, egret.TouchEvent.TOUCH_TAP, this.onClickBtnAct1, this);
            addEventListener(this._view.btn_receive, egret.TouchEvent.TOUCH_TAP, this.onClickBtnReceive, this);
            addEventListener(this._view.btn_back, egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);

            this.onNt(RoleEvent.ON_XIUXIANNVPU_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(MainEvent.UPDATE_OFFLINE, this.updateList1, this);
        }

        private onClickBack(): void {
            ViewMgr.getIns().back();
        }

        protected onShow(): void {
            super.onShow();
            this._mainProxy.c2s_hangup_get_rwd(1);
            this.onUpdateView();
        }

        protected onHide(): void {
            this.confirmEdit();
            super.onHide();
            this._checkBoxList.forEach(item => {
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
                DisplayUtils.UnParent(item);
            });
            this._checkBoxList = [];
            this._view.gr_checkbox.removeChildren();
            this._eventTypes = [];
            this._initEventTypes = [];
            this._confirmEditTime = 5;
            this._isClickCheckBox = false;
        }

        private onUpdateView(): void {
            this.updateView();
            this.onUpdateReceive();
        }

        private updateView(): void {
            let shenlingCfg = this._proxy.shenlingCfg;
            if (shenlingCfg) {
                this._view.lb_title.text = shenlingCfg.name + getLanById(LanDef.shouyi_tips);
            }

            this.updateCheckBoxList();
            this.updateList0();
            this.updateList1();
            this.updateList2();
        }

        //更新勾选框
        private updateCheckBoxList(): void {
            this._initEventTypes = [];
            this._eventTypes = this._proxy.online_list.concat();
            let curLevel = this._proxy.level;
            let cfgList: AyahLevelConfig[] = getConfigListByName(ConfigName.XiuxianNvpuLevel);
            this._view.gr_checkbox.removeChildren();
            for (let cfg of cfgList) {
                if (cfg.level > curLevel) {
                    continue;
                }
                let eventList = cfg.event_list || [];
                this._initEventTypes = this._initEventTypes.concat(eventList);
                for (let event of eventList) {
                    let check = new eui.CheckBox();
                    check.skinName = `skins.role.XiuxianNvpuOnlineCheckBoxSkin`;
                    check.label = '自动挂机' + this._proxy.getEventName(event);
                    check.name = event + '';//事件类型，用于事件抛出
                    check.selected = this._eventTypes.indexOf(+event) > -1;
                    check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
                    this._checkBoxList.push(check);
                    this._view.gr_checkbox.addChild(check);
                }
            }

            //全选框勾选状态
            this._view.checkBoxAll.selected = this._initEventTypes.length == this._eventTypes.length;
        }

        //todo
        private map: { [index: number]: string } = {
            1450000003: 'online_gain',
            1450000001: 'online_yuenbo',
            1450000006: '',//不展示
            1450000008: 'online_xianqi'
        };

        private updateList0(): void {
            let strList: string[] = [];
            let gateCfg: Gate1Config = getConfigByNameId(ConfigName.Gate, this._passProxy.curIndex);
            if (gateCfg && gateCfg.drop_show) {
                for (let item of gateCfg.drop_show) {
                    if (item[0] == PropIndex.Mucai) {
                        continue;
                    }
                    let propCfg = getConfigById(item[0]);
                    if (!propCfg) {
                        continue;
                    }
                    let head = PropData.getPropParse(item[0], PropParseType.Type);
                    let key = this.map[item[0]];
                    let privilegeVal = '';
                    let name = propCfg.name;
                    if (head == ConfigHead.Equip) {
                        name = '装备';
                    } else {
                        let val = key ? RoleUtil.getPrivilegeValue(key) : 0;
                        privilegeVal = '(+' + Math.floor(val / 100) + '%)';
                    }
                    strList.push(name + ' ' + item[1] + '/小时' + TextUtil.addColor(privilegeVal, BlackColor.GREEN));
                }
            }
            this._listData0.replaceAll(strList);
        }

        private updateList1(): void {
            let strList: string[] = [];
            let rewards = this._mainProxy.rewards || [];
            for (let item of rewards) {
                if (item) {
                    let propCfg = GameConfig.getPropConfigById(item.idx.toNumber());
                    if (propCfg) {
                        strList.push(propCfg.name + ' ' + item.cnt);
                    }
                }
            }
            this._listData1.replaceAll(strList);

            let roleRingProxy: IRoleRingProxy = getProxy(ModName.Activity, ProxyType.RoleRing);
            let isRoleActed = roleRingProxy.isRoleRingAct();//主角光环是否激活
            this._view.img_acted0.visible = isRoleActed;
            this._view.btn_act0.visible = !isRoleActed;
        }

        private updateList2(): void {
            let strList: string[] = [];
            for (let event of this._initEventTypes) {
                let name = this._proxy.getEventName(event);
                let cnt = this._proxy.getEventCnt(event);
                strList.push(name + ': ' + TextUtil.addColor(cnt + '', BlackColor.GREEN));
            }
            this._listData2.replaceAll(strList);

            let isActed = this._proxy.isBought();
            this._view.img_acted1.visible = isActed;
            this._view.btn_act1.visible = !isActed;
        }

        private onClickCheckboxAll(): void {
            this._confirmEditTime = 5;//reset
            this._isClickCheckBox = true;

            let selected = this._view.checkBoxAll.selected;
            if (selected) {
                this._eventTypes = this._initEventTypes.concat();
            } else {
                this._eventTypes = [];
            }

            let size = this._view.gr_checkbox.numChildren;
            for (let i = 0; i < size; i++) {
                let checkBox = this._view.gr_checkbox.getChildAt(i) as eui.CheckBox;
                if (checkBox) {
                    checkBox.selected = selected;
                }
            }
        }

        private onClickCheckboxAllLab(): void {
            this._view.checkBoxAll.selected = !this._view.checkBoxAll.selected;
            this.onClickCheckboxAll();
        }

        private onClickCheckBox(e: egret.TouchEvent): void {
            this._confirmEditTime = 5;//reset
            this._isClickCheckBox = true;

            let checkBox = e.target as eui.CheckBox;
            let selected = checkBox.selected;
            let type = +checkBox.name;
            let idx = this._eventTypes.indexOf(type);
            if (selected) {
                if (idx < 0) {
                    this._eventTypes.push(type);
                }
            } else {
                if (idx > -1) {
                    this._eventTypes.splice(idx, 1);
                }
            }

            //更新全选按钮
            this._view.checkBoxAll.selected = this._eventTypes.length == this._initEventTypes.length;
        }

        //激活主角光环
        private onClickBtnAct0(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
            this.hide();
        }

        //激活修仙女仆
        private onClickBtnAct1(): void {
            ViewMgr.getIns().showSecondPop(ModName.Role, NewRoleViewType.XiuxianNvpuBuy);
            this.hide();
        }

        private onClickBtnReceive(): void {
            this.confirmEdit();//点击领取前，先判断是否操作过勾选框，若是则要马上发送一次

            this._proxy.c2s_ayah_get_reward(1);
        }

        private onUpdateReceive(): void {
            if (TimeMgr.hasUpdateItem(this)) {
                return;
            }
            this.update(TimeMgr.time);
            TimeMgr.addUpdateItem(this, 1000);
        }

        //最终确定勾选框
        private confirmEdit(): void {
            if (!this._isClickCheckBox) {
                return;
            }
            this._isClickCheckBox = false;
            let onlineList = this._proxy.online_list.concat();
            let curList = this._eventTypes.concat() || [];
            if (onlineList.length != curList.length) {
                this._proxy.c2s_ayah_edit_show(2, curList);
                return;
            }
            let map = {};
            for (let type of onlineList) {
                map[type] = true;
            }
            let isSame = true;
            for (let type of curList) {
                if (!map[type]) {
                    isSame = false;//有一个不同
                    break;
                }
            }
            if (!isSame) {
                this._proxy.c2s_ayah_edit_show(2, curList);
            }
        }

        update(time: base.Time) {
            this._confirmEditTime--;
            if (this._confirmEditTime <= 0 && this._isClickCheckBox) {
                this.confirmEdit();
            }

            let timeNum: number = this._mainProxy.offlineTotalTime;
            let time1: number = timeNum > this._mainProxy.offlineMaxtime ? this._mainProxy.offlineMaxtime : timeNum;
            if (time1 < 0) {
                return;
            }
            this._view.lb_time.textFlow = TextUtil.parseHtml("累计挂机 " + TimeUtil.formatSecond(time1, "HH:mm:ss"));
        }
    }
}