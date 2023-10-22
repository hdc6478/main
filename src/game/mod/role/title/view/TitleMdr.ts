namespace game.mod.role {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import title_info = msg.title_info;
    import TitleConfig = game.config.TitleConfig;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;

    export class TitleMdr extends MdrBase implements UpdateItem {
        private _view: TitleView = this.mark("_view", TitleView);
        private _proxy: TitleProxy;
        private _listData: eui.ArrayCollection;
        /**类型，1成就，2排行，3特殊*/
        protected _type: number = 1;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Title);
            this._view.list.itemRenderer = TitleItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(TitleEvent.TITLE_INFO_UPDATE, this.updateView, this);
            this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateList, this);
        }

        protected onShow(): void {
            super.onShow();
            (this._view.list.parent as eui.Scroller).stopAnimation();
            this._view.list.scrollV = 0;

            //有未请求的属性，请求了再更新
            if (this._proxy.haveNotReqAttr(this._type)) {
                let idList = this._proxy.getAttrIdList(this._type);
                if (idList && idList.length) {
                    RoleUtil.getAttrList(idList);
                }
            } else {
                this.updateList();
            }

            if (this._proxy.haveDelTime(this._type)) {
                TimeMgr.addUpdateItem(this, 1000);
            }
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private updateList(): void {
            this._listData.replaceAll(this._proxy.getSortedTitleListByType(this._type));
        }

        private updateView(n: GameNT): void {
            let data = n.body;
            if (!data) {
                return;
            }
            let [preUsing, curUsing, info] = data;
            let source: TitleConfig[] = this._listData.source || [];
            let size = source.length;

            //上一次幻化的 || 当前幻化的
            let itemUpdatedCnt = 0;
            if (preUsing || curUsing) {
                for (let i = 0; i < size; i++) {
                    if (!source[i]) {
                        continue;
                    }
                    if ((preUsing && source[i].index == preUsing)
                        || (curUsing && source[i].index == curUsing)) {
                        this._listData.itemUpdated(source[i]);
                        itemUpdatedCnt++;
                    }
                    if (itemUpdatedCnt >= 2) {
                        break;
                    }
                }
            }

            if (curUsing) {
                PromptBox.getIns().show(getLanById(LanDef.huanhua_chenggong));
            }

            //激活或者升星刷新某项
            if (info && info instanceof title_info) {
                for (let i = 0; i < size; i++) {
                    if (source[i] && source[i].index == info.index.toNumber()) {
                        this._listData.replaceItemAt(source[i], i);
                        break;
                    }
                }
                if (info.star == 1) {
                    PromptBox.getIns().show(getLanById(LanDef.jihuo_chenggong));
                }
            }
        }

        update(time: base.Time) {
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let cfg = this._listData.source[i] as TitleConfig;
                if (!cfg) {
                    continue;
                }
                let info = this._proxy.getTitleInfoByIdx(cfg.index);
                if (!info || !info.del_time) {
                    continue;
                }
                let item = this._view.list.getChildAt(i) as TitleItem;
                if (item) {
                    item.updateTime();
                }
            }
        }
    }

    export class TitleMdr2 extends TitleMdr {
        protected _type: number = 2;
    }

    export class TitleMdr3 extends TitleMdr {
        protected _type: number = 3;
    }
}