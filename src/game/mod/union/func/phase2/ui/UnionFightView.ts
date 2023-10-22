namespace game.mod.union {

    export class UnionFightView extends eui.Component {
        public lab_name1: eui.Label;
        public powerLabel1: game.mod.PowerLabel;
        public img_hp1: eui.Image;
        public head1: game.mod.Head;

        public lab_name2: eui.Label;
        public powerLabel2: game.mod.PowerLabel;
        public img_hp2: eui.Image;
        public head2: game.mod.Head;

        constructor() {
            super();
            this.skinName = "skins.union.UnionFightSkin";
        }
    }

}