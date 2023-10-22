namespace game.mod.more {

    import guild_pk_base = msg.guild_pk_base;

    export class CrossUnionSetTeamItem extends BaseRenderer {

        private lab_name: eui.Label;
        private lab_num: eui.Label;
        private lab_level: eui.Label;
        private bar: ProgressBarComp;
        private img_sel: eui.Image;
        private img_icon: eui.Image;

        // private _proxy: CrossUnionProxy;
        public data: guild_pk_base;
        // private _type: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            // this._proxy = getProxy(ModName.More, ProxyType.CrossUnion);
        }

        protected dataChanged(): void {
            // if (!this.data) {
            //     return;
            // }
            let info = this.data;
            // let info: guild_pk_base = this._proxy.getTeamInfo(this.data);
            this.lab_name.text = info && info.guild_name || "尚未匹配仙宗";
            this.lab_num.text = `${info && info.num || 0}`;
            this.lab_level.text = `${info && info.level || 0}级`;
            let hp = info && info.hp || 100;
            this.bar.show(hp, 100, false, 0, false, ProgressBarType.Percent);
        }

        public setData(data: guild_pk_base): void {
            // if (this._type != type) {
            //     this._type = type;
            //     this.currentState = `${type}`;
            // }
            this.data = data;
        }

        public set isSelect(v: boolean) {
            this.img_sel.visible = v;
        }
    }
}