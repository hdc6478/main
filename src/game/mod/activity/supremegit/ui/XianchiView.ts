namespace game.mod.activity {
    export class XianchiView extends eui.Component {
        public btn_rule: Btn;
        public btn_reward: Btn;
        public btn_big: Btn;
        public item1: XianchiItem;
        public item2: XianchiItem;
        public item3: XianchiItem;
        public item4: XianchiItem;
        public item5: XianchiItem;
        public item6: XianchiItem;
        public item7: XianchiItem;
        public item8: XianchiItem;
        public item9: XianchiItem;
        public cost: CostIcon;
        public btn_draw: Btn;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.activity.XianchiSkin";
        }
    }
}