namespace game.mod {
    import IProxy = base.IProxy;

    export interface IUnionProxy extends IProxy {
        readonly isInUnion: boolean;
        readonly guild_id: number;//外部访问时通过RoleUtil访问
        readonly guild_name: string;
        readonly guild_job: number;

        c2s_guild_ware_exchange(prop_index: Long): void;
    }
}