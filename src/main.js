import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store/store';
import './my-theme/index.less';
import $ from 'jquery';
import accounting from 'accounting';
import Vtip from 'vtip';
import 'vtip/lib/index.min.css';
import moment from "moment";


Vue.use(VueRouter);
Vue.use(iView);
Vue.use(Vtip.directive)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers,
    // saveScrollPosition: true,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});

$.ajaxSetup({
    timeout: 60000,
    //完成请求后触发。即在success或error触发后触发  
    complete: function (XMLHttpRequest, status) { 
        // console.log(XMLHttpRequest);
        iView.LoadingBar.finish();
    },  
　　//发送请求前触发  
　　beforeSend: function (XMLHttpRequest) {
        // console.log(XMLHttpRequest);
        iView.LoadingBar.start();
    },
    error: function (XMLHttpRequest, status, e) {
        if (XMLHttpRequest.status > 500) {
            // this.$store.commit('errorMessage', { status: true , msg: data.msg});
            // setTimeout(() =>this.$store.commit('errorMessage', { status: false , msg: ''}),3000);
        }
        if (status == "timeout") {
            // this.$store.commit('errorMessage', { status: true , msg: data.msg});
            // setTimeout(() =>this.$store.commit('errorMessage', { status: false , msg: ''}),3000);
        }
        // console.log(XMLHttpRequest);
        // console.log(status);
        // console.log(e);
        return false;
    }
});

Vue.prototype.$tip = Vtip.tip
Vue.prototype.$accounting = accounting;
Vue.filter("currency", function (value) {
    return Vue.prototype.$accounting.formatMoney(value, '')
})
Vue.filter("Number", function (value) {
    return Vue.prototype.$accounting.formatNumber(value, 0, ",", ".")
})
Vue.filter("timeFormat", function(value) { return moment(value * 1000).format("YYYY-MM-DD HH:mm:ss") }) 
