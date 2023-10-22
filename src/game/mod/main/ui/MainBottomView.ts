namespace game.mod.main {

    export class MainBottomView extends eui.Component {
        public btn_exit: game.mod.Btn;
        public grp_show: eui.Group;

        public btn_mail: game.mod.Btn;
        public btn_chat: game.mod.Btn;
        public grp_task: eui.Group;
        public img_task_bg: eui.Image;
        public lab_taskDesc: eui.Label;
        public btn_offline: game.mod.Btn;
        public btn_more: game.mod.Btn;
        public gr_more: eui.Group;
        public btn_challenge: game.mod.main.MainLeftChallengeBtn;
        public btn_auto: game.mod.Btn;
        public grp_btn: eui.Group;
        public btn_yuanling_invite: game.mod.Btn;
        public btn_find: game.mod.Btn;

        public img_bg:eui.Image;

        public scr_skill: eui.Scroller;
        public list_skill: eui.List;

        public scr_icon: eui.Scroller;
        public gr_icon: eui.Group;

        //仙缘按钮
        public gr_xianyuan:eui.Group;
        public gr_xianyuan_icon:eui.Group;

        public use_prop:MainFastProp;

        public grp_boss: eui.Group;
        public lab_name: eui.Label;
        public img_icon: eui.Image;
        public btn_go: game.mod.Btn;
        public btn_close: game.mod.Btn;

        public grp_huashen: eui.Group;
        public grp_huashen_open: eui.Group;
        public huashenItem1: HuashenItem;
        public huashenItem2: HuashenItem;
        public huashenItem3: HuashenItem;
        public huashen: HuashenBtn;
        // public btn_huashen: game.mod.Btn;
        // public img_huashen_val: eui.Image;
        // public lab_huashen_val: eui.Label;
        // public img_huashen_lock: eui.Image;

        constructor() {
            super();
            this.name = "MainBottomView";
            this.skinName = "skins.main.NewMainBottomSkin";
        }
    }

    export class MainLeftChallengeBtn extends Btn {
        public gr: eui.Group;
        public img_bg: eui.Image;
        public group_eft: eui.Group;
        public lbl_passName: eui.Label;
        public redPoint: eui.Image;

        constructor() {
            super();
            this.skinName = `skins.main.MainLeftChallengeBtnSkin`;
        }
    }
}
