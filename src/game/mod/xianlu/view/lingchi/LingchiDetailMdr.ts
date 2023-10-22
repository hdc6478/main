namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import lingpool_type_data = msg.lingpool_type_data;
    import ParamConfig = game.config.ParamConfig;
    import PoolConfig = game.config.PoolConfig;
    import PropConfig = game.config.PropConfig;
    import GridConfig = game.config.GridConfig;
    import ItemTapEvent = eui.ItemTapEvent;

    export class LingchiDetailMdr extends MdrBase {
        private _view: LingchiDetailView = this.mark("_view", LingchiDetailView);
        private _proxy: XianluProxy;

        private _itemList: ArrayCollection;

        public _showArgs: number;//灵池类型
        private _info: lingpool_type_data;
        private _cost1: number[];
        private _cost2: number[];
        private _imgIndex: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = LingchiShenlingItemRender;
            this._view.list_item.dataProvider = this._itemList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.img_icon1, TouchEvent.TOUCH_TAP, this.onClickImg);
            this.onNt(XianluEvent.LINGCHI_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.poolType = this._showArgs;
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
            this._imgIndex = null;
        }

        private onClickUp(): void {
            //升级
            if(!BagUtil.checkPropCntUp(this._cost1[0], this._cost1[1])){
                return;
            }
            if(!BagUtil.checkPropCntUp(this._cost2[0], this._cost2[1])){
                return;
            }
            this._proxy.c2s_lingpool_levelup(this._showArgs);
        }

        private onClickItem(e: ItemTapEvent) {
            let index: number = e.item;
            let isOpen = this._proxy.isPoolGridOpen(index);
            if(isOpen){
                let type = this._showArgs;
                ViewMgr.getIns().showSecondPop(ModName.Xianlu, XianluViewType.LingchiBattle, type);
            }
        }

        private onClickImg(): void {
            if (this._imgIndex) {
                ViewMgr.getIns().showPropTips(this._imgIndex);
            }
        }

        private onInfoUpdate(): void {
            this.updateView();
            this.updateItemList();
        }

        private updateView(): void {
            let type = this._showArgs;
            this._view.img_type.source = "lingchi_type" + type;
            this._info = this._proxy.getPoolInfo(type);
            let lv = this._info.level;
            this._view.lab_lv.text = lv + "";

            let descStr1 = getLanById(LanDef.chanchu_tips) + "：";
            this._view.lab_desc1.text = descStr1;

            let cfg: PoolConfig = this._proxy.getPoolCfg(type, lv);
            let cost1 = cfg.output[0];
            this._imgIndex = cost1[0];
            let propCfg: PropConfig = GameConfig.getPropConfigById(cost1[0]);
            this._view.img_icon1.source = propCfg.icon;

            let perGain = this._proxy.calcPoolPerGain(this._info);
            let pCfg2: ParamConfig = GameConfig.getParamConfigById("lingchi_once");
            let perTime = pCfg2.value;
            let hourGain = 3600 / perTime * perGain;//每小时产出
            let addNum = this._proxy.calcPoolAdd(this._info) / 100;
            let addStr1 = hourGain + "/" + getLanById(LanDef.zongmen_hour) + "（+ " + addNum + "%）";
            this._view.lab_add1.textFlow = TextUtil.parseHtml(TextUtil.addColor(addStr1, WhiteColor.GREEN));

            // let cfg: PoolConfig = this._proxy.getPoolCfg(type, lv);
            let propIndex = cfg.special_item[0][0];
            propCfg = GameConfig.getPropConfigById(propIndex);
            this._view.img_icon2.source = propCfg.icon;
            let shenlingAdd = this._proxy.calcShenlingAdd(this._info);//万分比
            let shenlingAddStr = shenlingAdd / 100;//比如32%
            //实际获取特殊道具的概率 = 基础概率_special_probability * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch ）向下取整
            let baseNum = Math.floor(cfg.special_probability * (1 + shenlingAdd / 10000) / 100);
            let addStr2 = TextUtil.addColor(propCfg.name, ColorUtil.getColorByQuality1(propCfg.quality)) + getLanById(LanDef.chanchu_tips) +
                getLanById(LanDef.gailv_tips) + "：" + TextUtil.addColor(baseNum + "%（+" + shenlingAddStr + "%）", WhiteColor.GREEN);
            this._view.lab_add2.textFlow = TextUtil.parseHtml(addStr2);

            let descStr2 = getLanById(LanDef.shenling_tips);
            this._view.lab_desc2.text = descStr2;

            let cost = cfg.upgrade;
            let isMax = !cost || !cost.length;
            if(!isMax){
                this._cost1 = cost[0];
                this._cost2 = cost[1];
                this._view.cost1.updateShow(this._cost1);
                this._view.cost2.updateShow(this._cost2);
            }
            this._view.currentState = isMax ? "max" : "default";
            this._view.btn_up.redPoint.visible = this._proxy.canPoolUp(this._info);
        }

        private updateItemList(): void {
            let cfg: GridConfig = getConfigByNameId(ConfigName.Grid, this._showArgs);
            let datas = cfg.grid_condition;
            if(this._itemList.source.length > 0){
                this._itemList.replaceAll(datas);
            }
            else{
                this._itemList.source = datas;
            }
        }

    }
}