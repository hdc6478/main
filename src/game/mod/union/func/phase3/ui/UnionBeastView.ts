namespace game.mod.union {

    export class UnionBeastView extends eui.Component {

        power: Power;
        nameItem: AvatarNameItem;
        coinItem: CoinItem;
        btn_up: UpStarBtn;
        list_task: eui.List;
        btn_rank: Btn;
        btn_reward: Btn;
        btn_ring: Btn;
        grp_eft: eui.Group;

        constructor() {
            super();
            this.skinName = "skins.union.UnionBeastSkin";
        }
    }

}