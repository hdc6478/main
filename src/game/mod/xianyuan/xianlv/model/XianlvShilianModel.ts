namespace game.mod.xianyuan {

    export class XianlvShilianModel {
        public list: { [type: number]: msg.shilian_info } = {};

        public rank_info: msg.marry_rank_info[] = [];
        public my_score: number = 0;
        public my_rank_no: number = 0;
        public rank_one_info: msg.teammate[] = [];

        public jifen_info: number[] = [];

        public hintPath: string[] = [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Shilian];
        public rankHintPath: string[] = [ModName.Xianyuan, XianyuanViewType.ShilianRank, MdrTabBtnType.TabBtnType01];
    }

}