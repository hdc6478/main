namespace game.mod.yishou {

    export class YishouModel {
        //进阶等级信息
        public info_list: { [type: number]: msg.yishou_base_data } = {};
        //兽灵列表
        public shouling_list: { [type: number]: msg.yishou_shouling_group_data } = {};
        //所有装备列表
        public equip_list: { [type: number]: YishouEquipData } = {};
        //兽印数据
        public shouying_list: { [index: number]: msg.yishou_shouying_data } = {};
        //兽印羁绊数据
        public jiban_list: { [index: number]: msg.yishou_jiban_data } = {};

        public hintPath: { [index: number]: string[] } = {
            [1]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shougu],
            [2]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouhun]
        };

        //兽灵页签红点
        public hintPath2: any = {
            [1]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouling, MdrTabBtnType.TabBtnType01]
        };

        //兽印红点
        public hintPath3: any = {
            [YishouShouyinType.Type1]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType01],
            [YishouShouyinType.Type2]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType02],
            [YishouShouyinType.Type3]: [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, MdrTabBtnType.TabBtnType03]
        };

        //兽印羁绊红点
        public jibanHint: string[] = [ModName.Yishou, YiShouViewType.Main, YishouMainBtnType.Shouyin, JibanMainBtnType.YishouShouyin];
    }

    export class YishouEquipData {
        type: YishouType;
        equips: { [pos: number]: msg.prop_attributes };
    }

}