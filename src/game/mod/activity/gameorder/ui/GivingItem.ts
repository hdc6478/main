namespace game.mod.activity {

    import GameOrderConfig = game.config.GameOrderConfig;

    export class GivingItem extends GameOrderItem {

        protected onAddToStage(): void {
            super.onAddToStage();

            this.list.itemRenderer = IconGot;
            this.list.dataProvider = this._listData;
        }

        protected dataChanged(): void {
            let data = this.data as IGameOrderItemData;
            if (!data) {
                return;
            }
            let cfg: GameOrderConfig = data.cfg;

            this.grp_gray.visible = !data.isBought;

            let list: IconRewardData[] = [];
            let payStatus = data.payStatus || RewardStatus.NotFinish;
            let isGot: boolean = payStatus == RewardStatus.Draw;
            for (let prop of cfg.rewad_1) {
                list.push({prop, isGot, showTips: true});
            }
            this._listData.source = list;

            let freeStatus = data.freeStatus || RewardStatus.NotFinish;
            this.icon.setData({
                prop: cfg.reward,
                isGot: freeStatus == RewardStatus.Draw,
                showHint: freeStatus == RewardStatus.Finish,
                showTips: true
            });

            if (data.type == GameOrderType.XiuXian) {
                this.lab_val.text = `${RoleUtil.getRebirthLv(data.cfg.target)}转`;

                let target: number = RoleUtil.getRebirthLv(cfg.target);
                let val: number = RoleUtil.getRebirthLv(data.val) || 0;
                let next: number = data.next;
                let start: number = data.before;
                this.bar.setData({start, val, target, next});
            } else {
                this.lab_val.text = `${cfg.target}`;

                let val: number = data.val;
                this.bar.setData({start: data.before, val, target: cfg.target, next: data.next});
            }
        }
    }
}
