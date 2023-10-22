namespace game.mod.vip {

    export class VipPrivilegeView extends eui.Component {
        public scroller: eui.Scroller;
        public list: eui.List;
        public barComp: game.mod.vip.VipBarComp;
        public list_desc: eui.List;
        public gr_vip: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.vip.VipPrivilegeSkin";
        }
    }
}