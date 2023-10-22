namespace game.mod.xianlu {

    export class LinggenView extends eui.Component {
        public lab_lv: eui.Label;
        public lab_desc: eui.Label;
        public lab_nextLv: eui.Label;
        public lab_nextDesc: eui.Label;
        public lab_limit: eui.Label;
        public img_max: eui.Image;
        public img_max2: eui.Image;

        public m_left:eui.Image;
        public m_right:eui.Image;
        public item1:game.mod.xianlu.LinggenItemRender;
        public itemGroup:eui.Group;

        // public item1: LinggenItemRender;
        // public item2: LinggenItemRender;
        // public item3: LinggenItemRender;
        // public item4: LinggenItemRender;
        // public item5: LinggenItemRender;
        // public item6: LinggenItemRender;
        // public item7: LinggenItemRender;

        public cost: game.mod.CostIcon;
        public btn_up: game.mod.Btn;
        public list_type: eui.List;
        
        constructor() {
            super();
            this.skinName = "skins.xianlu.LinggenSkin";
        }
    }

}