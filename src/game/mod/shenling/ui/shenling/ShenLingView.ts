namespace game.mod.shenling {

    export class ShenLingView extends eui.Component {
        public power: game.mod.Power2;
        public btn_jiban: game.mod.Btn;
        public btn_shangzhen: game.mod.Btn;
        public icon_heji: ShenLingSkillIcon;
        public list_lingbao: eui.List;
        public bar: game.mod.ProgressBarComp;
        public btn_lv: game.mod.Btn;
        public btn_first: GiftBtn;
        public btn_oneKey: game.mod.Btn;
        public list_cost: eui.List;
        public moItem: game.mod.shenling.ShenLingModelItem;
        public gr_lv: eui.Group;
        public lb_level: eui.Label;
        public btn_act: game.mod.Btn;//立即激活，或者突破按钮
        public gr_uplv: eui.Group;
        public img_max: eui.Image;
        public typeListComp: game.mod.shenling.ShenLingTypeListView;
        //新服冲榜活动
        public btn_activity: Btn;
        public lab_time: eui.Label;
        public grp_act: eui.Group;
        public btn_gift: game.mod.Btn;

        constructor() {
            super();
            this.skinName = `skins.shenling.ShenLingSkin`;
            this.touchEnabled = false;
        }
    }

}