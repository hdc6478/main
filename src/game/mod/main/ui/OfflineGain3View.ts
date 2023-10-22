namespace game.mod.main {

    export class OfflineGain3View extends eui.Component {
        public grp_item: eui.Group;
        public item0: eui.Component;
        public item1: eui.Component;
        public item2: eui.Component;
        public item3: eui.Component;
        public item4: eui.Component;
        public btn_vip:game.mod.Btn;
        public lab_vip_status:eui.Label;
        public lab_time:eui.Label;
        public list_award:eui.List;
        public lab_speed_up:eui.Label;
        public btn_speed_up:game.mod.Btn;
        public lab_count:eui.Label;
        public img_cost:eui.Image;
        public lab_cost:eui.Label;
        public btn_get:game.mod.Btn;
        public btn_close:game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.main.OffLineGain3Skin";
        }
    }

}