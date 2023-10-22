namespace game.mod.more {


    import LanDef = game.localization.LanDef;

    export class SkyPalaceMainMdr extends WndBaseMdr {

        protected _btnData: WndBaseViewData[] = [
            {
                btnType: MdrTabBtnType.TabBtnType01,
                icon: 'huanggushenqi_',
                mdr: ArtifactMdr,
                title: LanDef.huanggushenqi_tips1,
                bg: "huanggushenqi_bg",
                openIdx: OpenIdx.SkyPalace,
                hintTypes: [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.SkyPalace]
            }
        ];
    }
}