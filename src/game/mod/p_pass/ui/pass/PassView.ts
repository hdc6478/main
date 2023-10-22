namespace game.mod.pass {

    import Component = eui.Component;

    export class PassView extends Component {
        public btn_rank: game.mod.Btn;
        public btn_preview: game.mod.Btn;
        public lab_open: eui.Label;

        public node0: game.mod.pass.PassNode;
        public node1: game.mod.pass.PassNode;
        public node2: game.mod.pass.PassNode;
        public node3: game.mod.pass.PassNode;
        public node4: game.mod.pass.PassNode;
        public node5: game.mod.pass.PassNode;
        public node6: game.mod.pass.PassNode;
        public node7: game.mod.pass.PassNode;
        public node8: game.mod.pass.PassNode;
        public node9: game.mod.pass.PassNode;
        public snode0: game.mod.pass.PassNode;
        public snode1: game.mod.pass.PassNode;
        public snode2: game.mod.pass.PassNode;
        public snode3: game.mod.pass.PassNode;
        public snode4: game.mod.pass.PassNode;
        public snode5: game.mod.pass.PassNode;
        public snode6: game.mod.pass.PassNode;
        public snode7: game.mod.pass.PassNode;
        public snode8: game.mod.pass.PassNode;

        public list_reward: eui.List;
        public lab_step_name: eui.Label;
        public lab_condition: eui.Label;
        public btn_fight: game.mod.Btn;
        public grp_boss: eui.Group;
        public grp_bg: eui.Group;
        public btn_ling: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.pass.PassSkin";
        }
    }

}