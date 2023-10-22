namespace game.mod.shilian {

    /**队伍列表以及被邀请列表界面*/
    export class YuanLingTeamListView extends eui.Component {
        public secondPop: game.mod.SecondPop;
        public scroller: eui.Scroller;
        public list: eui.List;
        public lb_noteam: eui.Label;
        public btn_create: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingTeamListSkin";
        }
    }
}