namespace game.mod.more {

    import zhandui_jitan_struct = msg.zhandui_jitan_struct;

    export class XujieJitanIconItem extends BaseListenerRenderer {
        public grp_tips: eui.Group;
        public grp_name: eui.Group;
        public lab_name: eui.Label;
        public redPoint: eui.Image;
        public img_icon: eui.Image;

        data: IXujieJitanIconItemData;
        private _proxy: XujieJitanProxy;

        constructor() {
            super();
            this.skinName = `skins.more.XujieJitanIconItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.More, ProxyType.XujieJitan);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            this.redPoint.visible = !!data.showHint;

            if (!data || !data.info) {
                this.grp_name.visible = this.grp_tips.visible = false;
                this.img_icon.source = `jiatubiao1`;
                return;
            }

            this.grp_name.visible = true;
            this.grp_tips.visible = data.status == 2;

            let index = data.info.idx.toNumber();
            // data.status == 3 ? PropIndex.XujieNengliangshi : data.info.idx.toNumber();
            let cfg = getConfigById(index);
            if (!cfg) {
                return;
            }
            this.lab_name.textFlow = TextUtil.parseHtml(TextUtil.addColor(cfg.name, ColorUtil.getColorByQuality1(cfg.quality)));
            let propData = PropData.create(data.info.idx);
            if (propData && propData.cfg) {
                this.img_icon.source = propData.cfg.icon;
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            //显示+号，获取道具弹窗或者放入道具弹窗
            if (!data.info) {
                if (!data.showHint) {
                    ViewMgr.getIns().showGainWaysTips(this._proxy.getGainId());
                } else {
                    ViewMgr.getIns().showSecondPop(ModName.More, MoreViewType.XujieJitanShelf);
                }
                return;
            }
            if (data.status == 1) {
                //回收
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper201, null, null, null, null, data.idx);
            } else if (data.status == 2) {
                //道具tips
                ViewMgr.getIns().showPropTips(data.info.idx.toNumber());
            } else if (data.status == 3) {
                //获取奖励
                this._proxy.sendJitanButtonClick(ZhanduiOperType.Oper203, null, null, null, 1, data.idx);
            }
        }
    }

    export interface IXujieJitanIconItemData {
        info: zhandui_jitan_struct;
        showHint: boolean;
        status: number; //0空（info为null），1排队，2正在供奉，3可领取奖励
        idx: number;//序号，从1开始
    }
}