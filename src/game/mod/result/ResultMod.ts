namespace game.mod.result {

    export class ResultMod extends ModBase {

        constructor() {
            super(ModName.Result);
        }

        protected initCmd() {
            let self = this;
            self.regCmd(ResultEvent.ON_RESULT_POPUP, onResultPopupCmd);
        }

        protected initModel() {
            this.regProxy(ProxyType.Result, ResultProxy);
        }

        protected initView(): void {
            let self = this;
            self.regMdr(ResultViewType.ResultWin,ResultWinMdr);
            self.regMdr(ResultViewType.ResultWinContinue,ResultWinContinueMdr);
            self.regMdr(ResultViewType.ResultFail, ResultFailMdr);
            self.regMdr(ResultViewType.ResultPass, ResultPassMdr);
            self.regMdr(ResultViewType.ResultBelong, ResultBelongMdr);
        }

    }

    gso.modCls.push(ResultMod);
}