namespace game.mod.more {

    /**ÉñÆ÷ */
    export class ArtifactView extends eui.Component {

        public btn_onekey: Btn;
        public power2: Power2;
        public btn_suit: ArtifactIconBtn;
        public item_1: ArtifactBuweiItem;
        public item_2: ArtifactBuweiItem;
        public item_3: ArtifactBuweiItem;
        public item_4: ArtifactBuweiItem;
        public list_skill: eui.List;
        public name_item: AvatarNameSrItem;
        public list_item: eui.List;
        public img_name: eui.Image;

        // public btn_up: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.ArtifactSkin";
        }
    }

}