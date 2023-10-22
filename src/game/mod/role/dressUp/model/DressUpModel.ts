namespace game.mod.role {


    export class DressUpModel {
        public curIdxList: number[] = [];

        /** 当前穿戴头像idx */
        public head: Long;

        /** 当前穿戴头像框idx */
        public head_frame: Long;

        /** 当前穿戴汽泡idx */
        public chat_frame: Long;

        /** 装扮列表 */
        public surface_map: { [index: number]: msg.base_surface_item } = {};

        /** 套装列表 */
        public surface_suit_list: msg.base_surface_suit[] = [];

        public roots: { [key: number]: string[] } = {
            [DressUpType.Head]: [ModName.Role, NewRoleViewType.DressUpMain, MdrTabBtnType.TabBtnType03],
            [DressUpType.Frame]: [ModName.Role, NewRoleViewType.DressUpMain, MdrTabBtnType.TabBtnType04],
            [DressUpType.Bubble]: [ModName.Role, NewRoleViewType.DressUpMain, MdrTabBtnType.TabBtnType05],
        }
    }

}