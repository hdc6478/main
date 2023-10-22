namespace game.mod.god {

    import tiandi_level_data = msg.tiandi_level_data;
    import common_reward_status = msg.common_reward_status;
    import LanDef = game.localization.LanDef;
    import tiandi_youli_paiqian_struct = msg.tiandi_youli_paiqian_struct;
    import tiandi_youli_data = msg.tiandi_youli_data;

    export class GodModel {
        public iType: number;
        public now_itype: number;
        public value: number;
        public infos: { [type: number]: tiandi_level_data } = {};

        public hintNodes: { [type: number]: string[] } = {};

        public is_sign: number = 0;
        public num: number;
        public rewards: common_reward_status[];

        public ids: number[] = [];

        public tianlong_list: { [type: number]: tiandi_level_data } = {};

        public shifang_list: { [type: number]: tiandi_level_data } = {};

        public travel_list: tiandi_youli_paiqian_struct[] = [];

        public actOfType: { [type: number]: string } = {
            [GodType.Type1]: GodViewType.GodTreasure,
            [GodType.Type2]: GodViewType.GodHaunted,
            [GodType.Type3]: GodViewType.GodDragonoath,
            [GodType.Type4]: GodViewType.GodAvatar,
        };

        public readonly common: string[] = [ModName.God, GodViewType.GodMain, GodViewType.GodCommonMain];

        public readonly actname: { [type: number]: string } = {
            [GodType.Type1]: LanDef.tiandi_act_type1,
            [GodType.Type2]: LanDef.tiandi_act_type2,
            [GodType.Type3]: LanDef.tiandi_act_type3,
            [GodType.Type4]: LanDef.tiandi_act_type4,
        };

        public map_type: number;
        public saveChoose: tiandi_youli_data[] = [];
    }
}