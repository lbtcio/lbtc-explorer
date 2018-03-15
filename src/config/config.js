import Env from './env';

let config = {
    env: Env,
    title: 'LBTC',
    api: {
        // dev:'http://127.0.0.1:8080/',//..内网
        // dev:'http://116.62.21.130:8080/',//..外网1
        // dev:'http://47.97.101.32:8080/',//..外网2
        // dev: 'http://116.62.21.130:8080/',
        // dev:'http://47.52.253.229:8080/',
        // dev:'http://47.91.223.81:8080/'
        dev:'http://api.lbtc.io/'
        //canoe ketchup rescue senior resource device flat piano village situate invite chest
        //monkey tuna wood bean animal write agent render raccoon fossil thunder illness
    },
    getStatus: (status) => {
        if (status != 200 ) {
            this.$router.push({path: '/'});
        }
    }
};
export default config;