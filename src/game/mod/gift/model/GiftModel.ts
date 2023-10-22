namespace game.mod.gift {

    import jinjie_list = msg.jinjie_list;
    import LanDef = game.localization.LanDef;

    export class GiftModel {
        /**礼包类型数据*/
        public giftMap: { [type: number]: jinjie_list } = {};

        //todo 配置
        /**红点路径*/
        public giftTypes: { [type: number]: string[] } = {
            [GiftType.Yuanling]: [ModName.Gift, GiftViewType.Main, GiftType.Yuanling + ''],
            [GiftType.Ring]: [ModName.Xianyuan, XianyuanViewType.RingMain, XianlvRingMainBtnType.Yuanjie, GiftViewType.Main],
            [GiftType.XianLvJinJie]: [ModName.Xianlu, XianluViewType.XianluMain, XianluMainBtnType.Xiuxian, GiftViewType.Main]
        };
        /**icon资源*/
        public iconTypes: { [type: number]: string } = {
            [GiftType.Yuanling]: 'mubiaofanlibiaoqiantubiao',
            [GiftType.Ring]: 'meizhoushangchengtubiao',//todo 资源未出
            [GiftType.XianLvJinJie]: 'xiuxianlibaobiaoqiantubiao',
        };
        /**标题*/
        public titleTypes: { [type: number]: string } = {
            [GiftType.Yuanling]: LanDef.yuanling_tips5,
            [GiftType.Ring]: LanDef.jinjielibao_tips,
            [GiftType.XianLvJinJie]: LanDef.xiuxian_tips2,
        };
        /**广告图，默认png*/
        public bannerTypes: { [type: number]: string } = {
            [GiftType.Yuanling]: 'yuanlingshilian_guanggaotu',
            [GiftType.Ring]: 'yuanlingshilian_guanggaotu',//todo 资源未出
            [GiftType.XianLvJinJie]: 'xiuxianguanggaotu',
        };
    }

}