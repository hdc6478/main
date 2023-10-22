namespace game {

    import tiandi_level_data = msg.tiandi_level_data;
    import SkillItemRenderData = game.mod.SkillItemRenderData;

    export const enum GodEvent {
        ON_UPDATE_ROAD_INFO = "on_update_road_info",
        ON_UPDATE_TREASURE_INFO = "on_update_treasure_info",
        ON_UPDATE_HAUNTED_INFO = "on_update_haunted_info",
        ON_UPDATE_TIANLONG_INFO = "on_update_tianlong_info",
        ON_UPDATE_AVATAR_INFO = "on_update_avatar_info",
        ON_UPDATE_TRAVEL_INFO = "on_update_travel_info",
        ON_UPDATE_TRAVEL_LIST_INFO = "on_update_travel_list_info",
    }

    export interface GodListData {
        type: number;
        info?: tiandi_level_data;
    }

    export const enum GodType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
    }

    export const enum GodHintType {
        Type1 = "01",
        Type2 = "02",
        Type3 = "03",
        Type4 = "04",
    }

    export const enum GodHintType {
        Up = "01",
        Act = "02",
    }

    export const enum GodActOper {
        Activate = 1,
        Up = 2
    }

    export const DEFAULT_EXP = 10;


    export interface GodBuffData extends SkillItemRenderData {
        limit?: number;
        cur?:number;
    }
}
