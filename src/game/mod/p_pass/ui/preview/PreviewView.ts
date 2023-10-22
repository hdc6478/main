namespace game.mod.pass {

    export class PreviewView extends eui.Component {

        public list: eui.List;
        public list_rewards: eui.List;
        public btn_get: Btn;
        public btn_jump: Btn;
        public btn_lock: Btn;
        public img_state: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.pass.PreviewSkin";
        }
    }

}