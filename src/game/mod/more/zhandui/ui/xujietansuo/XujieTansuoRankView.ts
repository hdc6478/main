namespace game.mod.more {

    export class XujieTansuoRankView extends eui.Component {
        public img_type1: eui.Image;
        public img_type2: eui.Image;
        public lab_rank: eui.Label;
        public lab_num: eui.Label;
        public list_rank: eui.List;
        public rankItem0: game.mod.more.XujieTansuoRankItem2;
        public rankItem2: game.mod.more.XujieTansuoRankItem2;
        public rankItem1: game.mod.more.XujieTansuoRankItem2;

        constructor() {
            super();
            this.skinName = "skins.more.XujieTansuoRankSkin";
        }
    }
}