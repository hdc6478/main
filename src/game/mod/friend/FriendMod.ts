namespace game.mod.friend {

    export class FriendMod extends ModBase {
        constructor() {
            super(ModName.Friend);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Friend, FriendProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(FriendViewType.FriendMain, FriendMainMdr);
            this.regMdr(FriendViewType.FriendGift, FriendGiftMdr);
            this.regMdr(FriendViewType.FriendCheck, FriendCheckMdr);
            this.regMdr(FriendViewType.FriendResult, FriendResultMdr);
        }
    }

    gso.modCls.push(FriendMod)
}