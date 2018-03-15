<style scoped lang="less">
	@import "../styles/common.css";
	.topAccounts{
		// width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
			margin-right: auto;
			margin-left: auto;
			padding: 0 15px;
		}
		h1{
				font-size: 36px;
				margin: 20px 0 15px 0;
				font-weight:400;
		}
	}
</style>
<template>
    <div class="topAccounts">
			<div class="container">
        <h1>Top Accounts</h1>
        <Table :columns="topAccounts.thead" :data="topAccounts.datalist"></Table>				
			</div>
    </div>
</template>
<script>
    export default {

        name: "topAccounts",
        components: {},
        computed: {

        },
        
        data() {
            return{
								screenWidth: document.body.clientWidth,
                topAccounts:{
										thead:[],
                    thead1:[
												{
													type: 'index',
													width: 60,
													align: 'center'
												},
                        {
                            title: 'Address	',
														key: 'address	',
														align: 'right',
                            render: (h, params) => {
                                return h('div', [
                                    h('router-link', {
                                        props: {
                                            to: {
                                                path: '/address', query: { id: params.row.address }
                                            }
                                        }
                                    }, params.row.address)
                                ])
                            }
                        },
                        {
                            title: '~ Balance	',
                            key: 'balance',
                            align: 'right'
                        },
                        {
                            title: 'Supply',
                            key: 'supply',
                            align: 'center'
                        },
                        {
                            title: 'Owner',
                            key: 'owner',
                            align: 'right'
                        }
										],
										thead2:[
												{
													type: 'index',
													width: 60,
													align: 'center'
												},
                        {
                            title: 'Address	',
														key: 'address	',
														align: 'right',
                            render: (h, params) => {
                                return h('div', [
                                    h('router-link', {
                                        props: {
                                            to: {
                                                path: '/address', query: { id: params.row.address }
                                            }
                                        }
                                    }, params.row.address)
                                ])
                            }
                        },
                        {
                            title: '~ Balance	',
                            key: 'balance',
                            align: 'right'
                        }
										],
                    datalist:[
                        {
                            address: 123456789,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
												},
												{
                            address: 123534253245,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 34534534634,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 45634532,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 56875634345,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 876456463,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 455678456,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        },
												{
                            address: 123456789,
                            balance: '10,000,000.00 OXY	',
                            supply: '9.57%	',
                            owner: 'oxy_voting_wallet_1 ',
                        }
                    ]
                }
            }
        },

        created() {
            
            if (this.screenWidth < 770 ) {
							this.topAccounts.thead = this.topAccounts.thead2
						}else {
							this.topAccounts.thead = this.topAccounts.thead1
						}

        },

        mounted() {

						const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
						}

        },

        methods: {

				},
				watch: {

						screenWidth (val) {
                if (!this.timer) {
										this.screenWidth = val
										if (this.screenWidth < 770 ) {
											this.topAccounts.thead = this.topAccounts.thead2
										}else {
											this.topAccounts.thead = this.topAccounts.thead1
										}
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.timer = false
                    }, 400)
                }
            }

				}
    }
</script>
