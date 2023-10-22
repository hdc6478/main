namespace game.mod.more {

    export class HuashenTianfuView extends eui.Component {
        public lab_lv: eui.Label;
        public lab_desc: eui.Label;
        public lab_nextLv: eui.Label;
        public lab_nextDesc: eui.Label;
        public lab_limit: eui.Label;
        public img_max: eui.Image;
        public img_max2: eui.Image;
        public item1: HuashenTianfuItem;
        public item2: HuashenTianfuItem;
        public item3: HuashenTianfuItem;
        public item4: HuashenTianfuItem;
        public item5: HuashenTianfuItem;
        public item6: HuashenTianfuItem;
        public item7: HuashenTianfuItem;
        public cost: game.mod.CostIcon;
        public btn_up: game.mod.Btn;
        public list_type: eui.List;

        constructor() {
            super();
            this.skinName = "skins.more.HuashenTianfuSkin";
        }
    }

}