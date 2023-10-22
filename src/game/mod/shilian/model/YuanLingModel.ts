namespace game.mod.shilian {

    export class YuanLingModel {
        /** 已使用收益次数 */
        public count: number = 0;
        /** 已通关的难度 */
        public diff: number = 0;
        /** 已经购买次数 */
        public buy: number = 0;
        /** 单个难度信息 */
        public info: { [type: number]: msg.yuanling_item } = {};
        /** 队伍列表信息 */
        public team_list: msg.yuanling_team[] = [];

        /** 自己队伍的难度 */
        public own_index: number = 0;
        /** 自己队伍的id */
        public own_team_id: number = 0;
        /** 自己队伍信息 */
        public own_team_infos: msg.yuanling_team_info[] = [];

        /** buff时间 */
        public buff_info: { [index: number]: number } = {};

        /**被提出的队伍 [队伍id:被踢出的时间戳]*/
        public kick_out_team: { [team_id: number]: number } = {};

        /**收到组队邀请*/
        public be_invited_team: { [team_id: number]: msg.s2c_yuanling_invita } = {};

        /**可邀请列表*/
        public invite_list: msg.teammate[] = [];

        /**进入副本挑战*/
        public scene_index: number = 0;//难度
        public scene_layer: number = 0;//第几层

        /**伤害排行*/
        public damage_info: msg.yuanling_damage_info[] = [];

        /**各难度通关次数*/
        public challenge_counts: {[idx: number]: number} = {};

        /**元灵试炼红点*/
        public hintPath = [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.YuanLing];
    }

}