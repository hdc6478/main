namespace game.mod.activity {


    import oper_act_item = msg.oper_act_item;

    export class ActivityModel {
        //{活动id:活动数据}
        public activityList: { [key: number]: oper_act_item } = {};
        //{活动类型：活动idList}
        public actTypeList: { [key: number]: number[] } = {};

        public entranceBtnMap: { [entrance: string]: oper_act_item[] } = {};//入口编号对应的活动列表，总的活动数据，不用做移除处理

        public curOpenAct: oper_act_item;//记录选中的分页活动数据
    }

}
