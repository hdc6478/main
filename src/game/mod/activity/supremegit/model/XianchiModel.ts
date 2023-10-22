namespace game.mod.activity {

    import xian_chi_qi_yuan_struct = msg.xian_chi_qi_yuan_struct;

    export class XianchiModel {
        public layer: number;//大奖层数
        public rewards: xian_chi_qi_yuan_struct[];
        public hintType: string[] = [ModName.Activity, MainActivityViewType.ChaozhiLibao, MainActivityViewType.SupremeGitMain, MdrTabBtnType.TabBtnType02];
    }
}