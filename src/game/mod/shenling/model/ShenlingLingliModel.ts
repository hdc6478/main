namespace game.mod.shenling {

    export class ShenlingLingliModel {
        public all_datas: { [type: number]: GodBrotherLingliDatas } = {};

        public hintPath: string[] = [ModName.Shenling, ShenLingViewType.ShenLingMain + ShenLingBtnType.Lingli];
    }

    //改造 god_brother_lingli_datas 结构体
    export class GodBrotherLingliDatas {
        itype: ShenLingType;
        skill_data: { [index: number]: msg.god_brother_lingli_struct } = {};
    }

}