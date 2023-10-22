namespace game.mod.more {

    export class CrossUnionView extends eui.Component {

        list_item: eui.List;
        timeItem: TimeItem;
        btn: Btn;
        btn_reward: Btn;
        btn_formation: Btn;
        btn_tips: Btn;
        btn_explain: Btn;
        scroller: eui.Scroller;

        item_1: CrossUnionSetTeamItem;
        item_2: CrossUnionSetTeamItem;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionSkin";
        }
    }

}