namespace game.mod.more {

    import facade = base.facade;

    export class XianjieLuandouStatisticItem extends BaseListenerRenderer {
        public img_mvp: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_kill: eui.Label;
        public lab_num: eui.Label;
        public lab_score: eui.Label;
        public img_line: eui.Image;

        data: msg.xianjie_pvp_scene_score_info;
        private _proxy: XianjieLuandouProxy;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.More).retProxy(ProxyType.XianjieLuandou);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }

            let rankNum = data.rank_num;
            this.lab_rank.text = rankNum + '';
            this.img_mvp.visible = rankNum == 1;
            this.img_mvp.source = 'MVP';

            let myGuildId = RoleUtil.getGuildId();
            let guildId = data.guild_id;
            let color = WhiteColor.DEFAULT2;
            if (myGuildId && guildId && myGuildId == guildId) {
                color = WhiteColor.GREEN;
            }
            this.lab_name.textColor = color;

            let rankType = this._proxy.sel_scene_rank;
            if (rankType == RankCommonType2.Guild) {
                this.lab_kill.visible = this.lab_score.visible = false;
                this.lab_num.text = (data.score || 0) + '';
                this.lab_name.text = data.guild_name;
            } else {
                this.lab_kill.visible = this.lab_score.visible = true;
                this.lab_kill.text = (data.kill || 0) + '';
                this.lab_num.text = (data.help_kill || 0) + '';
                this.lab_score.text = (data.score || 0) + '';
                this.lab_name.text = data.name + '\n仙宗：' + data.guild_name;
            }
        }

        public updateMyShow(): void {
            let rankType = this._proxy.sel_scene_rank;
            let data = this._proxy.scene_my_rank;
            let rankNum = data && data.rank_num || 0;
            this.img_mvp.source = 'wode';
            this.lab_rank.text = rankNum + '';
            this.lab_name.textColor = WhiteColor.GREEN;

            if (rankType == RankCommonType2.Guild) {
                this.lab_kill.visible = this.lab_score.visible = false;
                this.lab_num.text = `${data && data.score || 0}`;
                this.lab_name.text = data && data.guild_name || '';
            } else {
                this.lab_kill.visible = this.lab_score.visible = true;
                this.lab_kill.text = `${data && data.kill || 0}`;
                this.lab_num.text = `${data && data.help_kill || 0}`;
                this.lab_score.text = `${data && data.score || 0}`;
                this.lab_name.text = data && data.name || '';
            }
        }
    }
}