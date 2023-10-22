namespace game.mod.yishou {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;

    export class YishouShouguComposeMdr extends MdrBase {
        private _view: YishouShouguComposeView = this.mark("_view", YishouShouguComposeView);
        private _proxy: YishouProxy;
        private _listBtn: eui.ArrayCollection;
        private _listType: eui.ArrayCollection;
        private _listItem: eui.ArrayCollection;

        private _selQualityIdx = 0;
        private _selPosIdx = 0;
        private _costAry: number[] = [];//消耗的装备id和数量
        private _selCnt = 1;//合成数量
        private _equipId: number;//合成装备id

        _showArgs: YishouType;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Yishou);

            this._view.list_name.itemRenderer = TabSecondItem;
            this._view.list_name.dataProvider = this._listBtn = new eui.ArrayCollection();
            this._view.list_type.itemRenderer = YishouShouguBagTabItem;
            this._view.list_type.dataProvider = this._listType = new eui.ArrayCollection();
            this._view.list_item.itemRenderer = BtnTabItem;
            this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();

            this._view.scr["$hasScissor"] = true;
            this._view.list_type.useVirtualLayout = false;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_sub, egret.TouchEvent.TOUCH_TAP, this.onClickSub, this);
            addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
            addEventListener(this._view.btn_compose, egret.TouchEvent.TOUCH_TAP, this.onClickCompose, this);
            addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickType);
            addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickItem);

            this.onNt(YishouEvent.ON_UPDATE_YISHOU_COMPOSE_SELECT, this.updateStarUpdate, this);
            // this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
            this.onNt(YishouEvent.ON_UPDATE_YISHOU_SYNTHESE_SUCCESS, this.onSyntheseSuccess, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this.updateListBtn();
            this.updateListType();
            this.updateListItem();

        }

        protected onHide(): void {
            super.onHide();
            this._selQualityIdx = 0;
            this._selPosIdx = 0;
            this._costAry = null;
            this._selCnt = 1;
            this._equipId = null;
            this._proxy.selComposeAry = [];
        }

        //底部按钮
        private updateListBtn(): void {
            let type = this._showArgs;
            let list: TabBaseItemData[] = [];
            list.push({
                icon: `yishou_second_tap${type}`,
                showHint: this._proxy.getComposeTypeHint(type)//一级红点
            });
            this._listBtn.replaceAll(list);
            this._view.list_name.selectedIndex = 0;
        }

        //左边类型
        private updateListType(): void {
            let type = this._showArgs;
            let cfgList = this._proxy.getComposeCfgs(type);
            let list: IYishouShouguBagTabItemData[] = [];
            let selQualityIdx: number; //选中的品质索引
            let selQuality: number;//选中的品质
            let selStar: number;//选中的星级

            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                let showHint = this._proxy.getComposeQualityHint(type, cfg.quality);//二级红点
                let isSel = false;
                if (this._selQualityIdx != -1) {
                    if (showHint && selQualityIdx == undefined) {
                        selQualityIdx = i;//选中红点的
                        isSel = selQualityIdx != undefined && i == selQualityIdx;
                        if (isSel) {
                            selQuality = cfg.quality;
                            selStar = this._proxy.getComposeQualityStar(type, cfg.quality);//对应有红点的星级
                        }
                    }
                }

                let itemData: IYishouShouguBagTabItemData = {
                    type, cfg, isSel, showHint
                };
                list.push(itemData);
            }

            // console.log(`yishou compose 1, selQualityIdx:${selQualityIdx}, selQuality:${selQuality},
            // selStar:${selStar}, this._selQualityIdx:${this._selQualityIdx}`);
            if (this._selQualityIdx != -1) {
                if (selQualityIdx != undefined) {
                    this._selQualityIdx = selQualityIdx;
                } else {
                    //没有红点时候，默认第一个或点击的
                    let itemData = list[this._selQualityIdx];
                    itemData.isSel = true;
                    selQuality = itemData.cfg.quality;
                    selStar = itemData.cfg.star[0];
                }
            }
            // console.log(`yishou compose 2, selQualityIdx:${selQualityIdx}, selQuality:${selQuality},
            // selStar:${selStar}, this._selQualityIdx:${this._selQualityIdx}`);

            this._listType.replaceAll(list);
            this._view.list_type.selectedIndex = this._selQualityIdx;

            if (this._selQualityIdx != -1) {
                this.updateSelAry(selQuality, selStar);
            }
        }

        //部位
        private updateListItem(): void {
            let type = this._showArgs;
            let posAry = YishouShouguPosAry;
            let list: BtnTabItemData[] = [];
            let selPosIdx: number;
            for (let i = 0; i < posAry.length; i++) {
                let pos = posAry[i];
                let hint = false;
                let selAry = this._proxy.selComposeAry;
                if (selAry[0] != null && selAry[1] != null) {
                    hint = this._proxy.getComposePosHint(type, selAry[0], selAry[1], pos);
                }
                if (hint && selPosIdx == undefined) {
                    selPosIdx = i;//选择有红点的部位
                }
                list.push({
                    name: this._proxy.getPosName(this._showArgs, pos),
                    showHint: hint //四级红点
                });
            }
            if (selPosIdx != undefined) {
                this._selPosIdx = selPosIdx;
            }
            this._listItem.replaceAll(list);
            this._view.list_item.selectedIndex = this._selPosIdx;
            this.updateSelAry(null, null, this._selPosIdx);
        }

        //更新选中的参数
        private updateSelAry(quality?: number, star?: number, pos?: YishouShouguPos): void {
            if (quality != null) {
                this._proxy.selComposeAry[0] = quality;
            }
            if (star != null) {
                this._proxy.selComposeAry[1] = star;
            }
            if (pos != null) {
                this._proxy.selComposeAry[2] = pos;
            }

            let ary = this._proxy.selComposeAry;
            if (ary[0] != null && ary[1] != null && ary[2] != null) {
                this.updateView();
            }
        }

        //更新道具
        private updateView(): void {
            let type = this._showArgs;

            let ary = this._proxy.selComposeAry;
            let quality = ary[0];
            let star = ary[1];
            let pos = ary[2];
            let equipId = this._proxy.getEquipIndex(type, quality, star, pos);
            if (!equipId) {
                DEBUG && console.log(`yishouCompose equip id: ${equipId}`);
                return;
            }
            let equipCfg = GameConfig.getEquipmentCfg(equipId);
            if (!equipCfg) {
                return;
            }

            //合成的装备
            this._view.icon_center.data = equipId;
            this._equipId = equipId;
            this._view.lb_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(equipCfg.name, ColorUtil.getColorByQuality1(equipCfg.quality)));
            //合成的来源
            let compose = equipCfg.compose;
            if (!compose) {
                return;
            }
            let costIdx = compose[0][0];//消耗index
            this._costAry = compose[0];
            let datas = this._proxy.getBagDatasByIndex(costIdx);
            for (let i = 0; i < YishouComposeIconCnt; i++) {
                // if (datas[i]) {
                //     datas[i].iconShowType = IconShowType.Reward;
                // }
                this._view[`icon${i}`].data = datas[i] || null;
            }

            let hint = false;
            if (ary[0] != null && ary[1] != null && ary[2] != null) {
                hint = this._proxy.getComposePosHint(type, ary[0], ary[1], ary[2]);
            }
            this._view.btn_compose.setHint(hint);

            this._selCnt = Math.max(Math.floor(datas.length / YishouComposeIconCnt), 1);
            this.updateCnt();
        }

        private onClickSub(): void {
            this._selCnt--;
            if (this._selCnt < 1) {
                this._selCnt = 1;
            }
            this.updateCnt();
        }

        private onClickAdd(): void {
            if (!this._costAry) {
                return;
            }
            let costIdx = this._costAry[0];
            let datas = this._proxy.getBagDatasByIndex(costIdx);
            let maxCnt = Math.max(Math.floor(datas.length / YishouComposeIconCnt), 1);
            this._selCnt++;
            if (this._selCnt > maxCnt) {
                this._selCnt = maxCnt;
            }
            this.updateCnt();
        }

        private onClickCompose(): void {
            if (!this._costAry) {
                return;
            }
            let bagDatas = this._proxy.getBagDatasByIndex(this._costAry[0]);
            if (bagDatas.length < YishouComposeIconCnt) {
                PromptBox.getIns().show(getLanById(LanDef.yishou_tips10));
                return;
            }
            this._proxy.c2s_yishou_equip_synthese(this._showArgs, this._equipId, this._selCnt);
        }

        private updateCnt(): void {
            this._view.lab_cnt.text = this._selCnt + '';
        }

        //点击左边类型列表
        private onClickType(e: eui.ItemTapEvent): void {
            if (this._proxy.selStar) {
                this._proxy.selStar = false;
                this._selPosIdx = 0;//重置为0
                this.updateListItem();
                return;
            }
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selQualityIdx) {
                this._view.list_type.selectedIndex = this._selQualityIdx = -1; //收起展开
                this.updateListType();
                return;
            }

            this._selQualityIdx = itemIdx;
            this.updateListType();
            this.updateListItem();
        }

        private onClickItem(e: eui.ItemTapEvent): void {
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selPosIdx) {
                return;
            }
            let pos = YishouShouguPosAry[itemIdx];
            this._selPosIdx = itemIdx;
            this.updateSelAry(null, null, pos);
        }

        //抛出星级
        private updateStarUpdate(n: GameNT): void {
            let star = n.body as number;
            this.updateSelAry(null, star, null);
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.Yishou) > -1) {
                this.updateListBtn();
                this.updateListType();
                this.updateListItem();
                this.updateSelAry();
            }
        }

        //合成返回
        private onSyntheseSuccess(n: GameNT): void {
            let type = n.body as number;
            if (type != this._showArgs) {
                return;
            }
            this.updateListBtn();
            this.updateListType();
            this.updateListItem();
            this.updateSelAry();
        }
    }
}