namespace game.mod {

    export class SurfaceView extends eui.Component {
        public grp_eff: eui.Group;
        public power2: game.mod.Power2;
        public grp_lv: eui.Group;
        public name_item: AvatarNameItem;
        public btn_gift: game.mod.Btn;
        public btn_jiban: game.mod.Btn;
        public item_skill: BattleSkillItemRender;
        public list_skill: eui.List;
        public list_item: eui.List;
        public bar: game.mod.ProgressBarComp;
        public cost: game.mod.CostIcon;
        public btn_up: game.mod.Btn;
        public btn_onekey: game.mod.Btn;
        public img_max: eui.Image;
        public special_attr: game.mod.SpecialAttrView;
        public btn_huan:game.mod.TabSecondItem;
        public btn_zhanshendian: game.mod.Btn;
        public btn_god: game.mod.Btn;
        public btn_act:Btn;
        public lab_time:eui.Label;
        public grp_act:eui.Group;

        public btn_flyRank:Btn;
        public lab_flyRank:eui.Label;
        public grp_flyRank:eui.Group;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceSkin";
        }
    }

}