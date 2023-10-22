namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import GameNT = base.GameNT;
    import RebirthConfig = game.config.RebirthConfig;
    import facade = base.facade;
    import ItemTapEvent = eui.ItemTapEvent;
    import ElixirInitConfig = game.config.ElixirInitConfig;
    import LanDef = game.localization.LanDef;
    import ElixirBuffConfig = game.config.ElixirBuffConfig;
    import BuffConfig = game.config.BuffConfig;
    import PropertyEvent = eui.PropertyEvent;
    import Tween = base.Tween;
    import Handler = base.Handler;

    export class XiandanMdr extends EffectMdrBase {
        private _view: XiandanView = this.mark("_view", XiandanView);
        private _proxy: XianluProxy;

        private _itemList: ArrayCollection;
        private _btnList: ArrayCollection;

        private _selType: number;/**当前选中的丹药类型*/
        private _selIndex: number;/**当前选中的丹药下标*/
        private _selCfg: ElixirInitConfig;/**当前选中的丹药配置*/
        private _posInfo1: number[];//x,y,index
        private _posInfo2: number[];//x,y,index
        private _isChanging: boolean;//是否正在切换

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = XiandanPillRender;
            this._view.list_item.dataProvider = this._itemList;

            this._btnList = new ArrayCollection();
            this._view.list_type.itemRenderer = TabSecondItem;
            this._view.list_type.dataProvider = this._btnList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_change, TouchEvent.TOUCH_TAP, this.onClickChange);
            addEventListener(this._view.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
            addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickUse);
            addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_last, TouchEvent.TOUCH_TAP, this.onScrollMove);
            addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onScrollMove);
            addEventListener(this._view.scr_item.viewport, PropertyEvent.PROPERTY_CHANGE, this.move);

            this.onNt(XianluEvent.XIANDAN_INFO_UPDATE, this.onInfoUpdate, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_TYPE, this.onBagUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initTypeList();
            this.typeUpdateInfo();
            this.initPosInfo();
        }

        protected onHide(): void {
            this.resetItemPos();
            Tween.remove(this._view.scr_item.viewport);
            super.onHide();
        }

        private onClickDesc(): void {
            facade.showView(ModName.Xianlu, XianluViewType.XiandanTips, this._selType)
        }

        private onClickUse(): void {
            if(!this._selCfg){
                return;
            }
            let propIndex = this._selCfg.itemid;
            if(!BagUtil.checkPropCntUp(propIndex)){
                return;
            }
            if(!this._proxy.canPillUse(this._selCfg)){
                PromptBox.getIns().show(this._view.lab_tips.text);
                return;
            }
            this._proxy.c2s_xian_dan_use_pill(this._selCfg.index);
        }

        private onClickType(e: ItemTapEvent) {
            let type = e.itemIndex + 1;
            if(type == this._selType){
                return;
            }
            this._selType = type;
            this._selIndex = 0;
            this.typeUpdateInfo();
            this.resetItemPos();
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if(index == this._selIndex){
                return;
            }
            this._selIndex = index;
            this.indexUpdateInfo();
        }

        private onInfoUpdate(): void {
            this.typeUpdateInfo();
        }

        /** 通用背包事件监听 */
        private onBagUpdate(n: GameNT): void {
            let types: number[] = n.body;
            if(types.indexOf(PropType.XianDan) < 0){
                return;
            }
            this.updateItemList();
            this.indexUpdateInfo();
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            let list: TabBaseItemData[]  = this._btnList.source;
            let len: number = list ? list.length : 0;
            for (let i = 0; i < len; i++) {
                let btnData = list[i];
                let hintType = this._proxy.model.pillHints[i];
                let type = HintMgr.getType(hintType);/**转化为红点类型*/
                if (type != data.node) {
                    continue;
                }
                if(!!btnData.showHint != data.value){//过滤undefined!=false
                    btnData.showHint = data.value;
                    this._btnList.itemUpdated(btnData);
                }
                break;/**找到对应红点后则break，减少循环*/
            }
        }

        private initTypeList(): void {
            let datas: TabBaseItemData[] = [];
            for(let i = 1; i <= PropSubType9.Xiandan; ++i){
                let icon = "danyao_icon" + i;
                let hintType = this._proxy.model.pillHints[i - 1];
                let hint = HintMgr.getHint(hintType);
                datas.push({icon: icon, showHint: hint});
            }
            this._btnList.source = datas;

            this._selType = PropSubType9.Danyao;
            this._view.list_type.selectedIndex = this._selType - 1;
            this._selIndex = 0;
        }

        private typeUpdateInfo(): void {
            this.updateItemList();
            this.updateDesc();
            this.updateBuff();
            this.indexUpdateInfo();
        }

        private updateItemList(): void {
            let items = this._proxy.getPillCfgList(this._selType);
            this._itemList.source = items;
            /**选中可使用的index*/
            for(let i = 0; i < items.length; ++i){
                let cfg = items[i];
                if(this._proxy.canPillUse(cfg)){
                    this._selIndex = i;
                    break;
                }
            }
            this._view.list_item.selectedIndex = this._selIndex;
        }

        private updateDesc(): void {
            this._view.img_type.source = "danyaoyaoling" + this._selType;
            let age = this._proxy.getPillAgeByType(this._selType);
            let fontStr = age >= 100000 ? Math.floor(age / 10000) + "wn" : age + "n";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.CommonPower], this._view.grp_lv);
        }

        public updateBuff(): void {
            let cfg: ElixirBuffConfig = getConfigByNameId(ConfigName.Elixir_buff, this._selType);
            let nextAgeDesc = "";//下一阶药龄提示
            let buffIndex = 0;
            let nextIndex = this._proxy.getNextAgeIndex(this._selType);
            if(nextIndex >= 0){
                //存在下一级buff
                let nextBuffIndex = cfg.buff_index[nextIndex];
                if(nextIndex == 0){
                    //未激活buff
                    this._view.item2.visible = this._view.btn_change.visible = false;
                    buffIndex = nextBuffIndex;//未激活buff时，取下一级buff
                }
                else {
                    //显示下一级buff
                    this._view.item2.visible = this._view.btn_change.visible = true;
                    let nextBuffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, nextBuffIndex);
                    this._view.item2.data = nextBuffCfg ? nextBuffCfg.des : "";

                    buffIndex = cfg.buff_index[nextIndex - 1];//当前buff
                }
                let nextAge = cfg.age[nextIndex];
                nextAgeDesc = StringUtil.substitute(getLanById(LanDef.xiandan_buff_tips), [nextAge])
            }
            else {
                //不存在下一级buff
                this._view.item2.visible = this._view.btn_change.visible = false;
                buffIndex = cfg.buff_index[cfg.buff_index.length - 1];
            }

            let buffCfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffIndex);
            let curDesc = buffCfg ? buffCfg.des : "";//当前buff描述c
            if(nextAgeDesc){
                curDesc += "\n" + TextUtil.addColor(nextAgeDesc, WhiteColor.RED);
            }
            this._view.item1.data = curDesc;
        }

        private indexUpdateInfo(): void {
            let items = this._proxy.getPillCfgList(this._selType);
            this._selCfg = items[this._selIndex];
            if(!this._selCfg){
                return;
            }
            this.updateCnt();
            this.updateAttr();
        }

        private updateCnt(): void {
            let propIndex = this._selCfg.itemid;
            this._view.icon.setData(propIndex);
            this._view.lab_name.textFlow = this._view.icon.getPropName();
            this._view.btn_use.redPoint.visible = this._proxy.canPillUse(this._selCfg);//可使用红点

            let tipsStr = "";
            let isOpen = this._proxy.isPillOpen(this._selCfg);
            if(isOpen){
                //可使用
                let useCnt = this._proxy.getPillUseCnt(this._selCfg.index);
                let maxUseCnt = this._proxy.getPillMaxUseCnt(this._selCfg);
                tipsStr = getLanById(LanDef.xiandan_tips2) + TextUtil.addColor("(" + useCnt + "/" + maxUseCnt + ")", WhiteColor.GREEN) + "颗";

                let nextCfg = this._proxy.getNextCfg();
                if(nextCfg){
                    let nextMaxCnt = this._proxy.getPillMaxUseCnt(this._selCfg, nextCfg.index);
                    tipsStr += "\n" + getLanById(LanDef.xiandan_tips3) + RoleUtil.getRebirthLvStr(nextCfg.index) + getLanById(LanDef.xiandan_tips11)
                        + TextUtil.addColor(nextMaxCnt + "", WhiteColor.GREEN) + getLanById(LanDef.xiandan_tips10);
                }
            }
            else {
                //修仙至XXX可服用
                let limitIndex = this._selCfg.eat_limit;
                let rebirthCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, limitIndex);
                tipsStr = getLanById(LanDef.xiandan_tips3) + rebirthCfg.name + getLanById(LanDef.xiandan_tips11);
            }
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        private updateAttr(): void {
            let attrStr = "";
            let useCnt = this._proxy.getPillUseCnt(this._selCfg.index);
            let attr = RoleUtil.getAttr(this._selCfg.ability_index);
            let totalAttr = TextUtil.calcAttr(attr, useCnt);
            let keys: string[] = TextUtil.getAttrOrderKeys(attr);
            for (let i = 0, len = keys.length; i < len; i++) {
                let k: string = keys[i];
                let a: string = TextUtil.getAttrsText(k);
                let v = TextUtil.getAttrsPerCent(k, attr[k]);
                let totalv = TextUtil.getAttrsPerCent(k, totalAttr[k]);
                attrStr += a + "：" + TextUtil.addColor(totalv + "（" + getLanById(LanDef.xiandan_tips6) + "+" + v + "）", WhiteColor.GREEN) + "\n";
            }
            let age = useCnt * this._selCfg.age;
            attrStr += TextUtil.addColor(getLanById(LanDef.xiandan_tips5) + "+" + age, WhiteColor.RED) + TextUtil.addColor("（" + getLanById(LanDef.xiandan_tips6) + "+" + this._selCfg.age + "）", WhiteColor.GREEN)
            this._view.lab_attr.textFlow = TextUtil.parseHtml(attrStr);
        }

        /** 滚动 */
        private onScrollMove(e: egret.TouchEvent) {
            ScrollUtil.moveH(this._view.scr_item, e.currentTarget == this._view.btn_last ? 1 : 2);
        }

        /** 滚动 */
        private move(e: eui.PropertyEvent) {
            if (e.property == "scrollH" || e.property == "contentWidth") {
                egret.callLater(this.refreshPos, this);
            }
        }

        /** 显示左右按钮 */
        private refreshPos() {
            ScrollUtil.changeBtnShow(this._view.scr_item, this._view.btn_last, this._view.btn_next, 94);
        }

        private initPosInfo(): void{
            let index1 = this._view.getChildIndex(this._view.item1);
            this._posInfo1 = [this._view.item1.x, this._view.item1.y, index1];
            let index2 = this._view.getChildIndex(this._view.item2);
            this._posInfo2 = [this._view.item2.x, this._view.item2.y, index2];
            this.resetItemPos();
        }

        private resetItemPos(): void {
            this._view.item1.x = this._posInfo1[0];
            this._view.item1.y = this._posInfo1[1];
            this._view.setChildIndex(this._view.item1, this._posInfo1[2]);
            this._view.item1.isUp = true;
            this._view.item2.x = this._posInfo2[0];
            this._view.item2.y = this._posInfo2[1];
            this._view.setChildIndex(this._view.item2, this._posInfo2[2]);
            this._view.item2.isUp = false;
            this._isChanging = false;
            Tween.remove(this._view.item1);
            Tween.remove(this._view.item2);
        }

        private onClickChange(): void {
            if(this._isChanging){
                return;
            }
            this._isChanging = true;
            let pos1 = [this._view.item1.x, this._view.item1.y];
            let pos2 = [this._view.item2.x, this._view.item2.y];
            Tween.get(this._view.item1).to({x: pos2[0], y: pos2[1]}, 200);
            Tween.get(this._view.item2).to({x: pos1[0], y: pos1[1]}, 200).exec(Handler.alloc(this, ()=> {
                let index1 = this._view.getChildIndex(this._view.item1);
                let index2 = this._view.getChildIndex(this._view.item2);
                this._view.setChildIndex(this._view.item1, index2);
                this._view.item1.isUp = !this._view.item1.isUp;
                this._view.setChildIndex(this._view.item2, index1);
                this._view.item2.isUp = !this._view.item2.isUp;
                this._isChanging = false;
            }));
        }
    }
}