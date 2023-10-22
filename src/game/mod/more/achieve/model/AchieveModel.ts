namespace game.mod.more {

    export class AchieveModel {
        public lv: number = 1;
        public status: number = 0;//已领取状态，2
        public hintType: string[] = [ModName.More, MoreViewType.AchieveMain, AchieveMainBtnType.Achieve];
    }
}