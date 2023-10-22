namespace game.mod.union {

    export class UnionTreasureView extends eui.Component {

        grp_eff: eui.Group;
        list_item: eui.List;
        btn_rank: Btn;
        btn_help: Btn;
        btn_reward: Btn;
        btn_onekey: Btn;
        btn_once: Btn;
        timeItem: TimeItem;
        timeItem2: TimeItem;
        coinItem: CoinItem;
        hpItem: UnionBossHpItem;

        constructor() {
            super();
            this.skinName = "skins.union.UnionTreasureSkin";
        }
    }

}