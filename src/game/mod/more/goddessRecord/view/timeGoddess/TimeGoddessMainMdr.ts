namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class TimeGoddessMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: TimeGoddessMainBtnType.TimeGoddess,
                icon: "timeGoddess_tab",
                mdr: TimeGoddessMdr,
                title: LanDef.time_nvshen_tips,
                bg: "timeGoddess_bg",
                hintTypes: [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord,
                    MoreViewType.TimeGoddessMain, TimeGoddessMainBtnType.TimeGoddess],
            }
        ];

    }
}