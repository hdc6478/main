namespace game.scene {


    import scene_trigger_data = msg.scene_trigger_data;

    export class TriggerVo extends NPCVo {
        public triggerType: number;

        public applyUpdate(data: any): string[] {
            let msg: scene_trigger_data = data;
            if (msg.trigger_type) {
                this.triggerType = msg.trigger_type
            }
            return super.applyUpdate(data);
        }
    }
}
