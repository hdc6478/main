namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class XujieTansuoRankItem2 extends BaseListenerRenderer {
        public img_flag: eui.Image;
        public lb_name: eui.Label;
        public lb_rankno: eui.Label;

        data: { rankNo: number, rankInfo: msg.zhandui_legion_rank_struct };

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoRankItemSkin2`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            //this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this., this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rankNo = data.rankNo;
            // this.lb_rankno.text = rankNo == 1 ? '天下第一' : '第' + StringUtil.ChineseNum[rankNo] + '名';
            if (data.rankInfo) {
                this.img_flag.source = ResUtil.getZhanduiFlag(data.rankInfo.flag_index);
                this.lb_name.text = data.rankInfo.team_name;
            } else {
                this.img_flag.source = ``;
                this.lb_name.text = getLanById(LanDef.tishi_2);
            }
            this.lb_name.textColor = rankNo == 1 ? 0xf8ff45 : 0xfdffd1;
        }
    }
}