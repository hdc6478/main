namespace game.mod.misc {
    import s2c_server_msgbox = msg.s2c_server_msgbox;

    export class ServerErrCmd extends CmdBase {

        public exec(n: base.GameNT): void {
            let s2c: s2c_server_msgbox = n.body;
            ViewMgr.getIns().show(s2c.title + "\n" + s2c.body);
        }
    }
}
