namespace game.mod.surface {

    export class LingChongMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: LingChongBtnType.Lingchong,
                icon: "lingchongtubiao",
                mdr: LingChongSecondMainMdr,
                title: "lingchong_tips",
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Lingchong]
            },
            {
                btnType: LingChongBtnType.Yuangushenshou,
                icon: "yuangushenshoutubiao",
                mdr: YuanGuShenShouSecondMdr,
                title: "lingchong_tips2",
                bg: "horse_bg",
                hintTypes: [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Yuangushenshou]
            }

        ];
    }

}