namespace game.mod.xianlu {

    export class XiuxianPreviewView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public grp_lv: eui.Group;
        public grp_nextLv: eui.Group;
        public list_item1: eui.List;
        public list_item2: eui.List;
        public item1: XiuxianXianpoRender;
        public item2: XiuxianXianpoRender;
        public lab_reward: eui.Label;
        public list_reward: eui.List;
        public img_draw: eui.Image;
        public btn_draw: game.mod.Btn;
        public btn_vip: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianlu.XiuxianPreviewSkin";
        }
    }

}