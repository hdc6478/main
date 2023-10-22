namespace game.mod.xianyuan {

    export class XianlvDoufaWinView extends eui.Component {

        head1: HeadVip;
        head2: HeadVip;
        head3: HeadVip;
        head4: HeadVip;

        closeTips: CloseTips;
        resultReward: ResultReward;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvDoufaWinSkin";
        }
    }
}