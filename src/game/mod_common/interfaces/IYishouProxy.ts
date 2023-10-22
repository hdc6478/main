namespace game.mod {
    import IProxy = base.IProxy;

    export interface IYishouProxy extends IProxy {
        //激活兽印套装或激活兽印单位, 外显id(激活组不要传数值)
        c2s_yishou_shouying_jiban(index: number, id?: number): void;

        //羁绊组成是否激活
        isJibanIconActed(jibanIndex: number, partnerIndex: number): boolean;

        //羁绊是否激活
        isJibanActed(jibanIndex: number): boolean;

        //羁绊组成能否激活
        canJibanIconAct(jibanIndex: number, partnerIndex: number): boolean;

        //羁绊能否激活
        canJibanAct(jibanIndex: number): boolean;

        //获取羁绊激活的外显id列表
        getJibanIconActedList(jibanIndex: number): number[];

        //羁绊红点
        getJibanHint(jibanIndex: number): boolean;
    }

}