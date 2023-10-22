namespace game.mod.activity {

    import prerogative_writ_infos = msg.prerogative_writ_infos;

    export class PrerogativeWritModel {
        /**特权令信息，存在代表已购买*/
        public info: { [type: number]: prerogative_writ_infos } = {};

        public hintPath: string[] = [ModName.Activity, MainActivityViewType.RoleRingMain, MdrTabBtnType.TabBtnType02];
    }

}