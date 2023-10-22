namespace game.mod.role {

    export class RoleGodDescItem extends eui.ItemRenderer {
        public baseNameItem: BaseNameItem;
        public lab_attr: eui.Label;

        public data: any;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
        }
    }
}