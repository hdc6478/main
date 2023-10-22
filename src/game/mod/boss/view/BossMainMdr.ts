namespace game.mod.boss {

    import LanDef = game.localization.LanDef;

    export class BossMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: BossMainBtnType.Many,
                icon: "many_tab",
                mdr: ManyBossMdr,
                title: LanDef.many_boss_title,
                bg: "manyboss_bg",
                hintTypes: [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Many],
            },
            {
                btnType: BossMainBtnType.Personal,
                icon: "personal_tab",
                mdr: PersonalBossMdr,
                title: LanDef.boss_cue1,
                openIdx: OpenIdx.PersonalBoss,
                bg: "",
                hintTypes: [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Personal],
            },
            {
                btnType: BossMainBtnType.Vip,
                icon: "vip_tab",
                mdr: VipBossMdr,
                title: LanDef.boss_vip,
                openIdx: OpenIdx.VipBoss,
                bg: "manyboss_bg",
                hintTypes: [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Vip],
            },
            {
                btnType: BossMainBtnType.Cross,
                icon: "cross_tab",
                mdr: CrossBossMdr,
                title: LanDef.cross_boss_tips1,
                openIdx: OpenIdx.CrossBoss,
                bg: "crossboss_bg",
                hintTypes: [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Cross],
            },
            {
                btnType: BossMainBtnType.Abyss,
                icon: "zhuimoshenyuanbiaoqiantubiao",
                mdr: AbyssMdr,
                title: LanDef.zhuimoshenyuan_tips9,
                openIdx: OpenIdx.Abyss,
                bg:"zhuimoshenyuanbeijingtu",
                hintTypes: [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Abyss],
            }
        ];

    }
}