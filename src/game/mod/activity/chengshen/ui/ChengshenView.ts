namespace game.mod.activity {

    export class ChengshenView extends eui.Component {
        public timeItem: TimeItem;
        public item0: AvatarNameSrItem;
        public item1: AvatarNameSrItem;
        public btn_jiban: Btn;
        public btn_type1: Btn;
        public btn_type2: Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.ChengshenSkin";
        }
    }

}