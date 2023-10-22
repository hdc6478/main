namespace game.mod.scene {
    import NPCVo = game.scene.NPCVo;

    /** 删除客户端NPC */
    export class OnDelClientNpcCmd extends CmdBase {

        exec(n: base.GameNT): void {
            let self = this;
            let npc_id: number = n.body;
            let proxy: SceneProxy = self.retProxy(ProxyType.Scene);
            let model = proxy.getModel();
            let dict = model.npcDic;
            for (let key in dict) {
                let tmpVo: NPCVo = dict[key];
                if (npc_id == tmpVo.npc_id) {
                    let del = proxy.delVo(tmpVo.entity_id);
                    if (del) {
                        self.sendNt(SceneEvent.ON_OBJ_DEL, del);
                    }
                    delete dict[key];
                    break;
                }
            }
        }
    }
}