namespace game.mod.xianyuan {

    export class XianlvView extends eui.Component {
        public power: game.mod.Power2;
        public btn_do: game.mod.Btn;
        public roleComp0: game.mod.xianyuan.XianlvRoleComp;
        public roleComp1: game.mod.xianyuan.XianlvRoleComp;
        public btn_zhaohuan: game.mod.xianyuan.XianlvZhaohuanBtn;
        public list_child: eui.List;
        public list_tap: eui.List;
        public gr_day: eui.Group;
        public lb_day: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvSkin";
        }
    }
}