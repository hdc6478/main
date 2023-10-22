namespace game.mod.activity {

    export class PunshListView extends eui.Component {
        public grp_progress: eui.Group;
        public progress_bg: eui.Image;
        public progress: eui.Image;
        public lab_score: eui.Label;

        // public btn: Btn;
        public btn_1: Btn;
        public btn_2: Btn;
        public btn_3: Btn;
        public btn_4: Btn;

        public src_task: eui.Scroller;

        public list_task: eui.List;
        public list: eui.List;
        public timeItem: TimeItem;

        constructor() {
            super();
            this.skinName = "skins.activity.PunshListSkin";
        }

    }

}