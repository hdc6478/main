namespace game.mod.activity {


    export class TehuiLibaoModel {
        public infos: { [type: number]: number } = {};

        public openIdxs: { [type: number]: number } = {
            [TehuiType.TehuiLibao]: OpenIdx.TehuiLibao,
            [TehuiType.JinjieTehui]: OpenIdx.JinjieTehui,
        };

        public btnIdxs: { [type: number]: number } = {
            [TehuiType.TehuiLibao]: BtnIconId.TehuiLibao,
            [TehuiType.JinjieTehui]: BtnIconId.JinjieTehui,
        };

        /**收到协议的时间戳 */
        public tehuiTime: number;

    }

}