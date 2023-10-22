namespace game.mod.activity {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class ChengshenMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "chengshen_tab",
                mdr: ChengshenMdr,
                title: LanDef.chengshen,
                bg: "chengshen_bg",
                hintTypes: [ModName.Activity, MainActivityViewType.ChengshenMain, MdrTabBtnType.TabBtnType01]
            }
            //往后加数据时需要注意，这个活动会关闭界面
        ];

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_ACTIVITY_ICON_HIDE, this.onActivityIconHide, this);
        }

        private onActivityIconHide(n: GameNT): void {
            let id: number = n.body;
            if (id == BtnIconId.Chengshen) {
                this.hide();
            }
        }
    }

}