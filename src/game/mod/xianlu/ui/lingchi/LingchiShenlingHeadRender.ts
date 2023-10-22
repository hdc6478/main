namespace game.mod.xianlu {

    import lingpool_unit_data = msg.lingpool_unit_data;

    export class LingchiShenlingHeadRender extends eui.ItemRenderer {
        public icon: game.mod.Icon;

        public data: lingpool_unit_data;//神灵数据

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let index = this.data.unitid;
            this.icon.setData(index);
        }
    }
}