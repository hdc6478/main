namespace game.mod {

    import TextEvent = egret.TextEvent;
    import Event = egret.Event;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import GameNT = base.GameNT;
    /**
     * 榜首大神组件
     */
    export class RankFirstItem extends eui.Component {

        public lab_rank: eui.Label;
        public lab_more: eui.Label;
        public redPoint: eui.Image;

        private _rankType: number;//排行榜类型

        constructor() {
            super();
            this.skinName = "skins.common.RankFirstItemSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.lab_more.addEventListener(TextEvent.LINK, this.onClickMore, this);
            this.lab_more.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.cycle_tower3), BlackColor.GREEN, ""));
            facade.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
        }

        private onRemove() {
            this.lab_more.removeEventListener(TextEvent.LINK, this.onClickMore, this);
            facade.offNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this)
        }

        protected onClickMore(): void {
            ViewMgr.getIns().showRank(this._rankType);
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
            this.redPoint.visible = val;
        }

        /**
         * @param rankType 排行榜类型
         * @param nameStr 第一名玩家
         * @param cntStr 层数文本
         */
        public updateShow(rankType: number, nameStr?: string, cntStr?: string): void{
            this._rankType = rankType;
            let str = nameStr ? nameStr + "\n" + cntStr : getLanById(LanDef.tishi_2);
            this.lab_rank.text = str;
            this.updateHint();
        }
    }
}