namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import guild_pk_zhanbao = msg.guild_pk_zhanbao;

    export class CrossUnionZhanbaoItem extends BaseRenderer {

        private lab_union1: eui.Label;
        private lab_union2: eui.Label;
        private powerLab1: PowerLabel;
        private powerLab2: PowerLabel;
        private img_win: eui.Image;
        private lab_time: eui.Label;

        // private _proxy: CrossUnionProxy;

        public data: guild_pk_zhanbao;

        protected onAddToStage(): void {
            super.onAddToStage();
            // this._proxy = getProxy(ModName.More, ProxyType.CrossUnion);
        }

        protected dataChanged(): void {
            this.lab_union1.text = this.data.my_guild_name;
            this.lab_union2.text = this.data.target_name;
            this.powerLab1.setPowerValue(this.data.my_num);
            this.powerLab2.setPowerValue(this.data.target_num);

            this.img_win.source = this.data.ret ? "sheng" : "bai";
            this.lab_time.text = TimeUtil.formatTime(this.data.time * 1000, "yyyy年MM月dd日");
        }
    }
}