namespace game.mod.chat {


    export class ChatMod extends ModBase {
        constructor() {
            super(ModName.Chat);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            this.regProxy(ProxyType.Chat, ChatProxy);
        }

        protected initView(): void {
            this.regMdr(ChatViewType.ChatMain, ChatMainMdr);
            this.regMdr(ChatViewType.Emoticon, EmoticonMdr);
            this.regMdr(ChatViewType.ChatSetting, ChatSettingMdr);
            this.regMdr(ChatViewType.ChatCheck, ChatCheckMdr);
            this.regMdr(ChatViewType.ChatCompete, ChatCompeteMdr);
            this.regMdr(ChatViewType.RoleTipsMain, RoleTipsMainMdr);
            this.regMdr(ChatViewType.RoleSurfaceTips, RoleSurfaceTipsMdr);
        }
    }

    gso.modCls.push(ChatMod);
}
