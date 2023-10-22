namespace game.mod.xianyuan {

    export class ChildShangzhenView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public power: game.mod.Power2;
        public nameItem: game.mod.AvatarNameSrItem;
        public icon0: game.mod.Icon;
        public icon1: game.mod.Icon;
        public scroller: eui.Scroller;
        public list: eui.List;
        public gr_eft: eui.Group;
        public btn_shangzhen: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.ChildShangzhenSkin";
        }
    }
}