namespace game.mod.debug {

    import Component = eui.Component;
    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import facade = base.facade;

    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;

    export class GmListMdr extends MdrBase {
        private _view: GmListView = this.mark("_view", GmListView);
        private _docs: { name: string, cmd: string, params: string[] }[];
        private _coll: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._docs = <any[]>getConfigByName(ConfigName.GmDoc);
            this._coll = new ArrayCollection();
            this._view.list.dataProvider = this._coll;
        }

        protected onShow(): void {
            super.onShow();
            this._coll.source = this._docs;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.input_txt, Event.CHANGE, this.onInputChange);
            addEventListener(this._view.btnSend, TouchEvent.TOUCH_TAP, this.onClickSend);
        }


        private onClick(e: ItemTapEvent) {
            this.hide();
            if (e.item.params.length == 0) {
                let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                miscProxy.sendGM(e.item.cmd);
                return;
            }
            this.showView("2", e.item);
        }

        private onInputChange() {
            let data: { name: string, cmd: string, params: string[] }[];
            if (this._view.input_txt.text != "") {
                let input: string = this._view.input_txt.text;
                data = [];
                for (let i of this._docs) {
                    if (i.name.indexOf(input) > -1 || i.cmd.indexOf(input) > -1) {
                        data.push(i);
                    }
                }
            } else {
                data = this._docs;
            }
            this._coll.source = data;
        }

        private onClickSend() {
            let content: string = this._view.input_txt.text;
            // if (content.indexOf("gzyyou.setdebug") === 0) {
            //     let arr: string[] = content.split(".");
            //     let isOnDebug = arr.length > 2 && arr[2] == "on";
            //     let debugLv = isOnDebug ? arr.length > 3 ? parseInt(arr[3]) : 6 : 3;
            //     if (typeof mini != "undefined") {
            //         mini.setEnableDebug({enableDebug: isOnDebug, success: () => logger.setLv(debugLv, "debug")});
            //     } else {
            //         logger.setLv(debugLv, "debug")
            //     }
            //     this._view.input.text = "";
            //     return;
            // }
            if (content.indexOf("$") == 0) {
                if (DEBUG) {
                    if (content == "$GM") {
                        facade.showView(ModName.Debug, "1");
                        return;
                    }
                }
                let miscProxy: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                miscProxy.sendGM(content);
                return;
            }
            if (DEBUG) {
                if (content.indexOf("￥") == 0) {
                    content = content.slice(1, content.length);
                    let s: string[] = content.split(" ");
                    if (s.indexOf("jump") >= 0) {
                        let num: number = s.indexOf("jump");
                        let ss: string = s[num + 1];
                        if (ss == null) return;
                        if (ss.indexOf("_") > 0) { //测试跳转id
                            let str: string[] = ss.split("_");
                            ViewMgr.getIns().showView(str.shift(), str.shift(), str);
                        } else {
                            ViewMgr.getIns().showViewByID(Number(ss));
                        }
                    } else if (s.indexOf("prop") >= 0) {
                        // let num: number = s.indexOf("prop");
                        // let ss: string = s[num + 1];
                        // if (ss == null) return;
                        // let des: string = "";
                        // let cnf: PropConfig[] = getConfigListByName(ConfigName.Prop);
                        // for (let i of cnf) {
                        //     if (i.name.indexOf(ss) > -1) {
                        //         des += i.name + "  " + i.index + "\n";
                        //     }
                        // }
                        // facade.showView(ModName.Main, MainViewType.RemindTips, des);
                    } else if (content.indexOf("des") >= 0) {
                        // facade.showView(ModName.Main, MainViewType.RemindTips, "￥des");
                    } else if (content.indexOf("addPropCnt") >= 0) {
                        let num: number = Number(s[1]);
                        gso.dbg_add_prop = num;
                        PromptBox.getIns().show("输入成功");
                    }
                    return;
                }
            }
        }
    }

    class GmListView extends Component {
        public gr_top: eui.Group;
        public btn_close: game.mod.Btn;
        public scl: eui.Scroller;
        public list: eui.List;
        public input_txt: eui.EditableText;
        public btnSend: game.mod.Btn;


        constructor() {
            super();
            this.skinName = "skins.debug.GmListSkin";

            this.horizontalCenter = 0;
            this.verticalCenter = 0;
        }
    }
}
