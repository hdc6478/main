namespace game {

    export const enum XianluEvent {
        XIUXIAN_INFO_UPDATE = "xiuxian_info_update",/**修仙信息更新*/
        XIANDAN_INFO_UPDATE = "xiandan_info_update",/**仙丹信息更新*/
        LINGCHI_INFO_UPDATE = "lingchi_info_update",/**灵池信息更新*/
        LINGCHI_TIME_UPDATE = "lingchi_time_update",/**灵池时间更新*/
        LINGMAI_INFO_UPDATE = "lingmai_info_update",/**灵脉信息更新*/
        LINGGEN_INFO_UPDATE = "linggen_info_update",/**灵根信息更新*/
        REINCARNATE_INFO_UPDATE = "reincarnate_info_update",/**转生信息更新，只有转数发生变化才更新*/
    }

    export const LingmaiMaxLv = 10;//灵脉每一重固定10级
    export const RebirthMaxLv = 10;//＞10转需要转换成仙人x转
}