namespace game.mod.activity {

    export class MeiriTehuiModel {
        //剩余天数:0.表示还未购买
        public day: number = 0;

        public list: { [index: number]: msg.daily_tehui_reward } = {};

        public hintPath: string[] = [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.MeiriTehui];
    }

}