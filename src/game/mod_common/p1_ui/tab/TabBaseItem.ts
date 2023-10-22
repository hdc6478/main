namespace game.mod {

    export class TabBaseItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public img_tag: eui.Image;

        public data: TabBaseItemData;

        protected dataChanged(): void {
            if (this.data.icon) {
                this.img_icon.source = this.data.icon + (this.selected ? 1 : 2);
            }
            if (this.img_tag) {
                this.img_tag.source = this.data.tag || '';
            }
            this.redPoint.visible = !!this.data.showHint;
        }
    }
}
