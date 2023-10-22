namespace game.mod.xianfa {

    export class XianfaView extends eui.Component {

        public power:game.mod.Power;

        public btn_skill0:game.mod.xianfa.XianfaItem;
        public btn_skill1:game.mod.xianfa.XianfaItem;
        public btn_skill2:game.mod.xianfa.XianfaItem;
        public btn_skill3:game.mod.xianfa.XianfaItem;
        public btn_skill4:game.mod.xianfa.XianfaItem;
        public btn_skill5:game.mod.xianfa.XianfaItem;
        
        public btn_wear_one_key:game.mod.Btn;
        public btn_upgrade_one_key:game.mod.Btn;

        public cost: game.mod.CostIcon;
        
        public list_skill:eui.List;

        constructor() {
            super();
            this.skinName = "skins.xianfa.XianfaSkin";
        }
    }

}