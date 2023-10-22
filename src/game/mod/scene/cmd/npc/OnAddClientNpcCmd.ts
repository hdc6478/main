namespace game.mod.scene {
    import npc_data = msg.npc_data;
    import ObjectType = game.scene.ObjectType;
    import NPCVo = game.scene.NPCVo;
    //import NpcConfig = game.config.NpcConfig;

    /** 添加客户端NPC */
    export class OnAddClientNpcCmd extends CmdBase {
        private _proxy: SceneProxy;

        exec(n: base.GameNT): void {
            let self = this;
            let data: any = n.body;
            self._proxy = self.retProxy(ProxyType.Scene);
            let model: SceneModel = self._proxy.getModel();
            let vo;
            if (data instanceof npc_data) {
                vo = self.addDataNpc(data);
            } else {
                //vo = self.addConfigNpc(data);
            }
            if (!vo) return;
            model.npcDic[vo.entity_id.toString()] = vo;
            self._proxy.addVo(vo, ObjectType.NPC);
            self.sendNt(SceneEvent.ON_OBJ_ADD, vo);
        }

        private addDataNpc(data: npc_data): NPCVo {
            let self = this;
            if (self._proxy.getClientSceneNpc(data.npc_id)) return null;
            // 根据类型添加 客户端实体数据
            let vo: NPCVo = new NPCVo(ObjectType.NPC);
            vo.x = data.x;
            vo.y = data.y;
            vo.name = data.name;
            vo.entity_id = self._proxy.getNpcEntityId();
            vo.index = data.npc_index;
            vo.npc_id = data.npc_id;
            vo.direction = data.direction;
            return vo;
        }

        // private addConfigNpc(data: NpcConfig): NPCVo {
        //     let self = this;
        //     if (!data || !data.enter_show || data.enter_show <= 0) {
        //         return null;
        //     }
        //     let vo: NPCVo = new NPCVo(ObjectType.NPC);
        //     vo.x = data.x;
        //     vo.y = data.y;
        //     vo.name = data.name;
        //     vo.entity_id = self._proxy.getNpcEntityId();
        //     vo.index = data.index;
        //     vo.npc_id = data.index;
        //     vo.direction = data.direction;
        //     return vo;
        // }
    }
}