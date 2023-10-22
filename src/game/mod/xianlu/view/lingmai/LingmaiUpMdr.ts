namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import LingmaiConfig = game.config.LingmaiConfig;
    import lingmai_data = msg.lingmai_data;
    import LingmaiLevelConfig = game.config.LingmaiLevelConfig;
    import BuffConfig = game.config.BuffConfig;

    export class LingmaiUpMdr extends EffectMdrBase {
        private _view: LingmaiUpView= this.mark("_view", LingmaiUpView);
        private _proxy: XianluProxy;

        public _showArgs: LingmaiConfig;
        private _info: lingmai_data;
        private _isBreak: boolean;
        private _cost: number[];
        private _itemList: LingmaiItemRender[];
        private _lineList: eui.Image[][];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }


        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
            this.onNt(XianluEvent.LINGMAI_INFO_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.onInfoUpdate();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickUp(): void {
            //升级
            if(!BagUtil.checkPropCntUp(this._cost[0], this._cost[1])){
                return;
            }
            let cfg = this._showArgs;
            this._proxy.c2s_lingmai_levelup(cfg.index);
        }

        private onInfoUpdate(): void {
            this._info = this._proxy.getLingmaiInfo(this._showArgs.index);
            this.updatePower();
            this.updateUp();
            this.updateItemList();
        }

        private updateView(): void {
            let type = this._showArgs.index % 10;
            this._view.img_name.source = "lingmai_name" + type;
            this._itemList = [];
            for(let i = 1; i <= LingmaiMaxLv; ++i){
                let item = this._view["item" + i];
                this._itemList.push(item);
            }
            this._lineList = [
                [this._view.img_line1],
                [this._view.img_line2],
                [this._view.img_line3],
                [this._view.img_line4],
                [this._view.img_line5],
                [this._view.img_line6],
                [this._view.img_line71, this._view.img_line72],
                [this._view.img_line8],
                [this._view.img_line9],
            ];
        }

        private updatePower(): void {
            let power = this._proxy.getLingmaiPerPower(this._info);
            this._view.power.setPowerValue(power);
        }

        private updateUp(): void {
            let splv = this._info.splv;//重数
            let lv = this._info.lv;//等级
            let fontStr = "d" + (splv == LingmaiMaxLv ? 0 : splv) + "c";
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_lv);

            let buffStr = "";
            let cfg = this._showArgs;
            let infos = cfg.break_property;
            for(let i of infos){
                let limitLv = i[0];//重数_属性ID_BUFFID
                let attrIndex = i[1];
                let buffIndex = i[2];
                if(splv >= limitLv){
                    continue;
                }
                buffStr = "[" + StringUtil.ChineseNum[limitLv] + getLanById(LanDef.lingmai_act_tips) + "]";
                if(attrIndex){
                    let attr = RoleUtil.getAttr(attrIndex);
                    buffStr += TextUtil.getAttrText(attr);
                }
                if(buffIndex){
                    let cfg: BuffConfig = getConfigByNameId(ConfigName.Buff, buffIndex);
                    buffStr += cfg.des;
                }
                break;
            }
            this._view.lab_buff.textFlow = TextUtil.parseHtml(TextUtil.addColor(buffStr,  WhiteColor.RED));

            this._view.list_attr.updateAttr(this._info.attr);

            let isMax = this._proxy.isLingmaiMax(this._info);

            if(!isMax){
                this._isBreak = this._info.lv >= LingmaiMaxLv;
                this._view.btn_up.labelDisplay.text = this._isBreak ? getLanById(LanDef.weapon_tips34) : getLanById(LanDef.xiulian_tips);
                this._view.btn_up.redPoint.visible = this._proxy.canLingmaiUp(cfg);
                if(this._isBreak){
                    this._cost = this._showArgs.break_item[splv];
                }
                else {
                    let cfgList: object = getConfigByNameId(ConfigName.LingmaiLevel, this._info.type);
                    let lvCfg: LingmaiLevelConfig = cfgList[splv];
                    this._cost = lvCfg.grade_item[lv];
                }
                this._view.cost.updateShow(this._cost);
            }
            this._view.currentState = isMax ? "max" : "default";
        }

        private updateItemList(): void {
            let lv = this._info.lv;//等级
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let curLv = i + 1;
                let isAct = lv >= curLv;
                item.data = {lv: curLv, isAct: isAct};
            }
            for(let i = 0; i < this._lineList.length; ++i){
                let imgList = this._lineList[i];
                let curLv = i + 2;
                let isAct = lv >= curLv;
                for(let img of imgList){
                    img.source = isAct ? "lanseliangxian" : "lanseliangxianhui";
                }
            }
        }
    }
}