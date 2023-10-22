namespace game.mod.god {

    export class GodHauntedView extends eui.Component {
        public list: eui.List;
        public list_attr: eui.List;
        public bar: CommonProgressBar;

        constructor() {
            super();
            this.skinName = "skins.god.GodHauntedSkin";
        }
    }

}