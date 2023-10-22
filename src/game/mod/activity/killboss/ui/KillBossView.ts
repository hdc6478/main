namespace game.mod.activity {

    export class KillBossView extends eui.Component {

        public list_boss: eui.List;
        public list_server: eui.List;
        public list_person: eui.List;
        public list_last: eui.List;

        img_bg:eui.Image;
        img_kill:eui.Image;
        lab:eui.Label;

        img_get1:eui.Image;
        img_get2:eui.Image;
        img_get3:eui.Image;

        btn1:Btn;
        btn2:Btn;
        btn3:Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.KillBossSkin";
        }
    }

}