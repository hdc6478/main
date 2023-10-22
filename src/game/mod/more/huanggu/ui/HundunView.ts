namespace game.mod.more {

    export class HundunView extends eui.Component {
        public btn_fengmo: Btn;
        public btn_crossunion: Btn;
        public btn_xianmai: game.mod.more.HundunBtnItem;
        public btn_xuanyuanmen: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.more.HundunSkin";
        }
    }

}