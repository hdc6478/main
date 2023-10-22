namespace game.mod.union {


    export class UnionWageView extends eui.Component {

        public secondPop: SecondPop;
        public btn: Btn;
        public list: eui.List;
        public img_get: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionWageSkin";
        }
    }

}