namespace game.mod.activity {

    import prop_tips_data = msg.prop_tips_data;

    export class XianchiItem extends eui.ItemRenderer {
        public icon: game.mod.Icon;

        public data: prop_tips_data;//todo

        protected dataChanged(): void {
            if (!this.data) {
                this.currentState = "lock";
                return;
            }
            this.currentState = "open";
            this.icon.setData(this.data);
        }
    }
}