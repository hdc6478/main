namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import ParamConfig = game.config.ParamConfig;
    import PropConfig = game.config.PropConfig;
    import LanDef = game.localization.LanDef;

    /**回收 */
    export class UnionRecycleMdr extends MdrBase {
        private _view: UnionRecycleView = this.mark("_view", UnionRecycleView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _idxs: Long[];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list_item.itemRenderer = UnionDonateEquipItem;
            this._view.list_item.dataProvider = this._listData;
            this._view.list_item.allowMultipleSelection = true;

            this._view.lab.text = getLanById(LanDef.xianzong_tips19);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.selectItem1.list, TouchEvent.TOUCH_TAP, this.onClickSelect1);
            addEventListener(this._view.selectItem1.gr_box, TouchEvent.TOUCH_TAP, this.onClickBox1);
            addEventListener(this._view.selectItem2.list, TouchEvent.TOUCH_TAP, this.onClickSelect2);
            addEventListener(this._view.selectItem2.gr_box, TouchEvent.TOUCH_TAP, this.onClickBox2);
            addEventListener(this._view.btn_recycle, TouchEvent.TOUCH_TAP, this.onClickRecycle);
            addEventListener(this._view.btn_select, TouchEvent.TOUCH_TAP, this.onClickOneSelect);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickSelectBox);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let strs: UnionSelectData[] = this._proxy.getEquipKeyValue1();
            this._view.selectItem1.setData(strs);

            this._view.selectItem2.setData([UnionSelectDefault]);

            let cfg: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
            let value: number = cfg.value[0];
            this._view.progress.show(this._proxy.guild_score, value);

            this._view.btn_recycle.visible = this._view.btn_select.visible = this._proxy.recycle_oper;
            this._view.lab.visible = !this._proxy.recycle_oper;

            this.onUpdateBox();
        }

        private onUpdateBox(): void {
            let key: string = this._view.selectItem1.getKey;
            let quality: string = this._view.selectItem2.getKey;
            let list: PropData[] = this._proxy.getEquioList(key, quality);
            this._listData.replaceAll(list);
            this._view.list_item.selectedIndices = [];
            if (!+key || !+quality) {
                let nums: number[] = list.map((v, i) => {
                    return i;
                });
                this._view.list_item.selectedIndices = nums;
            }

            this._view.scr.viewport.scrollV = 0;
            this.onUpdateScore();
        }

        private onUpdateScore(): void {
            let count: number = 0;
            this._idxs = [];
            for (let i of this._view.list_item.selectedIndices) {
                let prop: PropData = this._listData.source[i];
                if (prop) {
                    this._idxs.push(prop.prop_id);
                    count += prop.cfg.guild_donate[1];
                }
            }
            this._view.lab_tips.textFlow = TextUtil.parseHtml(`本次回收宝箱积分+${TextUtil.addColor(`${count}`, 0x309539)}`);

            // let cfg: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
            // let value: number = cfg.value[0];
            // this._view.progress.show(this._proxy.guild_score + count, value);
            this._view.progress.showPreview(this._proxy.guild_score + count);
        }

        private onClickSelect1(): void {
            this._view.selectItem1.setStatus();
            this._view.selectItem2.setData([UnionSelectDefault]);
            this.onUpdateBox();
        }

        private onClickBox1(): void {
            this._view.selectItem1.setStatus();
        }

        private onClickSelect2(): void {
            this._view.selectItem2.setStatus();
            this.onUpdateBox();
        }

        private onClickBox2(): void {
            let qualitys: UnionSelectData[] = this._proxy.getEquipKeyValue2(this._view.selectItem1.getKey);
            this._view.selectItem2.setData(qualitys);
            this._view.selectItem2.setStatus();
        }

        private onClickRecycle(): void {
            if (!this._proxy.recycle_oper) {
                PromptBox.getIns().show("只有宗主和副宗主才能回收");
                return;
            }
            if (this._idxs && this._idxs.length) {
                this._proxy.c2s_guild_ware_oper(2, this._idxs);
                this.hide();
            }
        }

        private onClickOneSelect(): void {
            let selects: number[] = [];
            for (let i in this._listData.source) {
                selects.push(+i);
            }
            this._view.list_item.selectedIndices = selects;

            this.onUpdateScore();
        }

        private onClickSelectBox(): void {
            this.onUpdateScore();
        }

        private onClickReward(): void {
            let param: ParamConfig = GameConfig.getParamConfigById("guild_jifen");
            let index: number = param.value[1];
            let prop: PropConfig = GameConfig.getPropConfigById(index);
            ViewMgr.getIns().showBoxReward("", prop.show_reward);
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}