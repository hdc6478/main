namespace game.mod.xianyuan {

    export class XianlvDoufaSceneView extends eui.Component {

        public lab_time: eui.Label;
        public lab_hurt1: eui.Label;
        public lab_hurt2: eui.Label;

        public head1: HeadHP;
        public head2: HeadHP;
        public head3: HeadHP;
        public head4: HeadHP;

        constructor() {
            super();
            this.skinName = "skins.xianyuan.XianlvDoufaSceneSkin";
        }
    }
}