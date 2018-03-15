const routers = [
    {
        path: '/',
        meta: {
            title: 'Lightning Bitcoin'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/transinfo',
        meta: {
            title: 'Transaction'
        },
        component: (resolve) => require(['./views/transaction.vue'], resolve)
    },
    // {
    //     path: '/topAccounts',
    //     meta: {
    //         title: 'Top Accounts'
    //     },
    //     component: (resolve) => require(['./views/topAccounts.vue'], resolve)
    // },
    // {
    //     path: '/addrinfo',
    //     meta: {
    //         title: 'Address'
    //     },
    //     component: (resolve) => require(['./views/address.vue'], resolve)
    // },
    {
        path: '/addrinfo',
        meta: {
            title: 'Address'
        },
        component: (resolve) => require(['./views/address1.vue'], resolve)
    },
    {
        path: '/blockinfo',
        meta: {
            title: 'Block'
        },
        component: (resolve) => require(['./views/block.vue'], resolve)
    },
    {
        path: '/blocks',
        meta: {
            title: 'Blocks'
        },
        component: (resolve) => require(['./views/blocks.vue'], resolve)
    },
    {
        path: '/delegateMonitor',
        meta: {
            title: 'Delegate Monitor'
        },
        component: (resolve) => require(['./views/delegate-monitor.vue'], resolve)
    },
];
export default routers;