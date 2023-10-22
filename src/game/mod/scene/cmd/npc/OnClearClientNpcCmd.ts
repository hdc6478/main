namespace game.mod.scene {

    import NPCVo = game.scene.NPCVo;
    /** 删除场景所有客户端NPC */
    export class OnClearClientNpcCmd extends CmdBase {

        exec(n: base.GameNT): void {
            let self = this;
            let proxy: SceneProxy = self.retProxy(ProxyType.Scene);
            let model: SceneModel = proxy.getModel();
            let dict = model.npcDic;
            let list = Object.keys(dict);
            for (let i = 0, len = list.length; i < len; i++) {
                let key = list[i]
                let tmpVo: NPCVo = dict[key];
                let del = proxy.delVo(tmpVo.entity_id);
                if (del) {
                    this.sendNt(SceneEvent.ON_OBJ_DEL, del);
                }
                delete dict[key];
            }
        }
    }
}