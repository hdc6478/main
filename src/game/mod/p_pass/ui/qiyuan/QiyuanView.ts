namespace game.mod.pass {

    export class QiyuanView extends eui.Component {

        public scr: eui.Scroller;
        public check: eui.CheckBox;
        public list_item:eui.List;

        constructor() {
            super();
            this.skinName = "skins.pass.QiyuanSkin";
        }
        
    }

}