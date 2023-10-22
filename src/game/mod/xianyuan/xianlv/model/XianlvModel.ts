namespace game.mod.xianyuan {

    import teammate = msg.teammate;

    export class XianlvModel {
        /** 伴侣信息 */
        public banlv_infos: teammate;
        /** 同修天数 */
        public days: number = 0;

        /** 返回邀请记录 */
        public invite_records: msg.teammate[] = [];

        /**页签红点*/
        public hintPath: { [type: number]: string[] } = {
            1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv],
            2: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Renwu],
            3: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Shilian],
            4: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Zhanchang]
        };

        /**按钮功能开启id*/
        public btnOpenIdxAry: number[] = [OpenIdx.XianlvChild, OpenIdx.XianlvRing, null, null];

        /**按钮红点路径*/
        public btnHintPath: { [openIdx: number]: string[] } = {
            [this.btnOpenIdxAry[0]]: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain],
            [this.btnOpenIdxAry[1]]: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.RingMain]
        };
    }

}