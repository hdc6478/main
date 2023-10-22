namespace game.mod.main {


    export class MainLeftBtnView extends BaseRenderer {
        public btn_whole: Btn;
        public img_hongdian: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.main.MainLeftBtnSkin";
        }

        protected dataChanged(): void {
            super.dataChanged();
            // let d = this.data as ActBtnData;
            // if (this._eftId) {
            //     this.removeEffect(this._eftId);
            //     this._eftId = null;
            // }
            // if (d == null) {
            //     return;
            // }
            // this.btn_whole.img_bg.source = ResUtil.getUiBtnIconUrl(d.icon);
            // this.img_hongdian.visible = d.showHint == true;
            // let actProxy: IActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            //
            //
            // if ((d.icon == ActBtnIcon.FirstCharge || d.icon == ActBtnIcon.ZeroBuyGiftBag || d.icon == ActBtnIcon.FirstShare)
            //     || (d.icon == ActBtnIcon.DirectBuyGift && !actProxy.isDBOpened)
            //     || (d.icon == ActBtnIcon.DailyCharge && !actProxy.isDCOpened)
            //     || (d.openAct && d.openAct.type == ActivityType.CtrlDirectBuyGift && !actProxy.isCDBOpened)
            //     || (LimitBuyList.indexOf(d.icon) != -1 && !actProxy.isLBGOpened[d.icon.replace("lbg", "")])
            //     || (d.icon == ActBtnIcon.Seckill && d.param)
            //     || (d.icon == ActBtnIcon.VipGift && d.param)
            //     || (d.icon == ActBtnIcon.TenFestival)
            //     || (d.icon == ActBtnIcon.MoonFestival)
            //     || (d.icon == ActBtnIcon.MoonFestival3)
            //     || (d.icon == ActBtnIcon.WeekTask)
            //     || (d.icon == ActBtnIcon.NewYearOneYuanGift)) {
            //     this.addBtnEft();
            // }
        }

        private addBtnEft() {
            let x = this.width >> 1;
            let y = this.height >> 1;
            let target = this.btn_whole;
            //this.addEftByParent(UIEftSrc.BtnFirstCharge, x, y, target.scaleGroup, 1);
        }
    }
}