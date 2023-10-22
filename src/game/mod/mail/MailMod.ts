namespace game.mod.mail {


    export class MailMod extends ModBase {
        constructor() {
            super(ModName.Mail);
        }

        protected initCmd(): void {
            super.initCmd();
            let self = this;
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Mail, MailProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;
            this.regMdr(MailViewType.MailMain, MailMainMdr);
            this.regMdr(MailViewType.MailDesc, MailDescMdr);
        }
    }

    gso.modCls.push(MailMod);
}
