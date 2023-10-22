namespace game.mod.role {

    //套装类型 3,4,5 的 进阶、精铸皮肤
    export class SuitView2 extends eui.Component {
        public iconList: game.mod.role.SuitIconList;
        public power: game.mod.Power2;
        public btn_do: game.mod.Btn;
        public btn_reward: game.mod.Btn;
        public gr_eff: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.role.SuitSkin2";
        }
    }
}