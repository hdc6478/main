namespace game.mod.surface {

    export class YuanGuShenShouSecondMdr extends WndSecondMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: LingChongSecondBtnType.Sishenshou,
                icon: "sishenshoutubiao",
                mdr: YuanGuShenShouMdr,
                title: 'lingchong_tips2',
                hintTypes: [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Sishenshou]
            },
            {
                btnType: LingChongSecondBtnType.Yuangushenshou,
                icon: "yuangushenshoutubiao",
                mdr: YuanGuShenShou2Mdr,
                title: 'lingchong_tips2',
                hintTypes: [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Yuangushenshou]
            }
        ];
    }

}