namespace game.mod {

    export class WebReqUtil {
        /** 点击shouq意见反馈 */
        public static onClickFeedBack(qq: string, content: string, cb: (obj: any) => void, type?: number, images?: string[]) {

            let feedbackMethod: string = "client/feedback";//意见反馈后台接口地址
            let url = WebReqUtil.getFeekBackUrl();
            let data = {
                pf_id: gso.agent_id,
                channel: gso.channel,
                server_id: RoleVo.ins.server_id.toString(),
                role_id: RoleVo.ins.role_id.toNumber().toString(),
                role_name: RoleVo.ins.name,
                account: gso.account,
                qq: qq,
                content: content,
                type: type,
                images: images,
            };

            console.info("===手Q意见反馈===",JSON.stringify(data));
            ggo.webReqPost(url + feedbackMethod, this.encodeUriData(data), cb);
        }

        public static getFeekBackUrl() {
            let host: string = "https://login-ljtx.1y-game.com/";// 后台地址
            if(gso.channel == "test") {
                host = "http://192.168.1.20:6002/";
            }
            return host;
        }
        private static encodeUriData(data: any): string{
            console.info("===意见反馈返回===",JSON.stringify(data));
            let list = [];
            for (let k in data) {
                if (!data.hasOwnProperty(k)) {
                    continue;
                }
                let v = data[k];
                if (typeof v === "undefined" || typeof v === "function") {
                    continue;
                }
                list.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
            return list.length ? list.join("&") : "";
        }
    }
}