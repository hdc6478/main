namespace game.mod.main {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import GateConfig = game.config.Gate1Config;

    export class gmMdr extends MdrBase {
        private _view: gmView = this.mark("_view", gmView);

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEvent = this.onEgret.bind(this);
            addEvent(this._view.btn0, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn1, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn2, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn3, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn4, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn5, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn6, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.btn7, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.check_0, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.check_1, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.check_2, TouchEvent.TOUCH_TAP, this.onClick);
            addEvent(this._view.check_3, TouchEvent.TOUCH_TAP, this.onClick);
        }


        private onClick(e: TouchEvent) {
            let self = this;
            let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
            let content: string = "";

            switch (e.currentTarget) {
                case self._view.btn0:
                    if(this._view.txt0.text == "") {
                        PromptBox.getIns().show("请输入充值id");
                        return;
                    }
                    content = `$charge ` + this._view.txt0.text;
                    miscProxy.sendGM(content);
                    break;
                case self._view.btn1:
                    if(this._view.txt1.text == "") {
                        PromptBox.getIns().show("请输入物品id或名字 及数量");
                        return;
                    }
                    content = `$addprop ${self._view.txt1.text}`;
                    miscProxy.sendGM(content);

                    break;
                case self._view.btn2:
                    content = `$set_time ` + this._view.txt2.text;
                    miscProxy.sendGM(content);
                    break;
                case self._view.btn3:

                    let lv = "第" + this._view.txt3.text + "关";
                    let passCfg = getConfigByName(ConfigName.Gate);
                    let num = 0;
                    if (!passCfg) return;
                    for(let key in passCfg) {
                        let item = passCfg[key];
                        if(item["gate_name"] == lv){
                            num = Number(key);
                            break;
                        }
                    }
                    if(num > 0){
                        let index = num - 240000000;
                        content = `$jump_stage ` + index;
                        miscProxy.sendGM(content);
                    }

                    break;
                case self._view.btn4:
                    content = `$setrlv ` + this._view.txt4.text;
                    miscProxy.sendGM(content);
                    break;
                case self._view.btn5:
                    content = `$funcopen`;
                    miscProxy.sendGM(content);

                    break;
                case self._view.btn6:
                    if(this._view.txt6.text == "") {
                        PromptBox.getIns().show("请输入命令");
                        return;
                    }
                    content = this._view.txt6.text;
                    miscProxy.sendGM(content);

                    break;
                case self._view.btn7:
                    content = `$clearbag`;
                    miscProxy.sendGM(content);

                    break;
                case self._view.check_0:
                    // let t_proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                    // t_proxy.stopMainTaskFlag = this._view.check_0.selected;
                    // gso.isAutoTask = !t_proxy.stopMainTaskFlag;
                    // PromptBox.getIns().show(t_proxy.stopMainTaskFlag ? "关闭自动任务" : "开启自动任务");
                    break;
                case self._view.check_1:
                    let num2 = Number(this._view.txt5.text);
                    gso.dbg_add_prop = this._view.check_1.selected ? num2 : 0;
                    PromptBox.getIns().show("添加道具数：" + gso.dbg_add_prop);
                    break;
                case self._view.check_2:
                    gso.dbg_mdr_path = this._view.check_2.selected;
                    PromptBox.getIns().show("功能路径打印：" + (gso.dbg_mdr_path ? "开启" : "关闭"));
                    break;
                case self._view.check_3:
                    gso.dbg_HandUp = this._view.check_3.selected;
                    PromptBox.getIns().show("Ai挂机功能：" + (!gso.dbg_HandUp ? "开启" : "关闭"));
                    break;

            }
        }

        protected onShow(): void {
            super.onShow();
            this._view.check_1.selected = gso.dbg_add_prop > 0;
            this._view.check_2.selected = gso.dbg_mdr_path;
            this._view.check_0.selected =  !gso.isAutoTask;
            this._view.check_3.selected = gso.dbg_HandUp;

                this._view.txt_day.text = "当前开服天数：" + RoleUtil.getServerDay();
            this._view.txt_time.text = "服务器开启时间：" + TimeUtil.formatTimeSecond(RoleVo.ins.server_open_date) +"\n" +TimeUtil.getServerTime();

        }

        protected onHide(): void {
            super.onHide();
        }
    }
}