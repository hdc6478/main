namespace game {
    export function initLog(): void {
        if (DEBUG) {
            let filter: string[] = [
                "msg.s2c_scene_entity_add",
                "msg.s2c_scene_entity_update",
                "msg.s2c_scene_entity_delete",
                "msg.s2c_scene_entity_move",
                "msg.s2c_instance_find_monster",
                "msg.s2c_instance_pickup_drop",
                "msg.s2c_scene_entity_stop_moving",
                "msg.s2c_scene_add_system_team_members",

                "msg.c2s_instance_pickup_drop",
                "msg.c2s_scene_move",
                "msg.c2s_scene_buddy_move",
                "msg.s2c_fly_bool",
            ];

            let skill_list: string[] = ["msg.s2c_battle_info",
                "msg.c2s_battle_use_skill",
                "msg.c2s_battle_buddy_use_skill"];
            let dbg: string[] = ["c2s_scene_print_entity", "s2c_scene_print_entity"];
            base.traceProto = function (...params: any[]) {
                let msg = logger.getList(params);
                if (msg.length > 1 && msg[1] && msg[1].indexOf("msg.s2c_entity_xy_change") > -1) {
                    return;
                }
                if ((gso.dbg_scene & 1) == 0 && msg.length > 1 && msg[1]) {
                    let str: string = msg[1];
                    for (let f of filter) {
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                if (dbg && msg.length > 1 && msg[1]) {
                    let str: string = msg[1];
                    for (let f of dbg) {
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                if ((gso.dbg_skill & 1) == 0 && msg.length > 1 && msg[1]) {
                    let str: string = msg[1];
                    for (let f of skill_list) {
                        if (str.indexOf(f) > -1) {
                            return;
                        }
                    }
                }
                (<any>console).proto.apply(console, msg);
            }
        }
    }

}
