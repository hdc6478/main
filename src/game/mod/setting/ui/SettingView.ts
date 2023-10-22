namespace game.mod.setting {

    export class SettingMainView extends eui.Component {
        public secondPop:game.mod.SecondPop;
        public HeadVip_head:game.mod.HeadVip;
        public img_bg:eui.Image;
        public editable_name:eui.EditableText;
        public modifi_gai:game.mod.CostIcon;
        public male:eui.CheckBox;
        public female:eui.CheckBox;
        public btn_modify:game.mod.Btn;
        public btn_head:game.mod.Btn;
        public btn_copy:game.mod.Btn;
        public label_uid:eui.Label;

        public bgMusic:eui.CheckBox;
        public autoShenjiang:eui.CheckBox;
        public gameMusic:eui.CheckBox;
        public autoHuashen:eui.CheckBox;
        public gameShake:eui.CheckBox;

        public img_bg2:eui.Image;
        public btn_activation:game.mod.Btn;
        public m_smooth1:eui.Group;
        public img_bg01:eui.Image;
        public img_select01:eui.Image;
        public lab_content01:eui.Label;
        public m_smooth2:eui.Group;
        public img_bg02:eui.Image;
        public img_select02:eui.Image;
        public lab_content02:eui.Label;
        public m_smooth3:eui.Group;
        public img_bg03:eui.Image;
        public img_select03:eui.Image;
        public lab_content03:eui.Label;

        public list_btn:eui.List;

        constructor() {
            super();
            this.skinName = "skins.setting.settingSkin";
        }
    }
}