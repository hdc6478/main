namespace game.mod.more {

    export class HunkaTypeView extends eui.Component {
        public hunkaScore: HunkaScore;
        public btn_rule: Btn;
        public item0: HunkaPosItem;
        public item1: HunkaPosItem;
        public item2: HunkaPosItem;
        public item3: HunkaPosItem;
        public item4: HunkaPosItem;
        public item5: HunkaPosItem;
        public item6: HunkaPosItem;
        public item: HunkaScoreItem;
        public btn_gongming: Btn;
        public btn_oneKey: GiftBtn;
        

        constructor() {
            super();
            this.skinName = "skins.more.HunkaTypeSkin";
        }
    }

}