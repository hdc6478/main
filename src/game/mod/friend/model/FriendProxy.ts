namespace game.mod.friend {

    import c2s_friend_list = msg.c2s_friend_list;
    import s2c_friend_list = msg.s2c_friend_list;
    import GameNT = base.GameNT;
    import c2s_change_recommond_friend = msg.c2s_change_recommond_friend;
    import c2s_friend_apply = msg.c2s_friend_apply;
    import c2s_friend_delete = msg.c2s_friend_delete;
    import c2s_friend_give_gift = msg.c2s_friend_give_gift;
    import friend_info = msg.friend_info;
    import ParamConfig = game.config.ParamConfig;
    import FriendGiftConfig = game.config.FriendGiftConfig;
    import LanDef = game.localization.LanDef;
    import c2s_friend_pvp_challenge = msg.c2s_friend_pvp_challenge;
    import s2c_update_friend_data = msg.s2c_update_friend_data;
    import facade = base.facade;
    import friend_add_data = msg.friend_add_data;
    import qiecuo_param_data = msg.qiecuo_param_data;

    export class FriendProxy extends ProxyBase implements IFriendProxy{
        private _model: FriendModel;

        initialize(): void {
            super.initialize();
            this._model = new FriendModel();

            this.onProto(s2c_friend_list, this.s2c_friend_list, this);
            this.onProto(s2c_update_friend_data, this.s2c_update_friend_data, this);
        }

        public onStartReconnect(): void {
            super.onStartReconnect();

            this._model.giftIndexList = null;
        }

        public c2s_friend_list(type: number) {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Friend)){
                return;
            }
            let msg = new c2s_friend_list();
            msg.type = type;
            this.sendProto(msg);
        }

        public c2s_change_recommond_friend() {
            let msg = new c2s_change_recommond_friend();
            this.sendProto(msg);
        }

        public c2s_friend_apply(roleList: friend_add_data[]) {
            let msg = new c2s_friend_apply();
            msg.role_list = roleList;
            this.sendProto(msg);
        }

        public c2s_friend_delete(roleId: Long, serverId: number) {
            let msg = new c2s_friend_delete();
            msg.role_id = roleId;
            msg.server_id = serverId;
            this.sendProto(msg);
        }

        public c2s_friend_give_gift(roleId: Long, index: number, count: number) {
            let msg = new c2s_friend_give_gift();
            msg.role_id = roleId;
            msg.index = index;
            msg.count = count;
            this.sendProto(msg);
        }

        public c2s_friend_pvp_challenge(roleId: Long, data?: qiecuo_param_data) {
            let msg = new c2s_friend_pvp_challenge();
            msg.role_id = roleId;
            msg.data = data;
            this.sendProto(msg);
        }

        private s2c_friend_list(n: GameNT) {
            let msg: s2c_friend_list = n.body;
            if(!msg){
                return;
            }
            //s2c_friend_list 所有信息 都是发这个协议给你  发的是所有
            if(msg.type){
                this._model.infoList[msg.type] = msg.info_list || [];
            }
            if(msg.gift_count != undefined){
                this._model.giftCount = msg.gift_count;
            }
            this.updateHint();
            this.sendNt(FriendEvent.ON_FRIEND_UPDATE);
        }

        private s2c_update_friend_data(n: GameNT) {
            let msg: s2c_update_friend_data = n.body;
            if(!msg || !msg.list){
                return;
            }
            for(let i of msg.list){
                if(!this._model.infoList[i.type]){
                    this._model.infoList[i.type] = [];
                }
                let infoList = this._model.infoList[i.type];
                if(i.event == FriendEventType.Add){
                    //添加
                    infoList.push(i.info);
                }
                else{
                    let pos = this.getInfoPos(i.type, i.info.role_id);
                    if(i.event == FriendEventType.Delete){
                        if(i.type == FriendOpType.Friend){
                            //删除的是好友时，需要清除下私聊列表
                            let chatProxy: IChatProxy = facade.retMod(ModName.Chat).retProxy(ProxyType.Chat);
                            chatProxy.deletePrivateInfo(i.info.role_id, ChatPrivateDelType.DelFriend);
                        }
                        //删除
                        infoList.splice(pos, 1);
                    }
                    else {
                        //更新
                        infoList[pos] = i.info;
                    }
                }
            }
            this.updateHint();
            this.sendNt(FriendEvent.ON_FRIEND_UPDATE);
        }
        //信息index
        private getInfoPos(type: number, roleId: Long): number {
            let infoList = this._model.infoList[type];
            for(let i = 0; i < infoList.length; ++i){
                let info = infoList[i];
                if(info.role_id.eq(roleId)){
                    return i;
                }
            }
            return -1;
        }


        public get friendList(): friend_info[] {
            return this._model.infoList[FriendOpType.Friend] || [];
        }

        public get followList(): friend_info[] {
            return this._model.infoList[FriendOpType.Follow] || [];
        }

        public get recommendList(): friend_info[] {
            return this._model.infoList[FriendOpType.Recommend] || [];
        }

        //是否好友
        public isFriend(roleId: Long): boolean {
            for(let i of this.friendList){
                if(i.role_id.eq(roleId)){
                    return true;
                }
            }
            return false;
        }
        //好友信息
        public getFriendInfo(roleId: Long): friend_info {
            for(let i of this.friendList){
                if(i.role_id.eq(roleId)){
                    return i;
                }
            }
            return null;
        }

        //最大送礼次数
        public getMaxGiftCnt(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("friend_gifts_count");
            return cfg && cfg.value;
        }
        //送礼次数
        public getGiftCnt(): number {
            return this._model.giftCount;
        }
        //剩余送礼次数
        public getLeftGiftCnt(): number {
            let maxCnt = this.getMaxGiftCnt();
            return maxCnt - this._model.giftCount;
        }

        //最大仙友人数
        public getMaxFriendCnt(): number {
            let cfg: ParamConfig = GameConfig.getParamConfigById("friend_max_count");
            return cfg && cfg.value;
        }
        //仙友人数
        public getFriendCnt(): number {
            return this.friendList.length;
        }
        //剩余仙友人数
        public getLeftFriendCnt(): number {
            let maxCnt = this.getMaxFriendCnt();
            let cnt = this.getFriendCnt();
            return maxCnt - cnt;
        }

        //检测是否可以添加好友
        private checkCanAdd(): boolean {
            let cnt = this.getLeftFriendCnt();
            let canAdd = cnt > 0;
            if(!canAdd){
                PromptBox.getIns().show(getLanById(LanDef.friend_tips8));
            }
            return canAdd;
        }
        //添加好友
        public onClickAdd(roleList: friend_add_data[]): void {
            if(!this.checkCanAdd()){
                return;
            }
            this.c2s_friend_apply(roleList);
        }
        //一键添加好友
        public onClickOneKeyAdd(infos: friend_info[]): void {
            if(!infos || !infos.length){
                PromptBox.getIns().show(getLanById(LanDef.friend_tips12));
                return;
            }
            let roleList: friend_add_data[] = [];
            let cnt = this.getLeftFriendCnt();
            for(let i = 0; i < infos.length && i < cnt; ++i){
                let info = infos[i];
                roleList.push({role_id: info.role_id, server_id: info.server_id});
            }
            this.onClickAdd(roleList);
        }

        public get giftIndexList(): number[] {
            if(!this._model.giftIndexList){
                this._model.giftIndexList = [];
                let cfgList: FriendGiftConfig[] = getConfigListByName(ConfigName.FriendGift);
                for(let cfg of cfgList){
                    this._model.giftIndexList.push(cfg.index);
                }
            }
            return this._model.giftIndexList;
        }

        /**更新红点*/
        private updateHint(): void {
            if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Friend)){
                return;
            }
            let hint = this.getGiftHint();
            let hintType = this._model.friendHint;
            HintMgr.setHint(hint, hintType);
        }

        public getGiftHint(): boolean {
            let cnt = this.getLeftGiftCnt();
            if(cnt <= 0){
                return false;
            }
            let friendCnt = this.getFriendCnt();
            if(friendCnt <= 0){
                return false;//好友人数为0时，不提示红点
            }
            for(let i of this.giftIndexList){
                let cnt = BagUtil.getPropCntByIdx(i);
                if(cnt > 0){
                    return true;
                }
            }
            return false;
        }

        public get changeTime(): number {
            return this._model.changeTime;
        }
        public set changeTime(time: number) {
            this._model.changeTime = time;
        }

        protected onBagUpdateByPropIndex(n: base.GameNT): void {
            let indexs: number[] = n.body;
            let giftIndexList = this.giftIndexList;
            for(let i of giftIndexList){
                if(indexs.indexOf(i) >= 0){
                    this.updateHint();
                    break;
                }
            }
        }
    }
}