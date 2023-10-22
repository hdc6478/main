namespace game.mod.union {

    export class UnionKillTipsView extends eui.Component {

        public btn: Btn;
        public list: eui.List;
        public list_summon: eui.List;
        public list_kill: eui.List;
        public grp_eff: eui.Group;
        public costIcon: CostIcon;
        public nameItem: AvatarNameItem;
        public lab_limit: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.union.UnionKillTipsSkin";
        }
    }

}