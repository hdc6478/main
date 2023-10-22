namespace game.mod.rank {

    import rank_info = msg.rank_info;
    import LanDef = game.localization.LanDef;

    export class NewRankItem extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lb_rank: eui.Label;
        public head: game.mod.Head;
        public lb_name: eui.Label;
        public lb_power: eui.Label;
        public lb_notone: eui.Label;

        data: INewRankItemData;
        private _proxy: NewRankProxy;

        constructor() {
            super();
            this.skinName = `skins.rank.NewRankItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Rank, ProxyType.NewRank);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected dataChanged(): void {
            let rankNo = this.itemIndex + 2;//第二名开始
            if (rankNo < 4) {
                this.img_rank.visible = true;
                this.lb_rank.visible = false;
                this.img_rank.source = `rank${rankNo}`;
            } else {
                this.img_rank.visible = false;
                this.lb_rank.visible = true;
                this.lb_rank.text = rankNo + '';
            }
            this.currentState = rankNo < 4 ? 'first' : 'default';

            let data = this.data;
            if (!data || !data.info) {
                this.head.defaultHeadShow();
                this.lb_name.visible = this.lb_power.visible = false;
                this.lb_notone.visible = true;
                return;
            }
            let rankInfo = data.info;
            let teammate = rankInfo.base_info;
            if (teammate) {
                this.head.updateHeadShow(teammate.head, teammate.head_frame, teammate.sex);
                this.lb_name.text = teammate.name;
            }

            let powerDesc = this._proxy.getPowerByRankInfo(data.type, rankInfo);
            if (data.type != RankType.Xiuxian && data.type != RankType.Dengji) {
                powerDesc = getLanById(LanDef.showpower) + ':' + powerDesc;
            }
            this.lb_power.text = powerDesc;
            this.lb_name.visible = this.lb_power.visible = true;
            this.lb_notone.visible = false;
        }

        private onClick(): void {
            if (!this.data || !this.data.info) {
                return;
            }
            let teammate = this.data.info.base_info;
            if (teammate) {
                ViewMgr.getIns().showRoleTips(teammate.role_id, teammate.server_id);
            }
        }
    }

    export interface INewRankItemData {
        type: RankType,
        info: rank_info;
    }
}