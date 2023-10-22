namespace game.mod.more {

    import HonourConfig = game.config.HonourConfig;

    export class HonourModel {
        /**type-index存储信息，二维Map存储*/
        public typeInfo: { [type: number]: { [index: number]: msg.honour_info } } = {};

        public typeCfgMap: { [type: number]: HonourConfig[] } = {};

        //红点路径
        public hintPathObj: { [type: number]: string[] } = {
            [HonourType.Honour]: [ModName.More, MoreViewType.AchieveMain, AchieveMainBtnType.Honour]
        };
    }

}