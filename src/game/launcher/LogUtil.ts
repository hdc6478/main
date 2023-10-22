namespace game {
    export class LogUtil {

        //登录流程日志
        public static printLogin(str:string):void{
            if(gso.printLogin){
                console.info("登录流程日志: "+str);
            }
        }

        //战斗流程日志
        public static printBattle(str:string):void{
            if(0){
                console.info("战斗流程日志: "+str);
            }
        }

        //击退日志
        public static printBeatBack(str:string):void{
            if(0){
                console.info("击退日志: "+str);
            }
        }

        //监控 LoginProxy.isLoginAccount
        public static printIsLoginAccount(str:string):void{
            if(0){
                console.info("监控LoginProxy.isLoginAccount: "+str);
            }
        }

        //监控技能释放情况
        public static printSkill(str:string):void{
            if(0){
                console.info("监控技能释放情况: "+str);
            }
        }

        //修仙女仆自动挑战功能 todo
        public static printNvpuChallenge(str: string): void {
            if (!window['stopNvpu']) {
                console.info('ayah ' + str);
            }
        }
    }
}