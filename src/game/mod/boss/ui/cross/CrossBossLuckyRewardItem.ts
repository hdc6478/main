namespace game.mod.boss {

    import teammate = msg.teammate;

    export class CrossBossLuckyRewardItem extends eui.ItemRenderer {
        private lab_name: eui.Label;
        private lab_value: eui.Label;

        public data: teammate;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_name.text = this.data.name;
            this.lab_value.text = this.data.value.toString();
        }

    }
}