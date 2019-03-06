import Env from './env';
import Cookies from 'js-cookie';

let api = Cookies.get('api') ? Cookies.get('api') : 'mainNetwork'

let config = {
    env: Env,
    title: 'LBTC',
    api: {
        dev: 'http://47.75.150.5:8822/'
        // dev: 'https://api.lbtc.io/',
    },
    getStatus: (status) => {
        if (status != 200 ) {
            this.$router.push({path: '/'});
        }
    }
};
export default config;