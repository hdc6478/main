namespace game.mod.activity {

    export class YhcsView extends eui.Component {


        public list: eui.List;
        public lab_tips: eui.Label;
        public btn_recharge: Btn;


        constructor() {
            super();
            this.skinName = "skins.activity.YhcsSkin";
        }
    }

}