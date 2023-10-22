namespace game.mod.yishou {

    export class YishouShouguView extends eui.Component {
        public power2: game.mod.Power2;
        public equipListComp: game.mod.yishou.YishouShouguEquipListComp;
        public btn_jinjie: game.mod.Btn;
        public btn_onekey: game.mod.Btn;
        public btn_compose: game.mod.Btn;
        public btn_bag: game.mod.Btn;
        public btn_decompose: game.mod.Btn;
        public iconListComp: game.mod.yishou.YishouTypeIconListComp;
        public skillComp: game.mod.yishou.YishouShouguSkillComp;
        public img_icon: eui.Image;
        public gr_jinjie: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguSkin";
        }
    }
}