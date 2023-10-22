namespace game.mod.surface {

    export class SurfaceBaseView extends eui.Component {
        public grp_horse: eui.Group;
        public grp_eff1: eui.Group;
        public redPoint1: eui.Image;
        public btn_horse: game.mod.Btn;
        public img_tag1:eui.Image;

        public grp_tianshen: eui.Group;
        public grp_eff2: eui.Group;
        public redPoint2: eui.Image;
        public btn_tianshen: game.mod.Btn;

        public grp_lingchong: eui.Group;
        public grp_eff3: eui.Group;
        public redPoint3: eui.Image;
        public btn_lingchong: game.mod.Btn;
        public img_tag3:eui.Image;

        public grp_xianjian: eui.Group;
        public grp_eff4: eui.Group;
        public redPoint4: eui.Image;
        public btn_xianjian: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.surface.SurfaceBaseSkin";
        }
    }

}