namespace game.mod.activity {

    export class ActivityMod extends ModBase {
        constructor() {
            super(ModName.Activity);
        }

        protected initCmd(): void {
            super.initCmd();
            let self = this;
        }

        protected initModel(): void {
            super.initModel();
            let self = this;
            self.regProxy(ProxyType.Activity, ActivityProxy);
            self.regProxy(ProxyType.Lottery, LotteryProxy);
            self.regProxy(ProxyType.Summon, SummonProxy);
            self.regProxy(ProxyType.SignGift, SignGiftProxy);
            self.regProxy(ProxyType.GameOrder, GameOrderProxy);
            self.regProxy(ProxyType.First, FirstProxy);
            self.regProxy(ProxyType.ZeroBuy, ZeroBuyProxy);
            self.regProxy(ProxyType.Zhaocaixian, ZcxProxy);
            self.regProxy(ProxyType.RoleRing, RoleRingProxy);
            self.regProxy(ProxyType.KillBoss, KillBossProxy);
            self.regProxy(ProxyType.Yjjs, YjjsProxy);
            self.regProxy(ProxyType.ExchangeShop, ExchangeShopProxy);
            self.regProxy(ProxyType.GivingShenLing, GivingShenLingProxy);
            self.regProxy(ProxyType.PrerogativeWrit, PrerogativeWritProxy);
            self.regProxy(ProxyType.WonderfulAct, WonderfulActProxy);
            self.regProxy(ProxyType.Yhcs, YhcsProxy);
            self.regProxy(ProxyType.XianlvGift, XianlvGiftProxy);
            self.regProxy(ProxyType.SummonTreasure, SummonTreasureProxy);
            self.regProxy(ProxyType.Chengshen, ChengshenProxy);
            self.regProxy(ProxyType.MeiriTehui, MeiriTehuiProxy);
            self.regProxy(ProxyType.SupremeGit, SupremeGitProxy);//至尊礼包
            self.regProxy(ProxyType.Tongtiange, TongtiangeProxy);
            self.regProxy(ProxyType.PunshList, PunshListProxy);
            self.regProxy(ProxyType.FlyRank, FlyRankProxy);
            self.regProxy(ProxyType.TehuiLibao, TehuiLibaoProxy);
            self.regProxy(ProxyType.ShenlingGift, ShenlingGiftProxy);
            self.regProxy(ProxyType.Xianchi, XianchiProxy);
            self.regProxy(ProxyType.FeishengLibao, FeishengLibaoProxy);
            self.regProxy(ProxyType.Caiyunbang, CaiyunbangProxy);
            self.regProxy(ProxyType.Carnival, CarnivalProxy);
            self.regProxy(ProxyType.Fuchenlinghu, FuchenlinghuProxy);
            self.regProxy(ProxyType.Jiuyou, JiuyouProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;

            /**左上角活动列表*/
            self.regMdr(MainActivityViewType.MainActivityList, MainLeftActTopMdr);

            /**左中活动列表*/
            self.regMdr(MainActivityViewType.MainLeftAct, MainLeftActMidMdr);

            /**战力转盘 */
            self.regMdr(MainActivityViewType.Lottery, LottertMainMdr);

            /**召唤系统 */
            self.regMdr(MainActivityViewType.SummonMain, SummonMainMdr);//主界面
            self.regMdr(MainActivityViewType.SummonGift, SummonGiftMdr);//命运豪礼界面
            self.regMdr(MainActivityViewType.SummonRank, SummonRankMainMdr);//排行榜界面
            self.regMdr(MainActivityViewType.SummonRankTips, SummonRankSectionMdr);//排行榜查看排名界面
            self.regMdr(MainActivityViewType.SummonRankGods, SummonRankGodMdr);//风云录界面
            self.regMdr(MainActivityViewType.SummonExchange, SummonExchangeMainMdr);//礼券兑换界面
            self.regMdr(MainActivityViewType.SummonEffect, SummonEffectMdr);//抽奖界面
            self.regMdr(MainActivityViewType.SummonTreasureBox, SummonTreasureBoxMdr);//宝藏
            self.regMdr(MainActivityViewType.SummonTreasureTips, SummonTreasureTipsMdr);//宝藏

            /**签到有礼*/
            self.regMdr(MainActivityViewType.SignGift, SignGiftMdr);

            /**送100召唤卷，战令 */
            self.regMdr(MainActivityViewType.Giving, GivingMainMdr);//送召唤卷主界面
            self.regMdr(MainActivityViewType.GameOrderUnlock, GameOrderUnlockMdr);//送召唤卷解锁界面（战令解锁界面）

            /**招财仙*/
            self.regMdr(MainActivityViewType.ZcxMain, ZcxMainMdr);
            self.regMdr(MainActivityViewType.ZcxWinnerList, ZcxWinnerListMdr);
            self.regMdr(MainActivityViewType.ZcxBuyTips, ZcxBuyTipsMdr);
            self.regMdr(MainActivityViewType.ZcxFuli, ZcxFuliMdr);
            self.regMdr(MainActivityViewType.ZcxUnlock, ZcxUnlockMdr);

            /**主角光环*/
            self.regMdr(MainActivityViewType.RoleRingMain, RoleRingMainMdr);
            self.regMdr(MainActivityViewType.RoleRingUp, RoleRingUpMdr);
            self.regMdr(MainActivityViewType.RoleRingReward, RoleRingRewardMdr);

            /**0元购 */
            self.regMdr(MainActivityViewType.ZeroBuy, ZeroBuyMainMdr);

            /**首充豪礼 */
            self.regMdr(MainActivityViewType.FirstCharge, FirstMdr);

            /**斩妖福利 */
            self.regMdr(MainActivityViewType.KillBoss, KillBossMainMdr);
            /**瑶姬降世*/
            self.regMdr(MainActivityViewType.YjjsFirstMain, YjjsFirstMainMdr);
            self.regMdr(MainActivityViewType.YjjsMain, YjjsMainMdr);

            /**兑换商城 */
            self.regMdr(MainActivityViewType.ExchangeShop, ExchangeShopMainMdr);
            self.regMdr(MainActivityViewType.ExchangeShopTips, ExchangeShopBuyTipsMdr);

            /**赠送瑶姬 */
            self.regMdr(MainActivityViewType.GivingShenLing, GivingShenLingMainMdr);
            /**精彩活动*/
            self.regMdr(MainActivityViewType.WonderfulAct, WonderfulActMainMdr);
            self.regMdr(MainActivityViewType.WonderfulActReward, WonderfulActRewardMdr);

            /**浴火重生 */
            self.regMdr(MainActivityViewType.Yhcs, YhcsMainMdr);

            self.regMdr(MainActivityViewType.XianlvGift, XianlvGiftMdr);

            /**成神在即*/
            self.regMdr(MainActivityViewType.ChengshenMain, ChengshenMainMdr);
            self.regMdr(MainActivityViewType.ChengshenJiban, ChengshenJibanMdr);
            self.regMdr(MainActivityViewType.ChengshenTask, ChengshenTaskMdr);
            self.regMdr(MainActivityViewType.MeiriTehui, MeiriTehuiMdr);
            /**至尊礼包*/
            self.regMdr(MainActivityViewType.SupremeGitMain, SupremeGitMainMdr);

            /**通天阁*/
            self.regMdr(MainActivityViewType.TongtiangeMain, TongtiangeMainMdr);
            self.regMdr(MainActivityViewType.TongtiangeRank, TongtiangeRankMainMdr);
            self.regMdr(MainActivityViewType.TongtiangeRankSection, TongtiangeRankSectionMdr);
            self.regMdr(MainActivityViewType.TongtiangeLastRank, TongtiangeLastRankMdr);

            /**通用奖励预览*/
            self.regMdr(MainActivityViewType.BasePreviewReward, BasePreviewRewardMdr);

            /**新服冲榜 */
            self.regMdr(MainActivityViewType.PunshList, PunshListMainMdr);
            self.regMdr(MainActivityViewType.PunshListRankSection, PunshListRankSectionMdr);

            /**通用中控活动主界面*/
            self.regMdr(MainActivityViewType.ActMain, ActMainMdr);

            self.regMdr(MainActivityViewType.FlyRankSection, FlyRankSectionMdr);
            self.regMdr(MainActivityViewType.FlyWarUnlock, FlyWarUnlockMdr);

            /**神灵天赋礼包*/
            self.regMdr(MainActivityViewType.ShenlingGift, ShenlingGiftMdr);

            /**特惠礼包 */
            self.regMdr(MainActivityViewType.TehuiLibao, TehuiLibaoMdr);

            /**仙池大奖 */
            self.regMdr(MainActivityViewType.XianchiReward, XianchiRewardMdr);

            /**超值礼包*/
            self.regMdr(MainActivityViewType.ChaozhiLibao, ChaozhiLibaoMdr);
            /**飞升礼包*/
            self.regMdr(MainActivityViewType.FeishengLibao, FeishengLibaoMdr);
            /**天女赐福奖励*/
            self.regMdr(MainActivityViewType.TiannvWelfareReward, TiannvWelfareRewardMdr);
            /**财运榜*/
            self.regMdr(MainActivityViewType.CaiyunbangRankSection, CaiyunbangRankSectionMdr);

            /**狂欢庆典*/
            self.regMdr(MainActivityViewType.CarnivalMibaoReward, CarnivalMibaoRewardMdr);
            self.regMdr(MainActivityViewType.CarnivalRankSection, CarnivalRankSectionMdr);

            //浮尘灵壶
            self.regMdr(MainActivityViewType.FuchenlinghuRefresh, FuchenlinghuRefreshMdr);
            self.regMdr(MainActivityViewType.FuchenlinghuWish, FuchenlinghuWishMdr);
            self.regMdr(MainActivityViewType.FuchenlinghuXianling, FuchenlinghuXianlingMdr);
        }
    }

    gso.modCls.push(ActivityMod);
}