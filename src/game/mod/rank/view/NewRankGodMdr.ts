namespace game.mod.rank {

    import teammate = msg.teammate;
    import GameNT = base.GameNT;
    import Tween = base.Tween;

    export class NewRankGodMdr extends MdrBase {
        private _view: RankGodView = this.mark("_view", RankGodView);
        private _proxy: NewRankProxy;
        _showArgs: RankType;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.NewRank);
            this._view.touchEnabled = false;
            this._view.list_rank.itemRenderer = NewRankGodRender;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(RankEvent.ON_NEW_RANK_INFO_UPDATE, this.onUpdateView, this);
            this.onNt(RankEvent.ON_RANK_REWARD_UPDATE, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.c2s_rank_req_rank(this._showArgs, 2);
        }

        protected onHide(): void {
            super.onHide();
            Tween.remove(this._view.scroller);
        }

        private onUpdateView(n: GameNT): void {
            let type = n.body as number;
            if (type != this._showArgs) {
                return;
            }
            this.updateView();
        }

        private updateView(): void {
            let type = this._showArgs;
            let cfgList = this._proxy.getRewardCfgList(type);
            let list: RankGodRenderData[] = [];
            let hintIdx: number;
            for (let i = 0; i < cfgList.length; i++) {
                let cfg = cfgList[i];
                let status = this._proxy.getRankRewardStatus(type, cfg.index);
                if (status == RankRewardStatus.Finish && hintIdx == null) {
                    hintIdx = i;
                }
                let data: RankGodRenderData = {
                    rankType: this._showArgs,
                    cfg,
                    status,
                    rankInfo: this.getRecord(i)
                };
                list.push(data);
            }
            this._listData.replaceAll(list);

            if (hintIdx != null) {
                // egret.callLater(() => {
                //     ScrollUtil.scrollToV(this._view.scroller, hintIdx, 1);
                // }, this);
                this.moveScroller(hintIdx);
            }
        }

        private moveScroller(pos: number): void {
            let scroller = this._view.scroller;
            let viewport = scroller.viewport as eui.List;
            let childHeight = 346;
            let gap: number = (viewport.layout as eui.VerticalLayout).gap;
            // let childNum = this._listData.source.length;
            // let contentHeight = childNum * childHeight + (childNum - 1) * gap;
            let contentHeight = viewport.contentHeight;
            let scrollerHeight = scroller.height;
            let moveV = childHeight * pos + (pos - 1) * gap;
            moveV = Math.max(0, Math.min(moveV, contentHeight - scrollerHeight));
            viewport.scrollV = moveV;
        }

        private getRecord(idx: number): teammate {
            let info = this._proxy.getRankInfo(this._showArgs, 2);
            if (!info || !info.info_list || !info.info_list[idx]) {
                return null;
            }
            let data = info.info_list[idx];
            return data.base_info ? data.base_info : null;
        }
    }
}