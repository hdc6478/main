namespace game.mod.shilian {

    /**组队邀请界面*/
    export class YuanLingTeamInviteView extends eui.Component {
        public secondPop:game.mod.SecondPop;
        public list: eui.List;
        public btn_kuafu: game.mod.Btn;
        public btn_zongmen: game.mod.Btn;

        constructor() {
            super();
            this.skinName = "skins.shilian.YuanLingTeamInviteSkin";
        }
    }
}