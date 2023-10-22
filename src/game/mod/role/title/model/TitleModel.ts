namespace game.mod.role {

    import title_info = msg.title_info;

    export class TitleModel {
        /** 当前幻化index   0表示未幻化称号*/
        using: Long;
        // /** 当前佩戴index   0表示未佩戴称号*/
        // wearing: Long;
        /** 称号列表Map*/
        title_list: { [index: number]: title_info } = {};
    }

}