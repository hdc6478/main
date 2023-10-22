namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;
    import TouchEvent = egret.TouchEvent;
    import ParamConfig = game.config.ParamConfig;

    export class CommonChatRender extends BaseListenerRenderer {
        public img_di: eui.Image;
        public lab_txt: eui.Label;
        public list_reward: eui.List;
        public img_draw: eui.Image;
        public redPoint: eui.Image;
        public head: Head;

        private _rewardList: ArrayCollection;
        private _proxy: HuangguProxy;
        private _goddessRecordProxy: GoddessRecordProxy;

        public data: GoddessChatData;

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.Huanggu);
            this._goddessRecordProxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            let type = data.type;
            let desc = data.desc;
            let reward = data.reward;//对话的奖励
            let status = data.status;//奖励状态，RewardStatus
            let notShowDesc = data.notShowDesc;//初始不显示文字

            let isSelf = type == GoddessChatType.Self;
            this.currentState = isSelf ? "right" : "left";
            if(isSelf){
                this.head.updateMyHead();
            }
            else {
                let cfgStr = this._proxy.curChatType == CommonChatType.Goddess ? "huanggu_nvshen_touxiang" : "chuangshi_nvshen_touxiang";
                let pCfg: ParamConfig = GameConfig.getParamConfigById(cfgStr);
                let systemInfo: number[] = pCfg && pCfg.value;//头像ID、相框ID、性别1男2女
                this.head.updateHeadShow(systemInfo[0], systemInfo[1], systemInfo[2]);
            }
            this.list_reward.visible = !!reward;
            if(this.list_reward.visible){
                this._rewardList.source = reward.slice(0,4);
            }
            this.redPoint.visible = status == RewardStatus.Finish;
            this.img_draw.visible = status == RewardStatus.Draw;

            if(notShowDesc){
                this.lab_txt.text = "";
                data.notShowDesc = false;
            }
            else {
                this.lab_txt.textFlow = TextUtil.parseHtml(desc || "");
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            if(data.status == RewardStatus.Finish){
                if(this._proxy.curChatType == CommonChatType.Goddess){
                    this._proxy.c2s_huanggu_nvshen_op(GoddessOpType.ChatReward);
                }
                else {
                    this._goddessRecordProxy.c2s_chuang_shi_nv_shen_system_click(TimeGoddessOpType.ChatReward);
                }
            }
        }
    }
}