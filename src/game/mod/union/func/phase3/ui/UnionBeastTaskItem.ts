namespace game.mod.union {

    import GuildXianshouTaskConfig = game.config.GuildXianshouTaskConfig;
    import MainTask1Config = game.config.MainTask1Config;

    export class UnionBeastTaskItem extends TaskRender {

        private coinItem: CoinItem;
        private img_icon: eui.Image;

        protected dataChanged(): void {
            super.dataChanged();

            let proxy: UnionProxy = getProxy(ModName.Union, ProxyType.Union);
            let cfg: GuildXianshouTaskConfig = proxy.getBeastTask(this.data.task_id);
            let cnt: number = cfg && cfg.exp || 0;
            this.lab_num.text = StringUtil.getHurtNumStr(cnt);

            let task: MainTask1Config = TaskUtil.getCfg(this.data.task_id);
            this.coinItem.setData(task.rewards[0][0]);
            this.coinItem.lab_cost.text = `${task.rewards[0][1]}`;

            let prop = GameConfig.getPropConfigById(PropIndex.GuildXianshouExp);
            this.img_icon.source = prop.icon;
        }
    }
}