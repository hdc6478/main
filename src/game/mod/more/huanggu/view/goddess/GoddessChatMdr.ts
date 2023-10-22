namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import HuangguHaoganDuihuaConfig = game.config.HuangguHaoganDuihuaConfig;
    import HuangguHaoganConfig = game.config.HuangguHaoganConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import nvshen_chat = msg.nvshen_chat;
    import GameNT = base.GameNT;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    export class GoddessChatMdr extends MdrBase implements UpdateItem {
        private _view: GoddessChatView = this.mark("_view", GoddessChatView);
        private _itemList: ArrayCollection;
        private _selList: ArrayCollection;
        private _proxy: HuangguProxy;

        private readonly ITEM_H: number = 124;//item高度
        private readonly ITEM_N: number = 5;//item显示的数量

        private _index: number = 0;//当前对话的index
        private _chatList: nvshen_chat[] = [];
        private content: string = "";
        private contentLen: number = -1;
        private startContent: boolean = false;
        private _delay: number;
        private _isClose: boolean = true;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanggu);

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = CommonChatRender;
            this._view.list.dataProvider = this._itemList;

            this._selList = new ArrayCollection();
            this._view.list_sel.itemRenderer = CommonChatSelRender;
            this._view.list_sel.dataProvider = this._selList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            //addEventListener(this._view, TouchEvent.TOUCH_TAP, this.jumpChat);

            addEventListener(Layer.modal, TouchEvent.TOUCH_TAP, this.onClick);

            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_CHAT_INFO, this.onInfoUpdate, this);
            this.onNt(HuangguEvent.ON_GODDESS_CHAT_SEL, this.onChatSel, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.curChatType = CommonChatType.Goddess;
            this.setListSel(false);
            this._view.scr.viewport.scrollV = 0;
            this.updateView();
        }

        protected onHide(): void {
            this._index = 0;
            this._chatList = [];
            this._itemList.removeAll();
            this.resetData();
            this.clearDelay();
            Layer.modal.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
            super.onHide();
        }

        private onClick(): void {
            if (!this.jumpChat() && this._isClose) {
                this.hide();
            }
        }

        private resetData(): void {
            this.content = "";
            this.contentLen = -1;
            this.startContent = false;
            this._view.scr.scrollPolicyV = "on";
            TimeMgr.removeUpdateItem(this);
        }

        private onInfoUpdate(): void {
            this.updateView();
        }

        private onChatSel(n: GameNT): void {
            let data: GoddessChatSelData = n.body;
            let info = data.info;
            let desc = data.desc;
            //去重
            for (let i of this._chatList) {
                if (i.index == info.index && i.level == info.level) {
                    return;
                }
            }
            this.setListSel(false);
            this._chatList.push(info);
            let infoData: GoddessChatData = { type: GoddessChatType.Self, desc: desc };
            this.addItemList(infoData);
            this.nextChat();
        }

        private updateView(): void {
            let haoganLv = this._proxy.haoganLv;
            let chatLv = this._proxy.chatLv;
            let maxChatLv = this._proxy.chatMaxLv;
            let isFinish = this._proxy.isChatFinish();
            let canChat = !isFinish && haoganLv >= chatLv && chatLv <= maxChatLv;//当前好感index大于对话index，且当前对话未完成时，且不超过对话等级上限
            if (canChat) {
                //开始对话，定位到对应的位置
                if (chatLv > 1) {
                    //存在已完成的对话
                    let curLv = chatLv - 1;
                    let infos = this.getInfos(curLv);
                    this.updateItemList(infos);
                }
                this.startChat();//开始对话
                this.setLabAct(false);
            }
            else {
                //刷新列表
                let curLv = Math.min(haoganLv, chatLv, maxChatLv);
                let infos = this.getInfos(curLv, isFinish);
                this.updateItemList(infos);

                let actStr = "";
                if (chatLv < maxChatLv) {
                    actStr = StringUtil.substitute(getLanById(LanDef.huanggu_nvshen_tips13), [curLv + 1]);
                }
                this._view.lab_act.text = actStr;
                this.setLabAct(true);
            }
        }
        //curLv：已经完成对话的等级
        private getInfos(curLv: number, isFinish?: boolean): GoddessChatData[] {
            let infos: GoddessChatData[] = [];
            for (let i = 0; i < curLv; ++i) {
                let startLv = i + 1;
                let cfgList: object = getConfigByNameId(ConfigName.HuangguHaoganDuihua, startLv);
                for (let k in cfgList) {
                    let cfg: HuangguHaoganDuihuaConfig = cfgList[k];
                    let infoData: GoddessChatData = { type: cfg.type };
                    if (cfg.type == GoddessChatType.Goddess) {
                        //女神对话
                        infoData.desc = cfg.desc;
                    }
                    else {
                        //自己对话，取保存选择的对话信息
                        infoData.desc = this._proxy.getSelfChat(cfg);
                    }
                    infos.push(infoData);
                }
                let rewardCfg: HuangguHaoganConfig = getConfigByNameId(ConfigName.HuangguHaogan, startLv);
                let status = isFinish ? RewardStatus.Finish : RewardStatus.Draw;
                let rewardData: GoddessChatData = { type: GoddessChatType.Goddess, reward: rewardCfg.reward, status: status };//最后显示奖励
                infos.push(rewardData);
            }
            return infos;
        }

        //isPos暂时不用
        private updateItemList(infos: GoddessChatData[], isPos?: boolean): void {
            this._view.scr.stopAnimation();

            if (this._itemList.source.length) {
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
            this.updateItemListPos(isPos);
        }

        private updateItemListPos(isPos?: boolean): void {
            let infos = this._itemList.source;
            //isPos为true时则定位到最新的位置，否则滚动到最底部
            let pos = isPos ? infos.length : infos.length - 1;
            if (pos >= this.ITEM_N || isPos) {
                egret.callLater(() => {
                    ScrollUtil.moveVToAssign(this._view.scr, pos, this.ITEM_H, 10, 0, true, isPos);
                }, this)
            }
        }

        private addItemList(item: GoddessChatData): void {
            this._itemList.addItem(item);
            this.updateItemListPos();
        }

        private setLabAct(visible: boolean): void {
            this._view.lab_act.visible = visible;
        }

        private setListSel(visible: boolean, infoList?: GoddessChatSelData[]): void {
            this._view.list_sel.visible = this._view.lab_tips.visible = visible;
            if (visible) {
                this._selList.source = infoList;
            }
        }

        private startChat(): void {
            this._index++;
            let chatLv = this._proxy.chatLv;
            let cfgList: object = getConfigByNameId(ConfigName.HuangguHaoganDuihua, chatLv);
            let cfg: HuangguHaoganDuihuaConfig = cfgList[this._index];
            if (!cfg) {
                //对话已经结束，展示对话奖励
                let rewardCfg: HuangguHaoganConfig = getConfigByNameId(ConfigName.HuangguHaogan, chatLv);
                let status = RewardStatus.Finish;
                let rewardData: GoddessChatData = { type: GoddessChatType.Goddess, reward: rewardCfg.reward, status: status };//最后显示奖励
                this.addItemList(rewardData);
                this.endChat();
                this._isClose = true;
            }
            else {
                if (cfg.type == GoddessChatType.Goddess) {
                    //女神对话
                    let infoData: GoddessChatData = { type: cfg.type, desc: cfg.desc, notShowDesc: true };
                    this.addItemList(infoData);
                    this.startContent = true;
                    this.content = cfg.desc;
                    this._view.scr.scrollPolicyV = "off";
                    this.updateContent();
                    TimeMgr.addUpdateItem(this, 25);//用于对话文本表现
                }
                else {
                    //自己对话时候，提示选择对话
                    let infoList: GoddessChatSelData[] = [];
                    let descList = this._proxy.getDescList(cfg.desc);
                    for (let pos = 0; pos < descList.length; pos++) {
                        let desc = descList[pos];
                        let info: nvshen_chat = new nvshen_chat();
                        info.pos = pos;
                        info.level = cfg["level"];
                        info.index = cfg.index;
                        infoList.push({ desc, info });
                    }
                    this.setListSel(true, infoList);
                    this._isClose = true;
                }
            }
        }

        private nextChat(): void {
            this._isClose = false;
            //进行下一对话，延迟执行
            this.clearDelay();
            this._delay = delayCall(Handler.alloc(this, () => {
                this.startChat();
            }), 500);
        }

        private clearDelay(): void {
            if (this._delay) {
                clearDelay(this._delay);
            }
        }

        //当前等级的对话结束的时候会调用
        private endChat(): void {
            this._index = 0;
            this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.Chat);
            if (this._chatList.length) {
                let list = this._chatList.concat();
                this._proxy.c2s_nvshen_save_chat(CommonChatType.Goddess, list);
                this._chatList = [];
            }
        }

        private updateChatTxt(desc: string): void {
            let list: GoddessChatData[] = this._itemList.source;
            let chatData = list[list.length - 1];
            chatData.desc = desc;
            this._itemList.itemUpdated(chatData);
        }

        private jumpChat(): boolean {
            if (this.startContent) {
                this.contentLen = this.content.length;
                this.updateChatTxt(this.content);
                return true;
            }
            return false;
        }

        update(time: base.Time) {
            this.updateContent();
        }

        private updateContent(): void {
            if (this.contentLen == this.content.length) {
                this.resetData();
                this.nextChat();
            } else {
                this.contentLen++;
                let tmpContent = this.content.substring(0, this.contentLen);
                this.updateChatTxt(tmpContent);
            }
        }

    }
}