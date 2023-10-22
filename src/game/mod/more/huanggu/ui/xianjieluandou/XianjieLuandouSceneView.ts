namespace game.mod.more {

    export class XianjieLuandouSceneView extends eui.Component {
        public list_boss: eui.List;
        public btn_zhanbao: game.mod.Btn;

        public btn_rule: game.mod.Btn;
        public timeItem: game.mod.TimeItem;
        public lb_cnt: eui.Label;
        public btn_reward: game.mod.Btn;
        public btn_hurt: game.mod.Btn;
        public btn_skill: game.mod.more.XianjieLuandouSkillBtn;
        public lb_goto: eui.Label;

        public head1: game.mod.Head;
        public bar1: game.mod.ProgressBarComp;
        public btn1: game.mod.Btn;
        public enemyInfo1: game.mod.EnemyInfoView;

        public head2: game.mod.Head;
        public bar2: game.mod.ProgressBarComp;
        public btn2: game.mod.Btn;
        public enemyInfo2: game.mod.EnemyInfoView;

        public head3: game.mod.Head;
        public bar3: game.mod.ProgressBarComp;
        public btn3: game.mod.Btn;
        public enemyInfo3: game.mod.EnemyInfoView;
        public img_fanji: eui.Image;

        public grp_tips: eui.Group;
        public grp_lv1: eui.Group;
        public headKillView: game.mod.HeadKillView;

        public grp_killtips: eui.Group;
        public lb_killtips: eui.Label;

        public list_skill: eui.List;
        public skillItem: game.mod.more.XianjieLuandouSceneSkillItem;

        public buffReviveView: game.mod.RoleBuffReviveView;

        constructor() {
            super();
            this.skinName = "skins.more.XianjieLuandouSceneSkin";
        }
    }
}