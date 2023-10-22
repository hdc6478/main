namespace game.mod.mail {


    import LanDef = game.localization.LanDef;

    export class MailMainMdr extends WndBaseMdr {
        private _proxy: MailProxy;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MailMainBtnType.BtnMail,
                icon: "xitongyoujianbiaoqiantubiao",
                mdr: MailMdr,
                title: LanDef.tishi_25,
                hintTypes: [ModName.Mail, MailViewType.MailMain + MailMainBtnType.BtnMail]
            },
            {
                btnType: MailMainBtnType.BtnGMMail,
                icon: "GMyoujianbiaoqiantubiao",
                mdr: MailMdr,
                title: LanDef.tishi_25,
                hintTypes: [ModName.Mail, MailViewType.MailMain + MailMainBtnType.BtnGMMail]
            }
        ];

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.Mail);
            super.onInit();
        }

        protected onTabCheck(index: number): boolean {
            // let type: number = this._proxy.getTypeByIndex(index);
            // let open: number[] = this._proxy.getOpenByType(type);
            // return ViewMgr.getIns().checkBossOpen(open[0], open[1], true);
            this._proxy.type = index + 1;
            return true;
        }
    }
}