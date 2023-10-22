namespace game.mod.yijie {

    import teammate = msg.teammate;
    import LanDef = game.localization.LanDef;

    export class YijieLuckyItem extends eui.ItemRenderer {
        private lab_name: eui.Label;

        public data: teammate;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let nameStr = this.data.name + StringUtil.substitute(getLanById(LanDef.yijie_tips18), [this.data.value.toString()]);
            this.lab_name.textFlow = TextUtil.parseHtml(nameStr);
        }

    }
}