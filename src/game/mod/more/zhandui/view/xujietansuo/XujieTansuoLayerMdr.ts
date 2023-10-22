namespace game.mod.more {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import facade = base.facade;

    export class XujieTansuoLayerMdr extends EffectMdrBase implements UpdateItem {
        private _view: XujieTansuoLayerView = this.mark("_view", XujieTansuoLayerView);
        private _proxy: XujieTansuoProxy;
        private _type = 1;//区域
        private _curLayer = 1;//层数
        private _listLayer: eui.ArrayCollection;
        private _scrollerH = 0;
        private _viewportH = 0;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XujieTansuo);
            this._view.list_layer.itemRenderer = XujieTansuoLayerItem;
            this._view.list_layer.dataProvider = this._listLayer = new eui.ArrayCollection();

            this._scrollerH = this._view.scroller.height;
            this._viewportH = this._view.gridView.height;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_showlayer, egret.TouchEvent.TOUCH_TAP, this.onClickLayer, this);
            addEventListener(this._view.btn_zhanlipin, egret.TouchEvent.TOUCH_TAP, this.onClickZhanlipin, this);
            addEventListener(this._view.btn_zhenrong, egret.TouchEvent.TOUCH_TAP, this.onClickZhenrong, this);
            addEventListener(this._view.btn_yuanzheng, egret.TouchEvent.TOUCH_TAP, this.onClickYuanzheng, this);
            addEventListener(this._view.list_layer, eui.ItemTapEvent.ITEM_TAP, this.onClickListLayer, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_BASE_INFO, this.onUpdateView, this);
            this.onNt(MoreEvent.ON_GOTO_XUJIETANSUO_NEXT_LAYER, this.onGotoNextLayer, this);
            this.onNt(MoreEvent.ON_UPDATE_XUJIETANSUO_RECORDS_INFO, this.onUpdateZhanlipin, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateByPropIndex, this);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.onUpdateZhenrong, this);
        }

        protected onShow(): void {
            super.onShow();
            this._type = this._showArgs && this._showArgs[0] || 1;
            if (!this._type) {
                return;
            }

            this.resetScroller();

            let layer = 1;
            if (this._type == this._proxy.now_type) {
                layer = this._proxy.now_layer;//当前区域的当前层数
            } else if (this._proxy.canGotoMaxLayer(this._type)) {
                layer = this._proxy.getMaxLayerByType(this._type);//进入最高层
            }
            this._curLayer = layer;

            this._proxy.c2s_zhandui_xujietansuo_quyu_info(this._type, layer);
            this.onUpdateZhanlipin();
            this.onUpdateZhenrong();
        }

        private resetScroller(): void {
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = this._viewportH - this._scrollerH;
        }

        protected onHide(): void {
            super.onHide();
            this._curLayer = 1;
            this._type = 1;
            this._view.gr_layer.visible = false;
            this._view.btn_showlayer.scaleY = 1;
        }

        private onUpdateView(): void {

            this.updateView();
        }

        private updateView(): void {
            let str = StringUtil.substitute(getLanById(LanDef.xujietansuo_tips14), [this._curLayer]);
            this.addBmpFont(str, BmpTextCfg[BmpTextType.XujietansuoLayer], this._view.gr_layerfont, true, 1, true);

            this.updateCost();

            let progress = this._proxy.getProgressByLayer(this._type, this._curLayer);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(getLanById(LanDef.xujietansuo_tips13) + ' ' + TextUtil.addColor(progress + '%', WhiteColor.GREEN));

            //全部格子
            this._view.gridView.updateView(this._type, this._curLayer);

            //远征格子
            let expeditionInfo = this._proxy.getExpeditionGridInfo();
            if (expeditionInfo) {
                this._view.btn_yuanzheng.visible = true;
                this._view.btn_yuanzheng.setHint(this._proxy.getExpeditionHint());
                let endTime = expeditionInfo.endtime ? expeditionInfo.endtime.toNumber() : 0;

                if (endTime && endTime > TimeMgr.time.serverTimeSecond) {
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                    this._view.timeItem.visible = true;
                } else {
                    TimeMgr.removeUpdateItem(this);
                    this._view.timeItem.visible = false;
                }
            } else {
                this._view.btn_yuanzheng.visible = this._view.timeItem.visible = false;
                TimeMgr.removeUpdateItem(this);
            }
        }

        private updateCost(): void {
            let cnt = BagUtil.getPropCntByIdx(PropIndex.XujieTansuoling);
            this._view.costIcon.updateShow([PropIndex.XujieTansuoling, 1]);
            this._view.costIcon.setLabCost(cnt + '');
        }

        private onClickLayer(): void {
            let isShow = this._view.gr_layer.visible;
            this._view.btn_showlayer.scaleY = isShow ? -1 : 1;
            this._view.gr_layer.visible = !isShow;

            if (this._view.gr_layer.visible) {
                let layerCnt = this._proxy.getMaxLayerByType(this._type);
                let list: number[] = [];
                for (let i = 1; i <= layerCnt; i++) {
                    list.push(i);
                }
                this._listLayer.replaceAll(list);
                this._view.list_layer.selectedIndex = this._curLayer - 1 || 0;
            }
        }

        private onClickZhanlipin(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieTansuoZhanlipin);
        }

        private onClickZhenrong(): void {
            ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.Zhenrong);
        }

        //todo
        private onClickYuanzheng(): void {
            let data = this._proxy.getExpeditionGridItemData();
            facade.showView(ModName.More, MoreViewType.XujieTansuoExpeditionGrid, data);
        }

        private onClickListLayer(e: eui.ItemTapEvent): void {
            let layer = e.item as number;
            if (layer == this._curLayer) {
                return;
            }
            //某层未开启
            if (!this._proxy.isActedByLayer(this._type, layer, true)) {
                this._view.list_layer.selectedIndex = this._curLayer - 1;
                return;
            }
            this._curLayer = layer;
            this.resetScroller();
            this.onClickLayer();
            this._proxy.c2s_zhandui_xujietansuo_quyu_info(this._type, this._curLayer);
        }

        //通过传送进入下一层
        private onGotoNextLayer(n: GameNT): void {
            this._curLayer = n.body as number;
            this.resetScroller();
            this._proxy.c2s_zhandui_xujietansuo_quyu_info(this._type, this._curLayer);
        }

        update(time: base.Time) {
            let info = this._proxy.getExpeditionGridInfo();
            let endTime = info && info.endtime ? info.endtime.toNumber() : 0;
            let leftTime = endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                this.updateView();//todo 刷新
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
            this._view.gridView.updateTime();//远征格子倒计时
        }

        //战利品按钮红点
        private onUpdateZhanlipin(): void {
            let hint = this._proxy.getZhanlipinHint();
            this._view.btn_zhanlipin.setHint(hint);
        }

        //阵容红点
        private onUpdateZhenrong(): void {
            this._view.btn_zhenrong.setHint(this._proxy.getZhenrongHint());
        }

        private onBagUpdateByPropIndex(n: GameNT): void {
            let indexs = n.body as number[];
            if (indexs.indexOf(PropIndex.XujieTansuoling) > -1) {
                this.updateCost();
            }
        }
    }
}