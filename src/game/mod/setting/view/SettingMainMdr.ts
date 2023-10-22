namespace game.mod.setting {

    import TouchEvent = egret.TouchEvent;
    import Handler = base.Handler;
    import facade = base.facade;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;


    export class SettingMainMdr extends MdrBase {

        private _view: SettingMainView = this.mark("_view", SettingMainView);

        //private _proxy:SettingProxy;
        private _proxy: IMiscProxy;
        _smooths: eui.Group[];
        _selectedImg: eui.Image[];

        private _listBtn: eui.ArrayCollection;
        //下方按钮列表
        private _btnData: TabBaseItemData[] = [
            {
                icon: "jihuoma"
            },
            {
                icon: "guajitubiao",
                openIdx: OpenIdx.XiuxianNvpu,
                param: [ModName.Role, NewRoleViewType.XiuxianNvpuOnlineSetting]
            }
        ];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            let test = this._view;
            //this._view.horizontalCenter = 0;
            this._proxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);

            this._view.list_btn.itemRenderer = TabSecondItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            //this.onNt(SettingEvent.ON_SETTING_HINT_UPDATE, this.updateHint, this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            //top
            addEventListener(this._view.btn_modify, TouchEvent.TOUCH_TAP, this.btn_modifyFunc);//修改
            addEventListener(this._view.male, TouchEvent.TOUCH_TAP, this.maleFunc); //男
            addEventListener(this._view.female, TouchEvent.TOUCH_TAP, this.femaleFunc); //女
            addEventListener(this._view.btn_copy, TouchEvent.TOUCH_TAP, this.btn_copyFunc); //

            addEventListener(this._view.btn_head, TouchEvent.TOUCH_TAP, this.btn_headFunc); //
            addEventListener(this._view.HeadVip_head, TouchEvent.TOUCH_TAP, this.btn_headFunc);
            //addEventListener(this._view.btn_head, TouchEvent.TOUCH_TAP, this.btn_copyFunc); //


            //middle
            addEventListener(this._view.bgMusic, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
            addEventListener(this._view.autoShenjiang, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
            addEventListener(this._view.gameMusic, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
            addEventListener(this._view.autoHuashen, TouchEvent.TOUCH_TAP, this.checkBoxFunc);
            addEventListener(this._view.gameShake, TouchEvent.TOUCH_TAP, this.checkBoxFunc);

            //bottom
            this._smooths = [this._view.m_smooth1, this._view.m_smooth2, this._view.m_smooth3];
            this._selectedImg = [this._view.img_select01, this._view.img_select02, this._view.img_select03];

            addEventListener(this._view.m_smooth1, TouchEvent.TOUCH_TAP, this.smoothFunc1);
            addEventListener(this._view.m_smooth2, TouchEvent.TOUCH_TAP, this.smoothFunc2);
            addEventListener(this._view.m_smooth3, TouchEvent.TOUCH_TAP, this.smoothFunc3);

            addEventListener(this._view.btn_activation, TouchEvent.TOUCH_TAP, this.btn_activationFunc);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList);

            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);

        }

        protected onShow(): void {
            super.onShow();
            this.setTopStatic();
            this.updateTop();
            this.updateMid();
            this.updateBttom();

            this._listBtn.replaceAll(this._btnData);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onRoleUpdate(n: base.GameNT): void {
            let keys: string[] = n.body;
            let ret = false;
            if (keys.indexOf(RolePropertyKey.name) >= 0 || keys.indexOf(RolePropertyKey.sex) >= 0) {
                ViewMgr.getIns().show("修改个人信息成功");
                ret = true;
            }

            if (ret || keys.indexOf(RolePropertyKey.head) >= 0 || keys.indexOf(RolePropertyKey.head_frame) >= 0
                || keys.indexOf(RolePropertyKey.vip_lv) >= 0
            ) {
                this.updateTop();
            }
        }

        private btn_headFunc(): void {

            if (ViewMgr.getIns().checkViewOpen(OpenIdx.DressUp)) {
                ViewMgr.getIns().showView(ModName.Role, NewRoleViewType.RoleMain, MdrTabBtnType.TabBtnType03);
            } else {
                PromptBox.getIns().show("装扮系统未开启");
            }
        }

        private smoothFunc1(e: TouchEvent): void {
            this.setIconSelManys(this._view.m_smooth1);
            egret.localStorage.setItem(SettingKey.gameModel,"1");
            this._proxy.setSetting(SettingKey.gameModel, "1");
            this.showConfirm();
        }

        private smoothFunc2(e: TouchEvent): void {
            this.setIconSelManys(this._view.m_smooth2);
            egret.localStorage.setItem(SettingKey.gameModel,"2");
            this._proxy.setSetting(SettingKey.gameModel, "2");
            this.showConfirm();
        }

        private smoothFunc3(e: TouchEvent): void {
            this.setIconSelManys(this._view.m_smooth3);
            egret.localStorage.setItem(SettingKey.gameModel,"3");
            this._proxy.setSetting(SettingKey.gameModel, "3");
            this.showConfirm();
        }

        private showConfirm():void{
            ViewMgr.getIns().showConfirm("重启游戏才会立刻生效，需要立刻重启吗？", Handler.alloc(this,function () {
                if(window.location && window.location.reload){
                    gso.versionIsLoaded = false;
                    gzyyou.sdk.logout();
                    window.location.reload();
                }
            }));
        }


        private setIconSelManys(e: eui.Group): void {
            for (let i = 0; i < this._smooths.length; i++) {
                let img = this._selectedImg[i];
                if (this._smooths[i] == e) {
                    img.visible = true;
                } else {
                    img.visible = false;
                }
            }
        }

        private setTopStatic(): void {
            this._view.secondPop.updateTitleStr("设置");
            //uiid 修改
            this._view.label_uid.text = "(" + "UID:" + RoleVo.ins.role_id + "" + ")";
        }

        private updateTop(): void {
            //
            //玩家名字
            this._view.editable_name.text = RoleVo.ins.name;
            //
            this._view.HeadVip_head.updateShow(RoleVo.ins.head, RoleVo.ins.head_frame, RoleVo.ins.sex, RoleVo.ins.vip_lv);

            //消耗
            let config: ParamConfig = GameConfig.getParamConfigById("gaimingka_xiaohao");
            let values = config.value;
            let id = values[0];

            let bag: IBagProxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);

            let ret = bag.isHasItem(PropIndex.ChangeNameCard);
            let cfg: PropConfig = getConfigByNameId(ConfigName.Prop, id);
            if (ret) {
                //消耗道具，显示道具图标
                //let propCfg: PropConfig = getConfigByNameId(ConfigName.Prop,id);
                //let url = ResUtil.getUiProp({index:id,icon:propCfg.icon});
                this._view.modifi_gai.imgCost = cfg.icon;
                this._view.modifi_gai.setLabCost("x1");
                //图标
                this._view.modifi_gai.imgCost = cfg.icon;
            } else {
                //消耗仙玉，显示仙玉图标
                let icon = PropIndexToKey[PropIndex.Xianyu];
                let cfg: PropConfig = GameConfig.getPropConfigById(PropIndex.Xianyu);
                this._view.modifi_gai.setLabCost(values[1]);
                //图标
                this._view.modifi_gai.imgCost = cfg.icon;
            }


            let isMale = RoleVo.ins.sex == 1;
            this._view.male.selected = isMale;
            this._view.female.selected = !isMale;
        }

        private updateMid(): void {
            //屏蔽背景音乐
            let bgMusic = this._proxy.getSettingN(SettingKey.bgMusic);
            this._view.bgMusic.selected = !!bgMusic;

            //自动召唤光暗神将
            let autoShenjiang = this._proxy.getSettingN(SettingKey.autoShenjiang);
            this._view.autoShenjiang.selected = !!autoShenjiang;

            //屏蔽游戏音效
            let gameMusic = this._proxy.getSettingN(SettingKey.gameMusic);
            this._view.gameMusic.selected = !!gameMusic;

            //自动释放化神
            let autoHuashen = this._proxy.getSettingN(SettingKey.autoHuashen);
            this._view.autoHuashen.selected = !!autoHuashen;

            //屏蔽游戏震屏
            let gameShake = this._proxy.getSettingN(SettingKey.gameShake);
            this._view.gameShake.selected = !!gameShake;
        }

        private updateBttom(): void {
            // //游戏流畅度选择
            // let performance =  this._proxy.getSetting(SettingKey.performance) || 1;
            // this._view.smooth.img_sel
            // this._view.recommend, this._view.fullyopen
            let model = this._proxy.getSetting(SettingKey.gameModel) || "2";
            egret.localStorage.setItem(SettingKey.gameModel,model);
            this.setIconSelManys(this._view["m_smooth" + model]);

        }

        //复选按钮
        private checkBoxFunc(e: TouchEvent): void {
            let settingKey;
            let ret = (e.target as eui.CheckBox).selected;
            switch (e.target) {
                case this._view.bgMusic: {
                    settingKey = SettingKey.bgMusic;
                    SoundMgr.ins.enableSound(!ret);
                    if (ret) {
                        SoundMgr.ins.stopBg();
                    } else {
                        SoundMgr.ins.playBg();
                    }
                    break;
                }

                case this._view.autoShenjiang: {
                    settingKey = SettingKey.autoShenjiang;
                    break;
                }

                case this._view.gameMusic: {
                    settingKey = SettingKey.gameMusic;
                    SoundMgr.ins.soundEftEnabled = !ret;
                    break;
                }

                case this._view.autoHuashen: {
                    settingKey = SettingKey.autoHuashen;
                    break;
                }

                case this._view.gameShake: {
                    settingKey = SettingKey.gameShake;
                    break;
                }
            }
            this._proxy.setSetting(settingKey, ret ? "1" : "0");
        }

        //激活码
        private btn_activationFunc(): void {
            PromptBox.getIns().show("激活码，待实现");
        }

        //修改玩家信息
        private btn_modifyFunc(): void {
            let text = this._view.editable_name;
            if (text.text == "") {
                PromptBox.getIns().show("修改姓名不能为空");
                return;
            }

            let self = this;
            ViewMgr.getIns().showConfirm("确定要修改个人信息吗？", Handler.alloc(this, function () {
                let ret = self._view.male.selected;
                self._proxy.changeName(text.text, ret ? 1 : 2);
            }));

        }

        //复制信息uiid
        private btn_copyFunc(): void {
            let text = this._view.label_uid;
            if (text.text == "") {
                PromptBox.getIns().show("变强，待实现");
                return;
            }
            this.copyTextToClipboard(text.text);
        }


        // private setSelected(checkBox: eui.CheckBox, ret: boolean): void {
        //     checkBox.currentState = ret ? "upAndSelected" : "disabled";
        // }

        // private getSelected(checkBox: eui.CheckBox): boolean {
        //     return checkBox.currentState == "upAndSelected";
        // }

        private maleFunc(): void {
            this._view.female.selected = !this._view.male.selected;
        }

        private femaleFunc(): void {
            this._view.male.selected = !this._view.female.selected;
        }

        copyTextToClipboard(text: string): boolean {
            try {
                let textArea = window.document.createElement("textarea");
                textArea.style.position = "fixed";
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.width = "2em";
                textArea.style.height = "2em";
                textArea.style.padding = "0";
                textArea.style.border = "none";
                textArea.style.outline = "none";
                textArea.style.boxShadow = "none";
                textArea.style.background = "transparent";
                textArea.value = text;
                window.document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                let successful = window.document.execCommand("copy");
                window.document.body.removeChild(textArea);
                return successful;
            } catch (err) {
                console.error(err);
            }
            return false;
        }

        //todo 下方按钮列表点击
        private onClickBtnList(e: eui.ItemTapEvent): void {
            let d: TabBaseItemData = e.item;
            if (d && d.openIdx && !ViewMgr.getIns().checkViewOpen(d.openIdx, true)) {
                return;
            }

            //激活码按钮
            if (d && d.icon == 'jihuoma') {
                PromptBox.getIns().show("激活码，待实现");
                return;
            }

            if (d && d.openIdx == OpenIdx.XiuxianNvpu) {
                if (!RoleUtil.isNvpuAct(true)) {
                    return;
                }
                ViewMgr.getIns().showView(d.param[0], d.param[1]);
                this.hide();
                return;
            }
        }
    }

}
