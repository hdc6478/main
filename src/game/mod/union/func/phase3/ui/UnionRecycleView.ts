namespace game.mod.union {

    export class UnionRecycleView extends eui.Component {

        list_item: eui.List;
        selectItem1: UnionSelectComponent;
        selectItem2: UnionSelectComponent;
        btn_recycle: Btn;
        btn_select: Btn;
        lab_tips: eui.Label;
        lab: eui.Label;
        progress: ProgressBarComp;
        scr: eui.Scroller;
        btn_reward: Btn;

        constructor() {
            super();
            this.skinName = "skins.union.UnionRecycleSkin";
        }
    }

}