namespace game.mod.rank {

    import s2c_new_rank_info = msg.s2c_new_rank_info;

    export class RankModel {
        public infos: {[rankType: number] :s2c_new_rank_info} = {};
        public godInfos: {[rankType: number] :RankGodRenderData[]} = {};

        /**排行榜类型映射红点类型，todo*/
        public rankTypeToHintTypes: {[type: number] :string[]} = {
            [RankType.Type1] : [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank1],
            [RankType.Type2] : [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank2],
            [RankType.Type3] : [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank3],
        };
        /**排行榜类型映射功能id，todo*/
        public rankTypeToOpenIdx: {[type: number] :number} = {
        };
    }
}