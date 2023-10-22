namespace game.mod.activity {

    import game_order_data = msg.game_order_data;

    export class GameOrderModel {
        /**当前mdr*/
        public mdrType: number;

        public list: { [type: number]: game_order_data } = {};
        public selType: GameOrderType;

        /**战令系统，统一展示的战令类型数组 todo*/
        public showType: number[] = [GameOrderType.Chuangguanling, GameOrderType.Huoyueling, GameOrderType.XiuXian, GameOrderType.Tansuo, GameOrderType.Huanjing];

        /**战令banner资源，默认 giving_banner */
        public bannerType: { [type: number]: string } = {
            [GameOrderType.XiuXian]: 'giving_banner2',
            [GameOrderType.Tansuo]: 'giving_banner5',
            [GameOrderType.Chaojilicai]: 'giving_banner7',
            [GameOrderType.Zhizunlicai]: 'giving_banner8',
        };

        /**不显示tips文本图片的类型*/
        public notTipsType = [GameOrderType.XiuXian, GameOrderType.Tansuo, GameOrderType.Chaojilicai, GameOrderType.Zhizunlicai];

        public btnTypeByType: { [type: number]: string } = {
            [GameOrderType.Chuangguanling]: MdrTabBtnType.TabBtnType01,
            [GameOrderType.Huoyueling]: MdrTabBtnType.TabBtnType02,
            [GameOrderType.XiuXian]: MdrTabBtnType.TabBtnType04,
            [GameOrderType.Tansuo]: MdrTabBtnType.TabBtnType05,
            [GameOrderType.Huanjing]: MdrTabBtnType.TabBtnType06
        };

        /**战令类型红点*/
        public hintPath: { [type: number]: string[] } = {
            [GameOrderType.Chuangguanling]: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType01],
            [GameOrderType.Huoyueling]: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType02],
            [GameOrderType.XiuXian]: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType04],
            [GameOrderType.Tansuo]: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType05],
            [GameOrderType.Huanjing]: [ModName.Activity, MainActivityViewType.Giving, MdrTabBtnType.TabBtnType06],
        };
    }
}
