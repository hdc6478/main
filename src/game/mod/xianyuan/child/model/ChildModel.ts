namespace game.mod.xianyuan {

    import child_shenbin_info = msg.child_shenbin_info;

    export class ChildModel {
        public child_infos: { [child_index: number]: msg.xianlv_child_infos } = {};

        public jiban_infos: { [jiban_index: number]: msg.child_jiban_infos } = {};

        /**神兵，灵翼数据*/
        public infos: { [type: number]: { [index: number]: child_shenbin_info } } = {};

        /**上阵子女index*/
        public child_list: number[] = [];
        /**激活的技能index*/
        public skill_list: number[] = [];

        //页签红点 todo
        public hintPath: { [type: number]: any } = {
            1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Gongxiang],
            2: {
                1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType01],
                2: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType02],
                3: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType03],
                4: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, MdrTabBtnType.TabBtnType04]
            },
            3: {
                1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shenbing, MdrTabBtnType.TabBtnType01],
                2: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shenbing, MdrTabBtnType.TabBtnType02]
            },
            4: {
                1: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Lingyi, MdrTabBtnType.TabBtnType01],
                2: [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Lingyi, MdrTabBtnType.TabBtnType02]
            }
        };

        //羁绊红点
        public jibanHintPath: string[] = [ModName.Xianyuan, XianyuanViewType.Xianlv, XianlvMainBtnType.Xianlv, XianyuanViewType.ChildMain, XianlvChildMainBtnType.Shengxing, 'jiban'];
    }

}