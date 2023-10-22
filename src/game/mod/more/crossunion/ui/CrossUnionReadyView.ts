namespace game.mod.more {

    export class CrossUnionReadyView extends eui.Component {

        list_reward: eui.List;
        timeItem: TimeItem;
        btn: Btn;
        img_end: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionReadySkin";
        }
    }

}