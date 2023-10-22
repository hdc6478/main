namespace game.mod.more {

    export class GoddessRecordMainMdr extends WndBaseNewMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: GoddessRecordMainBtnType.GoddessRecord,
                icon: "goddessRecord_tab",
                mdr: GoddessRecordMdr,
                bg: "goddessRecord_bg",
                hintTypes: [ModName.More, MoreViewType.GoddessRecordMain, GoddessRecordMainBtnType.GoddessRecord],
            }
        ];

    }
}