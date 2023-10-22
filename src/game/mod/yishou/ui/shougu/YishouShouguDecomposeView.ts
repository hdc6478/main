namespace game.mod.yishou {

    export class YishouShouguDecomposeView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scroller: eui.Scroller;
        public list: eui.List;
        public btn_decompose: game.mod.Btn;
        public list_type: eui.List;
        public checkBox0: eui.CheckBox;
        public checkBox1: eui.CheckBox;
        public checkBox2: eui.CheckBox;
        public checkBox3: eui.CheckBox;
        public checkBox4: eui.CheckBox;

        public gr_lb: eui.Group;
        public lb_decompose: eui.Label;
        public img_decompose: eui.Image;
        public lb_decomposeNum: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouShouguDecomposeSkin";
        }
    }
}