namespace game.mod.misc {


    export class InitMiscCmd extends CmdBase {
        exec(n: base.GameNT): void {
            super.exec(n);
            this.owner.unregCmd(MiscEvent.INIT_MISC);
            new MiscMdr();
        }
    }
}