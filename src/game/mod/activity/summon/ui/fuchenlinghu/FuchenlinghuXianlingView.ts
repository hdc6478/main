namespace game.mod.activity {

    export class FuchenlinghuXianlingView extends eui.Component {
        public costIcon: game.mod.CostIcon;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public icon2: game.mod.Icon;
        public icon3: game.mod.Icon;
        public icon4: game.mod.Icon;
        public icon5: game.mod.Icon;
        public gr_eff: eui.Group;
        public rect: eui.Rect;
        public btn_refresh: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.activity.FuchenlinghuXianlingSkin";
        }
    }
}