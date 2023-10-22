namespace game.mod.shenling {

    export class ShenLingLingQiModel {
        /** 各神灵灵器数据 */
        public all_datas: { [index: number]: msg.god_brother_lingqi_datas } = {};

        public hintPath: string[] = [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingqi];
    }

}