namespace game.mod.more {

    export class CrossUnionRewardView extends eui.Component {

        list_win: eui.List;
        list_lose: eui.List;
        list_look: eui.List;

        lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionRewardSkin";
        }
    }

}