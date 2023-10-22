namespace game.mod.compete {

    export class DoufaTopRankView extends eui.Component {
        public grp_eff: eui.Group;
        public grp_first: eui.Group;
        public grp_title: eui.Group;
        public timeItem: game.mod.TimeItem;
        public lab_name: eui.Label;
        public list_rank:eui.List;
        public lab_tips: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.compete.DoufaTopRankSkin";
        }
    }
}
