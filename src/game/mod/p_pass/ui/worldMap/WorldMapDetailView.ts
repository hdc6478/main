namespace game.mod.pass {

    export class WorldMapDetailView extends eui.Component {

        public secondPop: game.mod.SecondPop;

        public lab_chapter_name: eui.Label;
        public lab_step: eui.Label;

        public grp_role1: eui.Group;
        public grp_role2: eui.Group;
        public grp_role3: eui.Group;

        public head1: game.mod.Head;
        public head2: game.mod.Head;
        public head3: game.mod.Head;

        public lab_role_name1: eui.Label;
        public lab_role_name2: eui.Label;
        public lab_role_name3: eui.Label;

        public lab_desc: eui.Label;

        public cost1: game.mod.CostIcon;
        public cost2: game.mod.CostIcon;
        public cost3: game.mod.CostIcon;
        
        public img_no_qy: eui.Image;
        public img_no_awd: eui.Image;
        public list_qiyuan:eui.List;
        public list_reward0:eui.List;
        public list_reward:eui.List;
        public lab_open_tip: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.pass.WorldMapDetailSkin";
        }

    }
}