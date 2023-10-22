namespace game.mod.compete {

    export class KuafuDoufaSceneView extends eui.Component {
        public lab_time: eui.Label;
        public lab_redScore: eui.Label;
        public lab_redCnt: eui.Label;
        public lab_blueScore: eui.Label;
        public lab_blueCnt: eui.Label;
        public list_redBoss: eui.List;
        public list_blueBoss: eui.List;

        public head1: Head;
        public bar1: ProgressBarComp;
        public img_fanji: eui.Image;

        public head2: Head;
        public bar2: ProgressBarComp;
        public btn_enemy: game.mod.Btn;

        public head3: Head;
        public bar3: ProgressBarComp;

        public btn_rank: Btn;
        public btn_score: Btn;
        public btn_attack: Btn;

        public grp_attack: eui.Group;//todo
        public bar_attack: ProgressBarComp;
        public head_attack: Head;
        public lab_name_attack: eui.Label;

        public grp_kill: eui.Group;//todo
        public kill1: KuafuDoufaKillItem;
        public img_kill: eui.Image;
        public kill2: KuafuDoufaKillItem;

        public grp_start: eui.Group;
        public grp_time: eui.Group;

        public grp_died: eui.Group;
        public lab_reviveTime: eui.Label;
        public lab_revive: eui.Label;

        public grp_skill: eui.Group;
        public skill_item: KuafuDoufaSceneSkillItem;
        public list_skill: eui.List;

        //攻击中
        public grp_attactEft1: eui.Group;
        public grp_attactEft2: eui.Group;
        public grp_attactEft3: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.compete.KuafuDoufaSceneSkin";
        }
    }
}
