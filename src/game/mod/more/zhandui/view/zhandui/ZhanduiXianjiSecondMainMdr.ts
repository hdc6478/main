namespace game.mod.more {

    export class ZhanduiXianjiSecondMainMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "gongjitubiao1",
                mdr: ZhanduiXianjiMdr,
                bg: ""
            },
            {
                btnType: MdrTabBtnType.TabBtnType02,
                icon: "gongjitubiao2",
                mdr: ZhanduiXianjiMdr2,
                bg: ""
            }
        ];
    }

}