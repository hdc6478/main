namespace game.mod {

    export class TabSecondItem extends BaseRenderer {
        public img_icon: eui.Image;
        public img_name: eui.Image;
        public grp_name: eui.Group;
        public img_gray: eui.Image;
        public redPoint: eui.Image;
        public img_tag: eui.Image;
        public grp_count: eui.Group;
        public lab_count: eui.Label;

        public lb_name: eui.Label;
        public img_status: eui.Image;

        public data: TabBaseItemData;

        public setData(data: TabBaseItemData): void {
            this.data = data;
            this.dataChanged();
        }

        protected dataChanged(): void {
            if (this.data.icon) {
                this.img_icon.source = this.data.icon;
            }
            if (this.data.nameIcon) {
                this.img_name.visible = true;
                this.img_name.source = this.data.nameIcon;
            }
            if (this.img_gray) {
                this.img_gray.visible = !!this.data.gray;
            }
            if (this.grp_name) {
                if (this.data.nameGrpStr) {
                    this.img_name.visible = false;
                    this.addBmpFont(this.data.nameGrpStr, this.data.nameGrpFont, this.grp_name, true, 1, true, -8);
                } else {
                    this.grp_name.removeChildren();
                }
            }
            if (this.img_tag) {
                this.img_tag.source = this.data.tag;
            }
            if (this.grp_count) {
                this.grp_count.visible = this.data.strCount && !!this.data.strCount.length;
            }
            if (this.grp_count && this.grp_count.visible) {
                this.lab_count.textFlow = TextUtil.parseHtml(this.data.strCount);
            }
            if (this.lb_name) {
                this.lb_name.textFlow = TextUtil.parseHtml(this.data.nameStr);
            }

            this.redPoint.visible = !!this.data.showHint;
        }
    }
}
