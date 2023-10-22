namespace game.mod.surface {

    import lingchong_item = msg.lingchong_item;
    import lingchong_task_item = msg.lingchong_task_item;

    export class LingChongModel {

        /**灵宠列表，以及是否领取*/
        public list: { [index: number]: lingchong_item } = {};
        /**灵宠任务，{灵宠index: {任务index: lingchong_task_item}}*/
        public task_list: { [index: number]: { [task_index: number]: lingchong_task_item } } = {};

        /**灵宠Tab -> 灵宠secondTab hint*/
        public mainHintPath: string[] = [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Lingchong, LingChongSecondBtnType.Lingchong];
        /**远古神兽Tab -> 四神兽secondTab hint*/
        public ygshHintPath1: string[] = [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Sishenshou];
        /**远古神兽Tab -> 远古神兽secondTab hint*/
        public ygshHintPath2: string[] = [ModName.Surface, SurfaceViewType.LingChongMain, LingChongBtnType.Yuangushenshou, LingChongSecondBtnType.Yuangushenshou];
    }

}