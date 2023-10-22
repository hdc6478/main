namespace game.mod.surface {


    export class XianjianChooseView extends eui.Component {
        public list: eui.List;
        public secondPop: SecondPop;
        public grp_eff: eui.Group;
        public btn_shangzhen: Btn;
        public name_item: AvatarNameItem;
        public suit_item: XianjianSkillSuitComp;
        public power: Power;

        constructor() {
            super();
            this.skinName = "skins.surface.XianjianChooseSkin";
        }
    }

}