namespace game.mod.enhance {

    export class GemSynRender extends IconSel {

        public data: PropData;

        constructor() {
            super();
        }

        protected dataChanged(): void {
            if(!this.data) {
                return;
            }
            this.icon.setData(this.data, IconShowType.NotTips);
        }
    }
}