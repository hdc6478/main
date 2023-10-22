namespace game.mod {

    import Handler = base.Handler;
    import facade = base.facade;

    export class PassBossTip {

        public static show(handler: Handler) {
            let showArg = {
                handler: handler
            };
            facade.showView(ModName.Pass, PassViewType.PassBossTip, showArg);
        }
    }

}