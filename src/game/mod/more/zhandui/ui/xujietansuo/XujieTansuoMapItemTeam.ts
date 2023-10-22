namespace game.mod.more {

    export class XujieTansuoMapItemTeam extends BaseListenerRenderer {
        public img_flag: eui.Image;
        public lb_name: eui.Label;

        data: msg.zhandui_legion_rank_struct;

        constructor() {
            super();
            this.skinName = `skins.more.XujieTansuoMapItemTeamSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.img_flag.source = ResUtil.getZhanduiFlag(data.flag_index);
            this.lb_name.text = data.team_name;
        }
    }
}