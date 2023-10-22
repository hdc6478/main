namespace game.mod.more {

    import guild_pk_details = msg.guild_pk_details;

    export class CrossUnionResultItem extends BaseRenderer {

        private lab_name1: eui.Label;
        private lab_name2: eui.Label;
        private img_dead1: eui.Image;
        private img_dead2: eui.Image;
        private powerLab1: PowerLabel;
        private powerLab2: PowerLabel;
        private lab_debuff1: eui.Label;
        private lab_debuff2: eui.Label;

        public data: { own: guild_pk_details, target: guild_pk_details };

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let own: guild_pk_details = this.data.own;
            this.lab_debuff1.visible = this.powerLab1.visible = this.img_dead1.visible = this.lab_name1.visible = !!own;
            if (own) {
                this.lab_name1.text = own.name;
                this.img_dead1.visible = own.is_dead;
                this.powerLab1.setPowerValue(own.power);
                this.lab_debuff1.text = own.buff_lv ? `${own.buff_lv}级疲劳：战力-${own.buff_lv * 10}%` : "";
            }

            let target: guild_pk_details = this.data.target;
            this.lab_debuff2.visible = this.powerLab2.visible = this.img_dead2.visible = this.lab_name2.visible = !!target;
            if (target) {
                this.lab_name2.text = target.name;
                this.img_dead2.visible = target.is_dead;
                this.powerLab2.setPowerValue(target.power);
                this.lab_debuff2.text = target.buff_lv ? `${target.buff_lv}级疲劳：战力-${target.buff_lv * 10}%` : "";
            }
        }

    }

}