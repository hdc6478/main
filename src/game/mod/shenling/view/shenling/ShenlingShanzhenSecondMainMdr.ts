namespace game.mod.shenling {

    import LanDef = game.localization.LanDef;

    export class ShenlingShanzhenSecondMainMdr extends WndSecondMainMdr {
        protected _height: number = 1120;
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "shenlingshangzhen",
                mdr: ShenLingShangZhenMdr,
                title: LanDef.shangzhen,
                hintTypes: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Main, ShenLingViewType.ShenLingShangZhen, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "baojuchuzhan",
                mdr: null,
                title: LanDef.shangzhen,
                hintTypes: []
            }
        ];

        protected onTabCheck(index: number): boolean {
            let data: WndBaseViewData = this._btnList.source[index];
            if (data && data.btnType == MdrTabBtnType.TabBtnType02) {
                PromptBox.getIns().show(`敬请期待`);//todo
                return false;
            }
            return true;
        }
    }

}