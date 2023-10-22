namespace game.mod.compete {

    export class DoufaTabItem extends eui.ItemRenderer {
        public labelDisplay: eui.Label;

        public data: number;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let type = this.data;
            this.labelDisplay.text = getLanById("doufa_group" + type);
        }
    }
}
