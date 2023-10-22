declare namespace game.mod.setting {
    class SettingMod extends ModBase {
        constructor();
        protected initCmd(): void;
        protected initModel(): void;
        protected initView(): void;
    }
}
declare namespace game.mod.setting {
}
declare namespace game.mod.setting {
    class SettingMainView extends eui.Component {
        secondPop: game.mod.SecondPop;
        HeadVip_head: game.mod.HeadVip;
        img_bg: eui.Image;
        editable_name: eui.EditableText;
        modifi_gai: game.mod.CostIcon;
        male: eui.CheckBox;
        female: eui.CheckBox;
        btn_modify: game.mod.Btn;
        btn_head: game.mod.Btn;
        btn_copy: game.mod.Btn;
        label_uid: eui.Label;
        bgMusic: eui.CheckBox;
        autoShenjiang: eui.CheckBox;
        gameMusic: eui.CheckBox;
        autoHuashen: eui.CheckBox;
        gameShake: eui.CheckBox;
        img_bg2: eui.Image;
        btn_activation: game.mod.Btn;
        m_smooth1: eui.Group;
        img_bg01: eui.Image;
        img_select01: eui.Image;
        lab_content01: eui.Label;
        m_smooth2: eui.Group;
        img_bg02: eui.Image;
        img_select02: eui.Image;
        lab_content02: eui.Label;
        m_smooth3: eui.Group;
        img_bg03: eui.Image;
        img_select03: eui.Image;
        lab_content03: eui.Label;
        list_btn: eui.List;
        constructor();
    }
}
declare namespace game.mod.setting {
    class SettingMainMdr extends MdrBase {
        private _view;
        private _proxy;
        _smooths: eui.Group[];
        _selectedImg: eui.Image[];
        private _listBtn;
        private _btnData;
        constructor();
        protected onInit(): void;
        protected addListeners(): void;
        protected onShow(): void;
        protected onHide(): void;
        private onRoleUpdate;
        private btn_headFunc;
        private smoothFunc1;
        private smoothFunc2;
        private smoothFunc3;
        private showConfirm;
        private setIconSelManys;
        private setTopStatic;
        private updateTop;
        private updateMid;
        private updateBttom;
        private checkBoxFunc;
        private btn_activationFunc;
        private btn_modifyFunc;
        private btn_copyFunc;
        private maleFunc;
        private femaleFunc;
        copyTextToClipboard(text: string): boolean;
        private onClickBtnList;
    }
}
