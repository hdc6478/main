namespace game.mod.xianlu {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import RebirthConfig = game.config.RebirthConfig;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import GodpowerConfig = game.config.GodpowerConfig;

    export class XiuxianPreviewMdr extends EffectMdrBase {
        private _view: XiuxianPreviewView = this.mark("_view", XiuxianPreviewView);
        private _proxy: XianluProxy;

        private _itemList1: ArrayCollection;
        private _itemList2: ArrayCollection;
        private _rewardList: ArrayCollection;
        private _nextIndex: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList1 = new ArrayCollection();
            this._view.list_item1.itemRenderer = XiuxianItemRender;
            this._view.list_item1.dataProvider = this._itemList1;

            this._itemList2 = new ArrayCollection();
            this._view.list_item2.itemRenderer = XiuxianItemRender;
            this._view.list_item2.dataProvider = this._itemList2;

            this._rewardList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardList;

            this._proxy = this.retProxy(ProxyType.Xianlu);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
            addEventListener(this._view.btn_vip, TouchEvent.TOUCH_TAP, this.onClickVip);
            this.onNt(XianluEvent.XIUXIAN_INFO_UPDATE, this.updateReward, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.updateReward();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickVip(): void {
            ViewMgr.getIns().openVipView();
        }

        private onClickDraw(): void {
            //领取奖励
            this._proxy.c2s_xianlu_reinc_getreward();
        }

        private updateView(): void {
            let index = this._proxy.model.index;
            if(!index){
                return;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            if(!cfg){
                return;
            }

            let fontStr = ResUtil.getRebirthFontStr(index, true);
            this.addBmpFont(fontStr, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_lv, true, 1, true);

            let itemData1 = cfg.open_show2.split("#N");
            this._itemList1.source = itemData1;

            let curLv = this._proxy.model.xianpolevel;
            this._view.item1.setData(curLv);

            let nextCfg = this._proxy.getNextCfg();
            this._nextIndex = nextCfg ? nextCfg.index : 0;
            if(!this._nextIndex){
                this._view.currentState = "max";
                return;
            }

            let nextFontStr = ResUtil.getRebirthFontStr(this._nextIndex, true);
            this.addBmpFont(nextFontStr, BmpTextCfg[BmpTextType.RebirthLv], this._view.grp_nextLv, true, 1, true);

            let itemData2 = nextCfg.open_show2.split("#N");
            this._itemList2.source = itemData2;

            let nextLv = curLv;
            let godpowerCfg: GodpowerConfig = getConfigByNameId(ConfigName.Godpower, curLv + 1);
            if(godpowerCfg && godpowerCfg.advance_limit <= this._nextIndex){
                /**下一转升级仙魄*/
                nextLv++;
            }
            this._view.item2.setData(nextLv);
        }

        private updateReward(): void {
            let index = this._proxy.model.rewardindex;
            let status = this._proxy.model.rewardstatus;
            if(!index || (index && status == TaskStatus.Draw && this._nextIndex)){
                index = this._nextIndex;//服务端未记录下一转的奖励
                status = TaskStatus.NotFinish;
            }
            let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, index);
            if(!cfg){
                return;
            }

            this._view.lab_reward.text = RoleUtil.getRebirthLvStr(index) + getLanById(LanDef.award);

            let reward = cfg.advance_reward;
            this._rewardList.source = reward;

            let hasDraw = status == TaskStatus.Draw;
            this._view.img_draw.visible = hasDraw;
            this._view.btn_draw.visible = !hasDraw;
            if(this._view.btn_draw.visible){
                let canDraw = status == TaskStatus.Finish;
                this._view.btn_draw.redPoint.visible = canDraw;
                this._view.btn_draw.labelDisplay.text = getLanById(LanDef.tishi_29);
                if(canDraw){
                    this._view.btn_draw.setYellow();
                }
                else {
                    this._view.btn_draw.setDisabled();
                }
            }
        }


    }
}