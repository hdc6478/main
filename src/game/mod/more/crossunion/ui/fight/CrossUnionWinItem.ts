namespace game.mod.more {

    import guild_pk_finally = msg.guild_pk_finally;

    export class CrossUnionWinItem extends BaseRenderer {

        private lab_name: eui.Label;
        private lab_rank: eui.Label;
        private lab_kill: eui.Label;
        private img_mvp: eui.Image;

        public data: guild_pk_finally;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            this.lab_name.textColor = this.data.type == 1 ? 0x48deff : 0xff4545;
            this.lab_rank.text = `${this.itemIndex + 1}`;
            this.lab_kill.text = `${this.data.kill_num}`;
            this.img_mvp.visible = !this.itemIndex;
        }

    }

}