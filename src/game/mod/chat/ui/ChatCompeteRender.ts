namespace game.mod.chat {

    import showpower_check_data = msg.showpower_check_data;

    export class ChatCompeteRender extends eui.ItemRenderer {
        public img_val1: eui.Image;
        public lab_val1: eui.Label;
        public img_val2: eui.Image;
        public lab_val2: eui.Label;
        public lab_desc: eui.Label;

        public data: showpower_check_data;

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let headType = this.data.head_type;
            let selfPower = this.data.self_showpower;
            let rolePower = this.data.role_showpower;
            this.lab_val1.text = StringUtil.getHurtNumStr(selfPower.toNumber());
            this.lab_val2.text = StringUtil.getHurtNumStr(rolePower.toNumber());
            let isWin = selfPower.gte(rolePower);
            this.img_val1.source = isWin ? "jindutiaolvse" : "jindutiaohongse";
            this.img_val2.source = !isWin ? "jindutiaolvse" : "jindutiaohongse";
            this.img_val1.visible = selfPower.gt(Long.fromValue(0));
            this.img_val2.visible = rolePower.gt(Long.fromValue(0));
            this.lab_desc.text = getLanById(ConfigHeadToName[headType]);
        }
    }
}