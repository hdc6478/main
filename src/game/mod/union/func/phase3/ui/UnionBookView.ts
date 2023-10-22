namespace game.mod.union {

    export class UnionBookView extends eui.Component {

        list: eui.List;
        grp_eff: eui.Group;
        nameItem: AvatarNameItem;
        power: Power2;
        bookItem: UnionBookSkillView;
        img_max: eui.Image;
        icon: Icon;
        btn_up: Btn;
        lab_limit: eui.Label;

        node_1: eui.Image;
        node_2: eui.Image;
        node_3: eui.Image;
        node_4: eui.Image;
        node_5: eui.Image;
        node_6: eui.Image;
        node_7: eui.Image;
        node_8: eui.Image;
        node_9: eui.Image;
        node_10: eui.Image;

        line_2: eui.Image;
        line_3: eui.Image;
        line_4: eui.Image;
        line_5: eui.Image;
        line_6: eui.Image;
        line_7: eui.Image;
        line_8: eui.Image;
        line_9: eui.Image;
        line_10: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.union.UnionBookSkin";
        }
    }

}