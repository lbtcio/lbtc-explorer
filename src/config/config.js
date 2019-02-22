import Env from './env';
import Cookies from 'js-cookie';

let api = Cookies.get('api') ? Cookies.get('api') : 'mainNetwork'

let config = {
    env: Env,
    title: 'LBTC',
    api: {
        dev: 'https://api.lbtc.io/',
        // dev: 'http://api.test-explorer.lbtc.io:8080/',
        // dev: 'http://47.75.59.162:8082/'
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