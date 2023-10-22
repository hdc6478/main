namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import LingmaiConfig = game.config.LingmaiConfig;
    import lingmai_data = msg.lingmai_data;
    import BuffConfig = game.config.BuffConfig;

    export class LingmaiDetailMdr extends MdrBase {
        private _view: LingmaiDetailView= this.mark("_view", LingmaiDetailView);
        private _proxy: XianluProxy;

        private _itemList: ArrayCollection;
        private _limitList: ArrayCollection;
        public _showArgs: LingmaiConfig;
        private _info: lingmai_data;
        private _isAct: boolean;
        private _isActLast: boolean;
        private _cost: number[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }


        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = LingmaiBreakItemRender;
            this._view.list_item.dataProvider = this._itemList;

            this._limitList = new ArrayCollection();
            this._view.list_limit.itemRenderer = CommonLimitItemRender;
            this._view.list_limit.dataProvider = this._limitList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateItemList, this);
            this.onNt(XianluEvent.LINGMAI_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.updateInfo();
        }

        protected onHide(): void {
            this._isAct = this._isActLast = false;
            super.onHide();
        }

        private onClickUp(): void {
            //激活
            let cfg = this._showArgs;
            if(this._isAct){
                ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.LingmaiUp, cfg);
                return;
            }
            let infos = cfg.activate_condition;
            for(let info of infos){
                if(!RoleUtil.isLimitOpen(info)){
                    PromptBox.getIns().show(getLanById(LanDef.lingmai_act_tips2));
                    return;
                }
            }
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            this._proxy.c2s_lingmai_levelup(cfg.index);
        }

        private onInfoUpdate(): void {
            if(!this._isActLast){
                let cfg = this._showArgs;
                ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.LingmaiUp, cfg);
            }
            this.updateInfo();
            this._isActLast = this._isAct;
        }

        private updateInfo(): void {
            this._info = this._proxy.getLingmaiInfo(this._showArgs.index);
            this.updatePower();
            this.updateItemList();
            this.updateLimitList();
        }

        private updateView(): void {
            let cfg = this._showArgs;
            let type = cfg.index % 10;
            this._view.img_name.source = "lingmai_name" + type;
            this._view.lab_desc.text = getLanById("lingmai_tips" + type);
        }

        private updatePower(): void {
            let power = this._proxy.getLingmaiPerPower(this._info);
            this._view.power.setPowerValue(power);
        }

        private updateItemList(): void {
            let cfg = this._showArgs;
            let infos = cfg.break_property;
            let indexList: number[] = [];
            for(let i of infos){
                let attrIndex = i[1];//重数_属性ID_BUFFID
                if(attrIndex){
                    indexList.push(attrIndex);
                }
            }
            let attrList = RoleUtil.getAttrList(indexList);//返回所有属性
            let items: {desc: string, isAct: boolean}[] = [];//属性或者buff描述，是否激活
            for(let i of infos){
                let lv = i[0];//重数_属性ID_BUFFID
                let attrIndex = i[1];
                let buffIndex = i[2];
                let desc = "[" + StringUtil.ChineseNum[lv] + getLanById(LanDef.lingmai_act_tips) + "]";
                let isAct = this._info && this._info.splv >= lv;//已激活的重数
                if(attrIndex){
                    let attrPos = indexList.indexOf(attrIndex);
                    let attr = attrList[attrPos];
                    let attrText = TextUtil.getAttrText(attr, WhiteColor.GREEN, " ");
                    if(attrText == ""){
                        continue;
                    }
                    desc += attrText;
                }
                if(buffIndex){
                    let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffIndex);
                    desc += cfg.des;
                }
                items.push({desc: desc, isAct: isAct});
            }
            if(this._itemList.source.length > 0){
                this._itemList.replaceAll(items);
            }
            else{
                this._itemList.source = items;
            }
        }

        private updateLimitList(): void {
            let cfg = this._showArgs;
            //this._isAct = this._info && this._info.splv > 0;//已激活
            this._isAct = !!this._info;//取得到信息表示已激活
            this._view.currentState = this._isAct ? "isAct" : "default";
            if(this._isAct){
                //已激活
                this._view.lab_lv.text = getLanById(LanDef.tishi_38) + "：" + StringUtil.ChineseNum[this._info.splv] + getLanById(LanDef.chong) +
                this._info.lv + "/" + LingmaiMaxLv;
                this._view.btn_up.labelDisplay.text = getLanById(LanDef.xiulian_tips);
            }
            else {
                //未激活
                let infos = this._showArgs.activate_condition;
                if(this._limitList.source.length > 0){
                    this._limitList.replaceAll(infos);
                }
                else{
                    this._limitList.source = infos;
                }
                this._cost = this._showArgs.break_item[0];
                this._view.cost.updateShow(this._cost);
                this._view.btn_up.labelDisplay.text = getLanById(LanDef.active);
            }
            this._view.btn_up.redPoint.visible = this._proxy.canLingmaiUp(cfg);
        }

    }
}