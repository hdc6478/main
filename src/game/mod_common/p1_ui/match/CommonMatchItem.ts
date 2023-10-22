namespace game.mod {

    import teammate = msg.teammate;

    export class CommonMatchItem extends BaseRenderer {

        private img_player: eui.Image;
        private lab_name: eui.Label;
        private powerLabel: PowerLabel;

        public data: MatchItemData | teammate;

        protected onAddToStage(): void {
            super.onAddToStage();
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let info = this.data;
            this.lab_name.text = info.name;
            let sex: number = info.sex;
            this.img_player.source = `doufa_palyer${sex}`;

            this.powerLabel.visible = !!info.showpower;
            if (this.powerLabel.visible) {
                this.powerLabel.setPowerValue(info.showpower);
            }

            if (info.index) {
                this.currentState = `${info.index}`;
            }
        }

        public setData(data: MatchItemData | teammate): void {
            this.data = data;
        }
    }
}