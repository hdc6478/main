namespace game.mod.daily {

    export class DailyLimitTimeActModel {
        /**红点path*/
        public hintPath: string[] = [ModName.Daily, DailyViewType.DailyMain + DailyMainBtnType.BtnLimitTimeAct];
        /**红点记录，点击过一次消失*/
        public clickHint: number[] = [];
        /**开启的活动index*/
        public indexs: number[] = [];
        /**开启的活动类型*/
        public types: number[] = [];
    }

}