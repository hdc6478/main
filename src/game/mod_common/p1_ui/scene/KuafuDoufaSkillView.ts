namespace game.mod {

    /**
     * 战场技能列表
     */
    export class KuafuDoufaSkillView extends eui.Component {
        public list_reward: eui.List;
        public cost: game.mod.CoinItem;

        constructor() {
            super();
            this.skinName = "skins.compete.KuafuDoufaSkillSkin";
        }
    }
}
