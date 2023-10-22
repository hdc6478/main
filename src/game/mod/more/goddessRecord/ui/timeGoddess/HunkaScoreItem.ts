namespace game.mod.more {

    import facade = base.facade;

    export class HunkaScoreItem extends eui.ItemRenderer {

        private img_lv: eui.Image;
        private bar: ProgressBarComp;

        public data: {type: number, totalScore?: number};//魂卡类型，总积分

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let type = this.data.type;
            let totalScore = this.data.totalScore;

            let _proxy: GoddessRecordProxy = facade.retMod(ModName.More).retProxy(ProxyType.GoddessRecord);
            let lv = _proxy.getHunkaLv(type);
            let lvStr = "hunka_score" + lv;
            this.img_lv.source = lvStr;

            if(totalScore == undefined){
                totalScore = _proxy.getHunkaTotalScore(type);
            }
            let needScore = _proxy.getHunkaNeedScore(type, lv);
            this.bar.show(totalScore, needScore, false, 0, false, ProgressBarType.Percent);
        }

        public setData(type: number, totalScore?: number): void {
            this.data = {type: type, totalScore: totalScore};
        }
    }

}