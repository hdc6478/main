namespace game.mod.more {

    export class XujieJitanModel {
        /** 供奉的道具列表（顺序的） */
        public prop_list: msg.zhandui_jitan_struct[] = [];

        /** 累计加速时间 */
        public total_speed_time: Long;

        /** 战队拥有的能源石（公共的） */
        public value: Long;

        /** 已激活幻化的列表 */
        public ids: { [index: number]: msg.zhandui_jitan_huanhua_struct } = {};

        /** 当前使用的幻化id */
        public now_use_id: Long;

        /** 已经领取过的礼包索引列表（前端根据等级和列表判断是否可以领取） */
        public index_get_list: number[] = [];

        /** 祭坛等级 */
        public jitan_level: number = 0;

        /** 战队拥有的水晶数量（公共的） */
        public shuijin_value: Long;

        public jitanHintPath: string[] = [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn1];
        public lingbaoHintPaths: { [type: number]: string[] } = {
            [1]: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn2, MdrTabBtnType.TabBtnType01],
            [2]: [ModName.More, MoreViewType.ZhanduiMain, ZhanduiMainBtnType.Xujie, MoreViewType.XujieJitanMain, XujieJitanMainBtnType.Btn2, MdrTabBtnType.TabBtnType02]
        };

        public exitTeam(): void {
            this.prop_list = [];
            this.total_speed_time = null;
            this.value = null;
            this.ids = {};
            this.now_use_id = null;
            this.index_get_list = [];
            this.jitan_level = 0;
            this.shuijin_value = null;

            HintMgr.setHint(false, this.jitanHintPath);
            HintMgr.setHint(false, this.lingbaoHintPaths[1]);
            HintMgr.setHint(false, this.lingbaoHintPaths[2]);
        }
    }

}