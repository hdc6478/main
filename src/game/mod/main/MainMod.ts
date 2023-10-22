namespace game.mod.main {

    export class MainMod extends ModBase {

        constructor() {
            super(ModName.Main);
        }

        protected initCmd(): void {
        }

        protected initModel(): void {
            this.regProxy(ProxyType.Main, MainProxy);
        }

        protected initView(): void {

            /**主界面右边*/
            this.regMdr(MainViewType.MainRight, MainRightMdr);
            /**主界面顶部*/
            this.regMdr(MainViewType.MainTop, MainTopMdr);
            /**主界面 左上和左中*/
            this.regMdr(MainViewType.MainLeft, MainLeftMdr);
            /**主界面 底部*/
            this.regMdr(MainViewType.MainBottom, MainBottomMdr);
            this.regMdr(MainViewType.MainMenu, MainMenuMdr);

            /**挂机 收益*/
            this.regMdr(MainViewType.OffLineGain, OfflineGain3Mdr);

            this.regMdr(MainViewType.gmWin, gmMdr);

            /**以下为新的*/
            this.regMdr(MainViewType.PowerChange, PowerChangeMdr);
            this.regMdr(MainViewType.SuccessTips, SuccessTipsMdr);
            this.regMdr(MainViewType.BaseAttrTips, BaseAttrMdr);
            this.regMdr(MainViewType.BaseRewardTips, BaseRewardMdr);
            this.regMdr(MainViewType.BaseRuleDesc, BaseRuleDescMdr);
            this.regMdr(MainViewType.Alert, AlertMdr);
            this.regMdr(MainViewType.BoxReward, BoxRewardMdr);
            this.regMdr(MainViewType.BuyTimes, BuyTimesMdr);
            this.regMdr(MainViewType.Stronger, StrongerMdr);//我要变强
            this.regMdr(MainViewType.RewardFindMain, RewardFindMainMdr);//资源找回
            this.regMdr(MainViewType.Preview, MainPreviewItemMdr);//功能预览
            this.regMdr(MainViewType.BreakthroughTips, BreakthroughTipsMdr);//突破成功
            this.regMdr(MainViewType.BreakthroughTips2, BreakthroughTipsMdr2);//突破成功
            this.regMdr(MainViewType.UpStarTips, UpStarTipsMdr);//升星成功
            this.regMdr(MainViewType.UpStarTips2, UpStarTipsMdr2);//升星成功
        }
    }

    gso.modCls.push(MainMod);
}
