namespace game.mod.pass {

    export class WorldMapBtnItem extends mod.Btn {

        public img_bg: eui.Image;
        public lab_title: eui.Label;
        public lab_idx: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapBtnItemSkin";
        }
        
        public set isSelect(value: boolean) {
            this.img_bg.source = value ? "rank_title_bg2" : "rank_title_bg1";
        }

    }
}