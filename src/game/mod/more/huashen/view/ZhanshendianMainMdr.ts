namespace game.mod.more {

    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;
    export class ZhanshendianMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: "zhanshendian_tab",
                mdr: ZhanshendianMdr,
                title: LanDef.zhanshendian_tips,
                bg: "huashenbeijingtu",
                hintTypes: [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen, MoreViewType.ZhanshendianMain]
            }
        ];

        protected addListeners(): void {
            super.addListeners();

            this.onNt(HuashenEvent.ON_UPDATE_HUASHEN_ZHANSHENDIAN_INFO, this.onInfoUpdate, this);
        }

        private onInfoUpdate(n: GameNT): void {
            let index: number = n.body;
            if(!index){
                this.hide();//全部激活，关闭界面
            }
        }
    }
}