namespace game.mod {

    export class CommonLimitItemRender extends eui.ItemRenderer {
        public lab_desc: eui.Label;
        public data: number[];//type_value, type: 1=转生等级2=通关数量3=神力值

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(RoleUtil.getLimitStr(this.data));
        }
    }
}