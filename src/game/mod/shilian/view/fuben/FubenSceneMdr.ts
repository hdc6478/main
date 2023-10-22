namespace game.mod.shilian {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import MaterialFubenConfig = game.config.MaterialFubenConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import ArrayCollection = eui.ArrayCollection;

    export class FubenSceneMdr extends EffectMdrBase implements UpdateItem {
        private _view: FubenSceneView = this.mark("_view", FubenSceneView);
        private _proxy: ShilianProxy;
        private _lastLv: number = 0;
        private _leftTime: number = 300;//剩余时间
        private _curLv: number;
        private _timeOut: number = 0;
        private _timeOutLv: number = 0;
        private _selCfg: MaterialFubenConfig;/**当前选中的副本配置*/
        private _showJump: boolean;
        private readonly LAYER_NUM: number = 30;//大于等于30层时不做层级滚动表现
        private _itemList1: ArrayCollection;
        private _itemList2: ArrayCollection;

        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            super.onInit()
            this._view.percentHeight = 100;
            this._view.percentWidth = 100;
            this._view.touchEnabled = false;

            this._itemList1 = new ArrayCollection();
            this._view.list_layer1.itemRenderer = FubenLayerItem1;
            this._view.list_layer1.dataProvider = this._itemList1;

            this._itemList2 = new ArrayCollection();
            this._view.list_layer2.itemRenderer = FubenLayerItem2;
            this._view.list_layer2.dataProvider = this._itemList2;

            this._proxy = this.retProxy(ProxyType.Shilian);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
            this.onNt(ShilianEvent.ON_FUBEN_SCENE_UPDATE, this.onSceneUpdate, this);
            this.onNt(ShilianEvent.ON_FUBEN_SKIP_UPDATE, this.updateJump, this);
        }

        protected onShow(): void {
            super.onShow();

            this.setViewIndex();
            this._selCfg = getConfigByNameId(ConfigName.MaterialFuben, this._proxy.type);
            this.updateJump();
            this.updateShow();
            this.updateTime();
            this.updateGiftTips();
        }

        protected onHide(): void {
            this._lastLv = 0;
            this._curLv = 0;
            this._showJump = false;
            this._leftTime = 300;
            this._proxy.resetLvInfo();
            TimeMgr.removeUpdateItem(this);
            if (this._timeOut) {
                clearDelay(this._timeOut);
                this._timeOut = 0;
            }
            this.clearTimeOutLv();
            if(this._view.scr1){
                Tween.remove(this._view.scr1.viewport);
            }
            if(this._view.scr2){
                Tween.remove(this._view.scr2.viewport);
            }
            Tween.remove(this._view.grp_lv0);
            this.removeTipsTween();
            super.onHide();
        }

        private clearTimeOutLv(): void {
            if (this._timeOutLv) {
                clearDelay(this._timeOutLv);
                this._timeOutLv = 0;
            }
        }

        private onSceneUpdate(): void {
            this.updateShow();
            if(this._proxy.lv == this._proxy.endLv + 1){
                this.updateTips();
            }
        }

        private onClickGift(): void {
            if(!this._selCfg){
                return;
            }
            this.setGiftTips(false);
            ViewMgr.getIns().showGift(this._selCfg.buyId);
        }

        private updateShow(): void {
            let lv = this._proxy.lv;
            if(!lv){
                return;
            }
            if(this._lastLv != lv){
                this._leftTime = this._selCfg.time;//重置时间
                TimeMgr.addUpdateItem(this, 1000);

                //显示第几层
                if(!this._showJump){
                    ViewMgr.getIns().showChallengeTips(lv);
                }
                this._lastLv = lv;
            }
            
            let lvStr = getLanById(LanDef.cycle_tower1) + "：" + TextUtil.addColor((lv - 1) + "", BlackColor.GREEN);
            //let lvStr = getLanById(LanDef.cycle_tower1) + "：" + TextUtil.addColor(lv + "", BlackColor.GREEN);
            this._view.lab_cur.textFlow = TextUtil.parseHtml(lvStr);

            let cnt = this._proxy.totalCount;
            let index = this._proxy.getPropIndex(this._proxy.type);
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            let cntStr = getLanById(LanDef.leiji) + cfg.name + "：" + TextUtil.addColor(StringUtil.getHurtNumStr(cnt) + "", BlackColor.GREEN);
            this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);

            this._view.lab_name.text = this._selCfg.name;
        }

        update(time: base.Time): void {
            this.updateTime();
            if(this._leftTime > 0){
                this._leftTime--;
            }
            else {
                SceneUtil.clickExit();
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateTime(): void {
            let timeStr = getLanById(LanDef.battle_cue40) + "：" + TextUtil.addColor(this._leftTime + "秒", BlackColor.GREEN)
            this._view.lab_time.textFlow = TextUtil.parseHtml(timeStr);
        }

        private updateJump(): void {
            if(this._proxy.stLv == this._proxy.endLv){
                this._view.grp_lv0.visible = false;
                this._view.grp_tips.visible = false;
                return;
            }
            this._showJump = true;
            this.updateTips();
            this._timeOut = delayCall(Handler.alloc(this, () => {
                this._timeOut = 0;
                //this._curLv = this._proxy.stLv;
                this._view.grp_lv0.visible = true;
                this._view.grp_tips.visible = true;
                this.showJumpTween();
            }), 1000);

        }

        private showJumpTween(): void {
            let maxLv = this._proxy.endLv + 1;
            if(maxLv >= this.LAYER_NUM){
                //不做表现
                this.showLv(maxLv);
            }
            else {
                //滚动动画
                this._view.grp_lv.visible = false;
                this._view.grp_lv_show.visible = true;

                let infos2: number[] = [];
                for(let i = 0; i <= maxLv; ++i){
                    let layer2 = i % 10;
                    infos2.push(layer2);
                }
                this._itemList2.source = infos2;
                let pos = maxLv + 1;
                let timeTick = Math.min(maxLv * 100, 1500);
                ScrollUtil.moveVToAssign(this._view.scr2, pos, 44, timeTick);
                this._timeOut = delayCall(Handler.alloc(this, () => {
                    this._timeOut = 0;
                    this.showLv(maxLv);
                }), timeTick);

                if(maxLv >= 10){
                    //显示两位数
                    let infos1: {layer?: number, isCur?: boolean}[] = [{layer: 0, isCur: false}];//先塞0进去
                    let layerNum = Math.floor(maxLv / 10);//向下取整
                    for(let i = 0; i <= layerNum; ++i){
                        infos1.push({layer: i, isCur: i == 0});
                    }
                    this._itemList1.source = infos1;
                    if(!this._view.scr1.parent){
                        this._view.grp_lv_show.addChildAt(this._view.scr1, 1);
                    }
                    let perTick = timeTick / maxLv;
                    let totalTick = perTick * 9;
                    for(let i = 1; i <= layerNum; ++i){
                        totalTick = totalTick * i;
                        let pos = i + 2;
                        delayCall(Handler.alloc(this, () => {
                            let list: {layer?: number, isCur?: boolean}[]  = this._itemList1.source;
                            let btnData = list[i + 1];
                            btnData.isCur = true;
                            this._itemList1.itemUpdated(btnData);
                            ScrollUtil.moveVToAssign(this._view.scr1, pos, 44, 200, undefined, true);
                            delayCall(Handler.alloc(this, () => {
                                let btnData2 = list[i];
                                btnData2.isCur = false;
                                this._itemList1.itemUpdated(btnData2);
                            }), 200);
                        }), totalTick);
                    }
                }
                else {
                    //显示一位数
                    if(this._view.scr1 && this._view.scr1.parent){
                        this._view.scr1.parent.removeChild(this._view.scr1);//移除十位数
                    }
                }
            }
        }

        private showLv(lv: number): void {
            this._view.grp_lv.visible = true;
            this._view.grp_lv_show.visible = false;
            let curStr = "第" + lv + "层";
            this.addBmpFont(curStr, BmpTextCfg[BmpTextType.Layer], this._view.grp_lv, true, 1, true);
            this._timeOut = delayCall(Handler.alloc(this, () => {
                this._timeOut = 0;
                this._view.grp_lv0.visible = false;
                this._view.grp_tips.visible = false;
                this._showJump = false;
            }), 1000);
        }

        private updateTips(): void {
            let cnt = this._proxy.totalCount;
            let layerStr = TextUtil.addColor(this._proxy.endLv + "", BlackColor.GREEN);
            let tipsStr = StringUtil.substitute(getLanById(LanDef.fuben_skip_tips), [layerStr]);
            let index = this._proxy.getPropIndex(this._proxy.type);
            let cfg: PropConfig = GameConfig.getPropConfigById(index);
            tipsStr += TextUtil.addColor(StringUtil.getHurtNumStr(cnt), BlackColor.GREEN) + cfg.name;
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tipsStr);
        }

        private updateGiftTips(): void {
            let productId = this._selCfg.buyId;
            let showGift = PayUtil.checkShowGift(productId);
            this._view.grp_gift.visible = showGift;
            if(showGift){
                let hasBuy = PayUtil.hasBuy(productId);
                this.setGiftTips(!hasBuy);

                let cfgList = PayUtil.getPrivilegeCfgList(productId);
                let cfg = cfgList[0] || null;
                let addVal = this._proxy.getPrivilegeAdd(cfg, this._selCfg.type);
                let addStr = getLanById(LanDef.shouyi_tips) + "+" + addVal + "%";
                this._view.lab_add.text = addStr;
            }
        }

        private setGiftTips(show: boolean): void {
            this._view.img_tips.visible = show;
            if(show){
                this._view.img_tips.x = -57;
                Tween.get(this._view.img_tips, {loop: true})
                    .to({x: -20}, 500)
                    .to({x: -57}, 500);
            }
            else {
                this.removeTipsTween();
            }
        }
        private removeTipsTween(): void {
            Tween.remove(this._view.img_tips);
        }
    }
}