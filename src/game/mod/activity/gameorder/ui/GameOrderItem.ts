namespace game.mod.activity {


    /**通用战令item*/
    export class GameOrderItem extends BaseListenerRenderer {
        public list: eui.List;
        public icon: game.mod.IconGot;
        public bar: game.mod.VProgressBar;
        public lab_val: eui.Label;
        public grp_gray: eui.Group;
        public img_gray: eui.Image;

        data: IGameOrderItemData;
        protected _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.activity.GivingItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = IconGot;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.grp_gray.visible = !data.isBought;

            //付费奖励
            let list: IconRewardData[] = [];
            let payStatus = data.payStatus || RewardStatus.NotFinish;
            for (let reward of data.cfg.rewad_1) {
                list.push({
                    prop: PropData.create(reward[0], reward[1]),
                    isGot: payStatus == RewardStatus.Draw,
                    showTips: true
                });
            }
            this._listData.source = list;

            //免费奖励
            let freeStatus = data.freeStatus || RewardStatus.NotFinish;
            this.icon.setData({
                prop: data.cfg.reward,
                isGot: freeStatus == RewardStatus.Draw,
                showHint: freeStatus == RewardStatus.Finish,
                showTips: true
            });
            if (data.type == GameOrderType.XiuXian) {
                this.lab_val.text = `${RoleUtil.getRebirthLvStrNoZhuan(data.cfg.target)}转`;

                let target: number = RoleUtil.getRebirthLv(data.cfg.target);
                let val: number = RoleUtil.getRebirthLv(data.val) || 0;
                let next: number = data.next;
                let start: number = data.before;
                this.bar.setData({start, val, target, next});
                return;
            }

            let valStr = data.cfg.target + '';
            if (data.type == GameOrderType.Zhizunlicai) {
                let time = data.cfg.target;
                let timeStr: string;
                if (time >= Second.Day) {
                    timeStr = TimeUtil.formatSecond(time, 'd天H时');
                } else {
                    timeStr = TimeUtil.formatSecond(time, 'H时m分');
                }
                valStr = timeStr;
            }
            this.lab_val.text = valStr;

            let val: number = data.val || 0;
            this.bar.setData({start: data.before, val, target: data.cfg.target, next: data.next});
        }
    }
}