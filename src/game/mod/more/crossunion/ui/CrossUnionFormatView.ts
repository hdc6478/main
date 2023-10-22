namespace game.mod.more {

    export class CrossUnionFormatView extends eui.Component {

        list: eui.List;
        list_type: eui.List;
        secondPop: SecondPop;
        lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionFormatSkin";
        }
    }

}