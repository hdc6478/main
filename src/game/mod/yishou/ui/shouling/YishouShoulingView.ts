namespace game.mod.yishou {

    export class YishouShoulingView extends eui.Component {
        public power2: game.mod.Power2;
        public specialAttrView: game.mod.SpecialAttrView;
        public icon0: game.mod.yishou.YishouShoulingEquipIcon;
        public icon1: game.mod.yishou.YishouShoulingEquipIcon;
        public icon2: game.mod.yishou.YishouShoulingEquipIcon;
        public icon3: game.mod.yishou.YishouShoulingEquipIcon;
        public scroller: eui.Scroller;
        public list: eui.List;
        public skillComp: game.mod.yishou.YishouShoulingSkillComp;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShoulingSkin";
        }
    }
}