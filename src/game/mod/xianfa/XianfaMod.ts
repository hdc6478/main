namespace game.mod.xianfa {

    export class XianfaMod extends ModBase {

        constructor() {
            super(ModName.Xianfa);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Xianfa, XianfaProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(XianfaViewType.XianfaMain, XianfaMainMdr);
            this.regMdr(XianfaViewType.XianfaSkillTip, XianfaSkillTipMdr);
            this.regMdr(XianfaViewType.XianfaStudyTip, XianfaStudyTipMdr);
            this.regMdr(XianfaViewType.XianfaActiveTip, XianfaActiveTipsMdr);
        }
    }

    gso.modCls.push(XianfaMod);
}