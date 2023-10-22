namespace game.mod.xianyuan {

    export class XianlvDoufaTipsView extends eui.Component {

        lab_score: eui.Label;
        grp_font: eui.Group;
        closeTips: CloseTips;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvDoufaTipsSkin";
        }
    }
}