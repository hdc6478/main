namespace game.mod.activity {

    import c2s_activity_jiuyou_tiaozhan = msg.c2s_activity_jiuyou_tiaozhan;
    import GameNT = base.GameNT;
    import s2c_activity_jiuyou_tiaozhan = msg.s2c_activity_jiuyou_tiaozhan;
    import s2c_activity_jiuyou_boss_rank = msg.s2c_activity_jiuyou_boss_rank;
    import c2s_activity_jiuyou_rank = msg.c2s_activity_jiuyou_rank;
    import s2c_activity_jiuyou_rank = msg.s2c_activity_jiuyou_rank;
    import c2s_activity_jiuyou_duihuan = msg.c2s_activity_jiuyou_duihuan;
    import s2c_activity_jiuyou_duihuan = msg.s2c_activity_jiuyou_duihuan;
    import c2s_activity_jiuyou_gift = msg.c2s_activity_jiuyou_gift;
    import s2c_activity_jiuyou_gift = msg.s2c_activity_jiuyou_gift;

    /**
     * @description 九幽系统
     */
    export class JiuyouProxy extends ProxyBase {
        private _model: JiuyouModel;

        initialize(): void {
            super.initialize();
            this._model = new JiuyouModel();

            this.onProto(s2c_activity_jiuyou_tiaozhan, this.s2c_activity_jiuyou_tiaozhan, this);
            this.onProto(s2c_activity_jiuyou_boss_rank, this.s2c_activity_jiuyou_boss_rank, this);
            this.onProto(s2c_activity_jiuyou_rank, this.s2c_activity_jiuyou_rank, this);
            this.onProto(s2c_activity_jiuyou_duihuan, this.s2c_activity_jiuyou_duihuan, this);
            this.onProto(s2c_activity_jiuyou_gift, this.s2c_activity_jiuyou_gift, this);
        }

        //todo
        public getActId(): number {
            return 0;
        }

        /// 九幽挑战
        public c2s_activity_jiuyou_tiaozhan(type: number, param?: number): void {
            let msg = new c2s_activity_jiuyou_tiaozhan();
            msg.act_id = null;//todo
            msg.oper_type = type;
            msg.param = param;
            this.sendProto(msg);
        }

        private s2c_activity_jiuyou_tiaozhan(n: GameNT): void {
            let msg = n.body as s2c_activity_jiuyou_tiaozhan;
        }

        private s2c_activity_jiuyou_boss_rank(n: GameNT): void {
            let msg = n.body as s2c_activity_jiuyou_boss_rank;

        }

        /// 九幽排行
        public c2s_activity_jiuyou_rank(): void {
            let msg = new c2s_activity_jiuyou_rank();
            this.sendProto(msg);
        }

        private s2c_activity_jiuyou_rank(n: GameNT): void {
            let msg = n.body as s2c_activity_jiuyou_rank;
        }

        // 九幽兑换
        public c2s_activity_jiuyou_duihuan(index: number, count: number): void {
            let msg = new c2s_activity_jiuyou_duihuan();
            msg.act_id = null;//todo
            msg.index = index;
            msg.count = count;
            this.sendProto(msg);
        }

        private s2c_activity_jiuyou_duihuan(n: GameNT): void {
            let msg = n.body as s2c_activity_jiuyou_duihuan;
        }

        /// 九幽礼包
        public c2s_activity_jiuyou_gift(index: number): void {
            let msg = new c2s_activity_jiuyou_gift();
            msg.act_id = null;//todo
            msg.index = index;
            this.sendProto(msg);
        }

        private s2c_activity_jiuyou_gift(n: GameNT): void {
            let msg = n.body as s2c_activity_jiuyou_gift;
        }

        /**====================协议end====================*/

        private updateHint(): void {

        }
    }
}