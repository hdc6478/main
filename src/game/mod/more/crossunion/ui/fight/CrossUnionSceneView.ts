namespace game.mod.more {

    export class CrossUnionSceneView extends eui.Component {

        grp_target: CrossUnionBeastItem;
        grp_own: CrossUnionBeastItem;

        role_1: CrossUnionRole;
        role_2: CrossUnionRole;
        role_3: CrossUnionRole;
        role_4: CrossUnionRole;
        role_5: CrossUnionRole;
        role_6: CrossUnionRole;
        role_7: CrossUnionRole;
        role_8: CrossUnionRole;

        item_1: CrossUnionSetTeamItem;
        item_2: CrossUnionSetTeamItem;

        lab_tips: eui.Label;
        list: eui.List;

        icon: Icon;
        lab_cnt: eui.Label;
        img_got: eui.Image;
        lab_info: eui.Label;

        btn_exit: Btn;

        constructor() {
            super();
            this.skinName = "skins.more.CrossUnionSceneSkin";
        }
    }

}