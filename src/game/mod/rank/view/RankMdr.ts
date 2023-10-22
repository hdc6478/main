namespace game.mod.rank {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class RankMdr extends EffectMdrBase {
        private _view: RankView = this.mark("_view",RankView);

        private _itemList: ArrayCollection;
        protected _showArgs: number[];
        private _rankType: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_god, TouchEvent.TOUCH_TAP, this.onClickGod);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.btn_god.visible = true;
            this._rankType = this._showArgs[0];
            this.updateShow();
            this.updateHint();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGod(): void {
            ViewMgr.getIns().showSecondPop(ModName.Rank, RankViewType.RankGod, this._rankType);
        }

        private updateShow(): void {
            let rankInfo = RankUtil.getRankInfo(this._rankType);
            let topInfo = rankInfo ? rankInfo.top_info : null;
            if(topInfo) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            rankStr += rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= MAX_RANK_NUM ? rankInfo.my_info.rank_no : MAX_RANK_NUM + "+";//20+
            this._view.lab_rank.text = rankStr;

            let count = rankInfo && rankInfo.my_info && rankInfo.my_info.count ? rankInfo.my_info.count : 0;
            this._view.lab_num.text = getLanById(LanDef.cycle_tower1) + "：" + count;//通关层数：0

            let infos = rankInfo && rankInfo.info_list ? rankInfo.info_list : [];
            this._itemList.source = infos;
        }

        /** 通用红点事件监听 */
        private onHintUpdate(n: GameNT): void {
            let data: IHintData = n.body;
            if(!this._rankType){
                return;
            }
            let hintType = RankUtil.getHintTypes(this._rankType);
            if (data.node == HintMgr.getType(hintType)) {
                this.setHint(data.value);
            }
        }

        /** 更新红点 */
        private updateHint() {
            let hintType = RankUtil.getHintTypes(this._rankType);
            this.setHint(HintMgr.getHint(hintType));
        }

        /** 设置红点 */
        public setHint(val:boolean): void {
            this._view.btn_god.redPoint.visible = val;
        }
    }
}