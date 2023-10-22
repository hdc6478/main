namespace game.mod.more {

    import huashen_data = msg.huashen_data;
    import HuashenTianfuConfig = game.config.HuashenTianfuConfig;

    export class HuashenModel {
        public selIndex: number;
        public hintType: string[] = [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenTask];
        public roadIndex: number;//化神之路已领取到的索引
        public nowId: number;//战神殿 当前激活可以激活的化神id，没有就推送0
        public roadHint: string[] = [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen, HintType.HuashenZhilu];//化神之路红点
        public zhanshendianHint: string[] = [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.Huashen, MoreViewType.ZhanshendianMain];//战神殿红点
        public tianfuList: huashen_data[];//天赋信息
        public tianfuOpen: boolean = false;//天赋是否开启，激活两个化神后开启
        public tianfuCfgList: { [type: number]: HuashenTianfuConfig[] } = {};/**客户端分类*/
        public tianfuUpHint: string[] = [ModName.More, MoreViewType.HuashenMain, HuashenMainBtnType.HuashenTianfu];//升级红点
        public tianfuUpIndex: number;//天赋升级道具index
    }
}