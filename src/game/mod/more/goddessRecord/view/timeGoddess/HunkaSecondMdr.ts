namespace game.mod.more {

    export class HunkaSecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'hunka_fazhen',
                mdr: HunkaMdr,
                bg: "",
                hintTypes: [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                    MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
                    MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: 'huanka_hecheng',
                mdr: HunkaComposeMdr,
                bg: "hunka_hecheng_bg",
                hintTypes: [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                    MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess, MoreViewType.HunkaMain, MdrTabBtnType.TabBtnType01,
                    MdrTabBtnType.TabBtnType02]
            }
        ];
    }
}