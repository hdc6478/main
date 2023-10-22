namespace game.mod.god {

    export class GodHauntedDetailView extends eui.Component {

        public lab_desc: eui.Label;
        public list_reward: eui.List;

        public cost: game.mod.CostIcon;
        public lab_tip: eui.Label;
        public btn_get: game.mod.Btn;
        public grp_power: eui.Group;
        public grp_desc: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.god.GodHauntedDetailSkin";
        }

    }
}