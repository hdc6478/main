namespace game.mod.activity {

    import chonglist_gift_data = msg.chonglist_gift_data;
    import chonglist_revelry_data = msg.chonglist_revelry_data;
    import LanDef = game.localization.LanDef;

    export class PunshListModel {
        public type: number;

        public gifts: { [type: number]: chonglist_gift_data[] } = {};

        public datas: { [type: number]: chonglist_revelry_data[] } = {};

        public score: number = 0;

        public openIdxs: number[] = [OpenIdx.Weapon, OpenIdx.Wing, OpenIdx.Tianshen, OpenIdx.Horse, OpenIdx.Shenling];

        public surfaceType: number[] = [RankType.Zuoqi, RankType.Yuanling];

        public roleType: number[] = [RankType.Yuyi, RankType.Shenbing];

        public openIdxToRankType: { [openidx: number]: number } = {
            [OpenIdx.Weapon]: RankType.Shenbing,
            [OpenIdx.Wing]: RankType.Yuyi,
            [OpenIdx.Tianshen]: RankType.Yuanling,
            [OpenIdx.Horse]: RankType.Zuoqi,
            [OpenIdx.Shenling]: RankType.Shenling,
        };

        public getOpenIdxByRankType: { [rankType: number]: number } = {
            [RankType.Shenbing]: OpenIdx.Weapon,
            [RankType.Yuyi]: OpenIdx.Wing,
            [RankType.Yuanling]: OpenIdx.Tianshen,
            [RankType.Zuoqi]: OpenIdx.Horse,
            [RankType.Shenling]: OpenIdx.Shenling,
        }

        public hintsByType: { [rankType: number]: string[] } = {
            [RankType.Yuanling]: [ModName.Surface, SurfaceViewType.TianshenMain, TianshenMainBtnType.Tianshen, HintType.PunshList],
            [RankType.Zuoqi]: [ModName.Surface, SurfaceViewType.HorseMain, HorseMainBtnType.Horse, HintType.PunshList],
            [RankType.Yuyi]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Wing, WingMainBtnType.Wing, HintType.PunshList],
            [RankType.Shenbing]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Weapon, WeaponMainBtnType.Weapon, HintType.PunshList],
            [RankType.Shenling]: [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Main, HintType.PunshList]
        };

        public getJumpIdxByType: { [rankType: number]: number } = {
            [RankType.Yuanling]: JumpIdx.Tianshen,
            [RankType.Zuoqi]: JumpIdx.Horse,
            [RankType.Yuyi]: JumpIdx.Wing,
            [RankType.Shenbing]: JumpIdx.Weapon,
            [RankType.Shenling]: JumpIdx.Shenling
        };

        public getRankPowerByType: { [rankType: number]: string } = {
            [RankType.Shenling]: "shenling_showpower",
            [RankType.Zuoqi]: "ride_showpower",
            [RankType.Yuanling]: "yuanling_showpower",
            [RankType.Shenbing]: "weapon_showpower",
            [RankType.Yuyi]: "wings_showpower",
        };

        public getRankTitleByType: { [rankType: number]: string } = {
            /**神灵冲榜*/
            [RankType.Shenling]: LanDef.xinfuchongbang_tip3,
            /**神兵冲榜*/
            [RankType.Shenbing]: LanDef.xinfuchongbang_tip4,
            /**元灵冲榜*/
            [RankType.Yuanling]: LanDef.xinfuchongbang_tip5,
            /**羽翼冲榜*/
            [RankType.Yuyi]: LanDef.xinfuchongbang_tip6,
            /**坐骑冲榜*/
            [RankType.Zuoqi]: LanDef.xinfuchongbang_tip7,
        }
    }
}
