namespace game.mod.activity {

    import chengshen_reward = msg.chengshen_reward;

    export class ChengshenModel {
        public type: number;
        public list: chengshen_reward[];
        public hintType: string[] = [ModName.Activity, MainActivityViewType.ChengshenMain, MdrTabBtnType.TabBtnType01];
    }
}
