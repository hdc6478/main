namespace game.mod.surface {

    export class LingChongSecondMainMdr extends WndSecondMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: LingChongSecondBtnType.Lingchong,
                icon: "lingchongtubiao",
                mdr: LingChongMdr,
                title: 'lingchong_tips',
                hintTypes: [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Lingchong, LingChongSecondBtnType.Lingchong]
            }
        ];

    }

}