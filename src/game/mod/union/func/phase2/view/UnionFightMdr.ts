namespace game.mod.union {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Monster1Config = game.config.Monster1Config;

    export class UnionFightMdr extends MdrBase implements UpdateItem {
        private _view: UnionFightView = this.mark("_view", UnionFightView);

        private _proxy: UnionProxy;

        private readonly HP_WIDTH: number = 350;//血条宽度
        private readonly ALL_HP: number = 10000;
        private self: number = 10000;
        private boss: number = 10000;

        private id: Long;

        /**总血量 */
        private boss_all: number;
        /**当前 */
        private boss_hp: number;
        /**血量扣除 */
        private boss_deduct: number;
        /** */
        private boss_index: number;
        /**结束血量比例 */
        private boss_end_hp: number;

        constructor() {
            super(Layer.modal);
            // this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Union);
        }

        protected addListeners(): void {
            super.addListeners();
        }

        protected onShow(): void {
            super.onShow();

            this.boss_all = this._showArgs.boss_all;
            this.boss_hp = this._showArgs.boss_hp;
            this.boss_deduct = this._showArgs.boss_deduct;
            this.boss_index = this._showArgs.boss_index;
            this.id = this._showArgs.id;
            this.boss_end_hp = this.boss_deduct > this.boss_hp ? 0 : (this.boss_hp - this.boss_deduct) / 100 * this.ALL_HP;
            console.error(this.boss_end_hp);

            this.onUpdateInfo();
        }

        update(time: base.Time): void {
            if (this.boss <= this.boss_end_hp) {
                this.onOver();
                return;
            }
            this.onUpdateRandomHP();
        }

        private onUpdateInfo(): void {
            this.self = this.ALL_HP;
            this.boss = this.ALL_HP * this.boss_hp / this.boss_all;
            this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;
            this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;

            let vo = RoleVo.ins;
            this._view.lab_name1.text = vo.name;
            this._view.powerLabel1.setPowerValue(vo.showpower);
            this._view.head1.updateMyHead();

            let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, this.boss_index);
            this._view.lab_name2.text = cfg.name;
            // this._view.powerLabel2.setPowerValue();
            this._view.powerLabel2.visible = false;
            this._view.head2.updateBossHeadShow(this.boss_index, 0);

            TimeMgr.addUpdateItem(this, 500);
        }

        private onUpdateRandomHP(): void {
            this.self -= Math.random() * 500;
            this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;

            this.boss -= Math.random() * 500 + 500;
            this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
        }

        protected onOver(): void {
            this._proxy.c2s_guild_zhanyaotai_click(2, this.id);
            TimeMgr.removeUpdateItem(this);
            this.hide();
        }

    }
}