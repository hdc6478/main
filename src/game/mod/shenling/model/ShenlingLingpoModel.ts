namespace game.mod.shenling {

    export class ShenlingLingpoModel {
        /** 各灵魄数据 */
        public all_datas: { [id: number]: msg.god_brother_lingpo_datas } = {};

        public hintPath: string[] = [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingpo];
    }

}