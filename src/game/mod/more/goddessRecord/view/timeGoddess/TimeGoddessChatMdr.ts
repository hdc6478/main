namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import NvshenDuihuaConfig = game.config.NvshenDuihuaConfig;
    import NvshenDuihuaLevelConfig = game.config.NvshenDuihuaLevelConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import nvshen_chat = msg.nvshen_chat;
    import GameNT = base.GameNT;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import TextEvent = egret.TextEvent;
    import LanDef = game.localization.LanDef;
    import clearDelay = base.clearDelay;

    export class TimeGoddessChatMdr extends MdrBase implements UpdateItem{
        private _view: TimeGoddessChatView= this.mark("_view", TimeGoddessChatView);
        private _itemList: ArrayCollection;
        private _selList: ArrayCollection;
        private _huangguProxy: HuangguProxy;
        private _proxy: GoddessRecordProxy;

        private readonly ITEM_H: number = 124;//item高度
        private readonly ITEM_N: number = 5;//item显示的数量
        private readonly SCR_H: number = 681;//滚动区域高度
        private readonly ITEM_N_CHAT: number = 3;//item显示的数量，正在对话的时候
        private readonly SCR_H_CHAT: number = 420;//滚动区域高度，正在对话的时候

        private _index: number = 0;//当前对话的index
        private _chatList: nvshen_chat[] = [];
        private content: string = "";
        private contentLen: number = -1;
        private startContent: boolean = false;
        private _delay: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;
        }

        protected onInit(): void {
            super.onInit();
            this._huangguProxy = this.retProxy(ProxyType.Huanggu);
            this._proxy = this.retProxy(ProxyType.GoddessRecord);

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
            addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view, TouchEvent.TOUCH_TAP, this.jumpChat);
            addEventListener(this._view.lab_go, TextEvent.LINK, this.onClickGo);

            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_CHAT_INFO, this.onInfoUpdate, this);
            this.onNt(HuangguEvent.ON_GODDESS_CHAT_SEL, this.onChatSel, this);
        }

        protected onShow(): void {
            super.onShow();
            this._huangguProxy.curChatType = CommonChatType.TimeGoddess;
            this.setListSel(false);
            this._view.scr.viewport.scrollV = 0;
            this._view.lab_go.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(this._view.lab_go.text, 0xFFF000, ""));
            this._view.avatarNameItem.updateShow(getLanById(LanDef.time_nvshen_tips));

            this.updateView();
        }

        protected onHide(): void {
            this._index = 0;
            this._chatList = [];
            this._itemList.removeAll();
            this.resetData();
            this.clearDelay();
            super.onHide();
        }

        private resetData(): void {
            this.content = "";
            this.contentLen = -1;
            this.startContent = false;
            this._view.scr.scrollPolicyV = "on";
            TimeMgr.removeUpdateItem(this);
        }

        private onClickGo(): void {
            this.hide();
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.TimeGoddessEvent);
        }

        private onInfoUpdate(): void {
            this.updateView();
        }

        private onChatSel(n: GameNT): void {
            let data: GoddessChatSelData = n.body;
            let info = data.info;
            let desc = data.desc;
            //去重
            for(let i of this._chatList){
                if(i.index == info.index && i.level == info.level){
                    return;
                }
            }
            this.setListSel(false);
            this._chatList.push(info);
            let infoData: GoddessChatData = {type: GoddessChatType.Self, desc: desc};
            this.addItemList(infoData);
            this.nextChat();
        }

        private updateView(): void {
            let openLv = this._proxy.getChatOpenLv();
            let chatLv = this._proxy.chatLv;
            let maxChatLv = this._proxy.chatMaxLv;
            let isFinish = this._proxy.isChatFinish();
            let canChat = !isFinish && openLv >= chatLv && chatLv <= maxChatLv;//当前好感index大于对话index，且当前对话未完成时，且不超过对话等级上限
            if(canChat){
                //开始对话，定位到对应的位置
                if(chatLv > 1){
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
                let curLv = Math.min(openLv, chatLv, maxChatLv);
                let infos = this.getInfos(curLv, isFinish);
                this.updateItemList(infos, true);
                this.setLabAct(true);
            }
        }
        //curLv：已经完成对话的等级
        private getInfos(curLv: number, isFinish?: boolean): GoddessChatData[]{
            let infos: GoddessChatData[] = [];
            for(let i = 0; i < curLv; ++i){
                let startLv = i + 1;
                let cfgList: object = getConfigByNameId(ConfigName.NvshenDuihua, startLv);
                for(let k in cfgList){
                    let cfg: NvshenDuihuaConfig = cfgList[k];
                    let infoData: GoddessChatData = {type: cfg.type};
                    if(cfg.type == GoddessChatType.Goddess){
                        //女神对话
                        infoData.desc = cfg.desc;
                    }
                    else {
                        //自己对话，取保存选择的对话信息
                        infoData.desc = this._huangguProxy.getSelfChat(cfg, CommonChatType.TimeGoddess);
                    }
                    infos.push(infoData);
                }
                let rewardCfg: NvshenDuihuaLevelConfig = getConfigByNameId(ConfigName.NvshenDuihuaLevel, startLv);
                let status = isFinish ? RewardStatus.Finish : RewardStatus.Draw;
                let rewardData: GoddessChatData = {type: GoddessChatType.Goddess, reward: rewardCfg.reward, status: status};//最后显示奖励
                infos.push(rewardData);
            }
            return infos;
        }

        //isFinish是否完成对话
        private updateItemList(infos: GoddessChatData[], isFinish?: boolean): void {
            this._view.scr.stopAnimation();
            this._view.scr.height = isFinish ? this.SCR_H : this.SCR_H_CHAT;

            if(this._itemList.source.length){
                this._itemList.replaceAll(infos);
            }
            else {
                this._itemList.source = infos;
            }
            this.updateItemListPos(isFinish);
        }

        private updateItemListPos(isFinish?: boolean): void {
            let infos = this._itemList.source;
            let pos = infos.length - 1;
            let itemN = isFinish ? this.ITEM_N : this.ITEM_N_CHAT;
            if(pos >= itemN){
                egret.callLater(() => {
                    ScrollUtil.moveVToAssign(this._view.scr, pos, this.ITEM_H, 10, 0, true);
                }, this)
            }
        }

        private addItemList(item: GoddessChatData): void {
            this._itemList.addItem(item);
            this.updateItemListPos();
        }

        private setLabAct(visible: boolean): void {
            this._view.grp_act.visible = visible;
        }

        private setListSel(visible: boolean, infoList?: GoddessChatSelData[]): void {
            this._view.list_sel.visible = this._view.lab_tips.visible = visible;
            if(visible){
                this._selList.source = infoList;
            }
        }

        private startChat(): void {
            this._index++;
            let chatLv = this._proxy.chatLv;
            let cfgList: object = getConfigByNameId(ConfigName.NvshenDuihua, chatLv);
            let cfg: NvshenDuihuaConfig = cfgList[this._index];
            if(!cfg){
                //对话已经结束，展示对话奖励
                let rewardCfg: NvshenDuihuaLevelConfig = getConfigByNameId(ConfigName.NvshenDuihuaLevel, chatLv);
                let status = RewardStatus.Finish;
                let rewardData: GoddessChatData = {type: GoddessChatType.Goddess, reward: rewardCfg.reward, status: status};//最后显示奖励
                this.addItemList(rewardData);
                this.endChat();
            }
            else {
                if(cfg.type == GoddessChatType.Goddess){
                    //女神对话
                    let infoData: GoddessChatData = {type: cfg.type, desc: cfg.desc, notShowDesc: true};
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
                    let descList = this._huangguProxy.getDescList(cfg.desc);
                    for(let pos = 0; pos < descList.length; pos++){
                        let desc = descList[pos];
                        let info: nvshen_chat = new nvshen_chat();
                        info.pos = pos;
                        info.level = cfg["level"];
                        info.index = cfg.index;
                        infoList.push({desc, info});
                    }
                    this.setListSel(true, infoList);
                }
            }
        }

        private nextChat(): void {
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
            this._proxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.Chat);
            if(this._chatList.length){
                let list = this._chatList.concat();
                this._huangguProxy.c2s_nvshen_save_chat(CommonChatType.TimeGoddess, list);
                this._chatList = [];
            }
        }

        private updateChatTxt(desc: string): void {
            let list: GoddessChatData[] = this._itemList.source;
            let chatData = list[list.length - 1];
            chatData.desc = desc;
            this._itemList.itemUpdated(chatData);
        }

        private jumpChat(): void {
            if (this.startContent) {
                this.contentLen = this.content.length;
                this.updateChatTxt(this.content);
            }
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