namespace game.mod.jiban {

    import LanDef = game.localization.LanDef;

    export class JibanMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: JibanMainBtnType.Huanhua,
                icon: "huanhuabiaoqiantubiao",
                mdr: RoleHuanHuaMdr,
                title: LanDef.title_cue3,
                openIdx: OpenIdx.RoleHuanhua,
                bg: 'horse_bg',
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleHuanhua]
            },
            {
                btnType: JibanMainBtnType.ShenLing,
                icon: "shenlingbiaoqiantubiao",
                mdr: ShenLingJiBanMdr,
                title: LanDef.general_tips,
                //bg: "p1_xiuxian_bg",
                openIdx: OpenIdx.Shenling,
                hintTypes: [ModName.Jiban, JibanViewType.JibanMain + JibanMainBtnType.ShenLing]
            },
            {
                btnType: JibanMainBtnType.Collect,
                icon: "zhuangbeibiaoqiantubiao",
                mdr: RoleGatherMdr,
                title: LanDef.equipment_tips,
                openIdx: OpenIdx.RoleCollect,
                bg: 'horse_bg',
                hintTypes: [ModName.Role, NewRoleViewType.RoleMain + OpenIdx.RoleCollect]
            },
            {
                btnType: JibanMainBtnType.Horse,
                icon: "horse_tab",
                mdr: HorseJibanMdr,
                title: LanDef.horse_tips,
                bg: "p1_del_bg",
                openIdx: OpenIdx.Horse,
                hintTypes: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.HorseJiban]
            },
            {
                btnType: JibanMainBtnType.Child,
                icon: "zinvbiaoqiantubiao",
                mdr: ChildJibanMdr,
                title: LanDef.xianlv_tips24,
                bg: "p1_del_bg",
                openIdx: OpenIdx.XianlvChild,
                hintTypes: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, 'jiban']
            },
            {
                btnType: JibanMainBtnType.Tianshen,
                icon: "yuanling_tab",
                mdr: TianshenJibanMdr,
                title: LanDef.yuanling_tips,
                bg: "p1_del_bg",
                openIdx: OpenIdx.Tianshen,
                hintTypes: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.TianshenJiban]
            },
            {
                btnType: JibanMainBtnType.Xianjian,
                icon: "xianjiantubiao",
                mdr: XianjianJibanMdr,
                title: LanDef.xianjian_tips1,
                bg: "p1_del_bg",
                openIdx: OpenIdx.Xianjian,
                hintTypes: [ModName.Surface, SurfaceViewType.Xianjian, MdrTabBtnType.TabBtnType01]
            },
            {
                btnType: JibanMainBtnType.YishouShouyin,
                icon: "shouyinbiaoqiantubiao",
                mdr: YishouShouyinJibanMdr,
                title: LanDef.yishou_tips8,
                bg: "p1_del_bg",
                openIdx: OpenIdx.Yishou,
                hintTypes: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, JibanMainBtnType.YishouShouyin]
            }
        ];

    }
}