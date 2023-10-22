namespace game.mod.role {

    export class SuitGiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: SuitGiftViewType.Gift,
                icon: "jinjielibaobiaoqiantubiao",
                mdr: SuitGiftMdr,
                title: '进阶礼包',
                hintTypes: [ModName.Role, NewRoleViewType.SuitMain, NewRoleViewType.SuitGiftMain, SuitGiftViewType.Gift]
            }
        ];

        protected onClickBack() {
            super.onClickBack();
        }
    }

}