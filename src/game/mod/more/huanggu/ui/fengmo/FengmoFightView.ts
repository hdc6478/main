namespace game.mod.more {

    export class FengmoFightView extends eui.Component {
        public list: eui.List;
        public progress: ProgressBarComp;
        public lab_name: eui.Label;
        public lab_maxhurt: eui.Label;
        public lab_hurt: eui.Label;
        public countItem: CountItem;
        public btn_saodang: Btn;
        public btn_fight: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.FengmosFightSkin";
        }
    }

}