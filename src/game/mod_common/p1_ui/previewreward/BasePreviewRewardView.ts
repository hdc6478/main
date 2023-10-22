namespace game.mod {

    export class BasePreviewRewardView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scroller: eui.Scroller;
        public list_item: eui.List;

        constructor() {
            super();
            this.skinName = "skins.activity.RoleRingRewardSkin";
        }
    }

}