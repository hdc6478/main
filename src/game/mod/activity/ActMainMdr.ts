namespace game.mod.activity {

    import GameNT = base.GameNT;
    import oper_act_item = msg.oper_act_item;

    export const ActTypeToMdr: { [type: number]: ActMainBtnData }  = {
        [ActivityType.FlyRank]: {mdr: FlyRankMdr, bg: "pass_rank_bg"},
        [ActivityType.FlyGift]: {mdr: FlyGiftMdr},
        [ActivityType.FlyRebate]: {mdr: FlyRebateMdr},
        [ActivityType.FlyWar]: {mdr: FlyWarMainMdr},
        [ActivityType.CaiyunbangTurntable]: {mdr: CaiyunbangMdr1, coinIndex0: PropIndex.Caiyunjinding, bg: "caiyunzhuanpanbeijingtu"}, //财运榜转盘
        [ActivityType.CaiyunbangRank]: {mdr: CaiyunbangMdr2, bg: "pass_rank_bg"},      //财运榜排行
        [ActivityType.CaiyunbangCharge]: {mdr: CaiyunbangMdr3},    //财运榜充值
        [ActivityType.CaiyunbangExchange]: {mdr: CaiyunbangMdr4, coinIndex0: PropIndex.Caiyunyinji},  //财运榜兑换
        [ActivityType.CaiyunbangLogin]: {mdr: CaiyunbangMdr5},     //财运榜登录有理
        [ActivityType.CarnivalMibao]: {mdr: CarnivalMibaoMdr, coinIndex0: PropIndex.Xingshi, bg: "carnivalmibao_bg"},     //狂欢庆典，紫薇秘宝
        [ActivityType.CarnivalGift]: {mdr: CarnivalGiftMdr, bg: "carnivalgift_bg2"},     //狂欢庆典，召唤礼包
        [ActivityType.Carnival]: {mdr: CarnivalMdr},     //狂欢庆典，狂欢节
        [ActivityType.CarnivalZhaohuan]: {mdr: CarnivalZhaohuanMdr},     //狂欢庆典，仙宗召唤
        [ActivityType.CarnivalRank]: {mdr: CarnivalRankMdr, icon: "ui_tab_rank_", bg: "pass_rank_bg"},     //狂欢庆典，仙宗排行榜
        [ActivityType.CarnivalCrossRank]: {mdr: CarnivalRankMdr, icon: "kuafu_rank_tab", bg: "pass_rank_bg"},     //狂欢庆典，跨服排行榜
        //todo：需要注意的
    };

    export class ActMainMdr extends WndBaseMdr {
        private _proxy: ActivityProxy;
        //活动入口进来的是OperActivityData结构
        //界面返回传进来的是oper_act_item[]
        //系统入口跳转传进来的是oper_act_item
        protected _showArgs: oper_act_item | oper_act_item[] | OperActivityData;//传进来的是中控活动数据
        private _curActInfo: oper_act_item;
        private _isSelAct: boolean;//是否选中对应活动，独立图标以及界面跳转进来的选中对应活动，活动编号进来的默认选中第一个
        private _selIndex: number;

        protected onInit() {
            super.onInit();
            this._proxy = getProxy(ModName.Activity, ProxyType.Activity);
        }

        protected onShow(): void {
            if(Array.isArray(this._showArgs)) {
                this._curActInfo = this._showArgs.shift();
                this._isSelAct = true;//独立图标以及界面跳转进来的选中对应活动
            }
            else if(this._showArgs instanceof oper_act_item) {
                this._curActInfo = this._showArgs;
                this._isSelAct = true;//系统跳转进来的选中对应活动
            }
            else {
                this._curActInfo = this._showArgs.actInfo;
                this._isSelAct = this._showArgs.isSingleIcon;//独立图标以及界面跳转进来的选中对应活动
            }
            this._selIndex = 0;//默认选中第一个，独立图标进来的，会选中对应的活动
            super.onShow();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_ACTIVITY_UPDATE, this.onActivityUpdate, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityClose, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_SEL_TAB, this.onActivitySelTab, this);
        }

        private onActivityClose(n: GameNT) {
            let actId: number = n.body;
            let curOpenAct = this._proxy.curOpenAct;
            if (curOpenAct && curOpenAct.act_id == actId) {
                ViewMgr.getIns().showMain();//当前活动关闭时，返回主界面
                return;
            }
            //todo，当前入口编号中的其他活动关闭
        }

        private onActivityUpdate(n: GameNT) {
            let actIdList: number[] = n.body;
            for(let actId of actIdList){
                let actInfo = this._proxy.getActData(actId);
                if(!actInfo){
                    continue;
                }
                //过滤不是当前入口编号的活动
                if(actInfo.entrance != this._curActInfo.entrance){
                    continue;
                }
                let actList = this._proxy.getActListByEntrance(actInfo.entrance);
                if(actList.length != this._btnList.source.length){
                    this.updateBtnList();
                    break;
                }
            }
        }

        private onActivitySelTab(n: GameNT): void {
            let actType: number = n.body;
            let index = this.getMdrPosByActType(actType);
            if(index < 0){
                return;
            }
            this._tab.selectIndex = index;
            this._tab.show();
        }

        /**获取对应的mdr index*/
        private getMdrPosByActType(actType: number): number {
            let list: WndBaseViewData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let actInfo = list[i].param as oper_act_item;
                if (actInfo.type == actType) {
                    return i;
                }
            }
            return -1;
        }

        /**更新list数据*/
        protected updateBtnList() {
            let list: WndBaseViewData[] = [];
            let mdrs: MdrClsList = [];

            let entrance = this._proxy.getEntrance(this._curActInfo);//部分活动没配置入口，比如飞升特惠，这时候要支持跳转后返回选中
            let actList = this._proxy.getActListByEntrance(entrance);
            for(let i = 0; i < actList.length; ++i){
                let actInfo = actList[i];
                let mdrInfo = ActTypeToMdr[actInfo.type];
                if(!mdrInfo){
                    continue;
                }
                if(this._isSelAct && actInfo.act_id == this._curActInfo.act_id){
                    this._selIndex = i;//独立图标才选中开启的活动
                }
                mdrs.push(mdrInfo.mdr);
                let btnType = (i + parseInt(MdrTabBtnType.TabBtnType01)).toString();
                let icon = mdrInfo.icon || (ActivityTabName + actInfo.type + "_");//取不到icon就按活动分页规则
                let entrance = this._proxy.getEntrance(actInfo);
                let coinIndex0 = mdrInfo.coinIndex0;//其他货币或道具展示
                let bg = mdrInfo.bg || "";//背景
                let data: WndBaseViewData = {
                    btnType: btnType,
                    icon: icon,
                    mdr: mdrInfo.mdr,
                    title: actInfo.name,
                    param: actInfo,//中控活动数据
                    hintTypes: [ModName.Activity, MainActivityViewType.ActMain, entrance, btnType],
                    coinIndex0: coinIndex0,
                    bg: bg
                };
                list.push(data);
            }
            if (mdrs.length <= 0) {
                PromptBox.getIns().show("当前无活动内容");
                ViewMgr.getIns().showMain();
                return;
            }

            this._btnList.source = list;
            this._tab.mdrClsList = mdrs;
        }

        /**刷新显示界面*/
        protected updateViewShow(): void {
            this._tab.selectIndex = this._selIndex;
            this._tab.show();
        }

        /**分页点击时检测*/
        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            this._proxy.curOpenAct = data.param;//统一设置中控活动数据
            //this._tab.params = data.param;//中控活动数据
            return true;
        }

        /**保存分页数据，子类可重写*/
        protected setViewData(): void {
            let data: WndBaseViewData = this._btnList.source[this._tab.selectIndex];
            // if(!this._firstEnter){
            //     /**非首次切换分页时，保存分页数据*/
            //     let actInfo = data.param as oper_act_item;
            //     ViewMgr.getIns().lastData = [actInfo];
            // }
            //首次进入的也保存
            let actInfo = data.param as oper_act_item;
            ViewMgr.getIns().lastData = [actInfo];
            this._firstEnter = false;
        }
    }

}