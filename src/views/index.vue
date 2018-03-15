<style scoped lang="less">
	@import "../styles/common.css";
	.index{
		// width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
				margin-right: auto;
				margin-left: auto;
				padding: 0 15px;
				h1{
					font-size: 36px;
					margin: 20px 0 15px 0;
					font-weight:400;
				}
				.search-show {
					// display: none;
					border-color: #e7e7e7;
					margin-top: 23px;
					margin-left: 15px;
					#search-form{
						width: 100%;
					}
					.message{
						position: absolute;
						top: 32px;
						// height: 36px;
						width: 100%;
						line-height: 36px;
						text-align: center;
						font-size: 16px;
						border-radius: 3px;
						// border: 1px solid #ee2828;
						background-color: #636161;
						color: #ffffff;
						letter-spacing: 1px;
					}
					.ivu-spin-fix {
						border: 1px solid #dddee1!important;
						border-radius: 4px!important;
					}
					.ivu-spin-fix .ivu-spin-main {
						top: 53%!important;
						left: 94%!important;
					}
				}
				.ivu-table-tbody{
					a{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
		}
		.seeBlocks{
			display: inline-block;
			padding: 8px 12px;
			margin-bottom: 0;
			font-size: 14px;
			font-weight: 400;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			border: 1px solid #ddd;
			border-radius: 3px;
		}
		.ivu-table table{
			font-size: 14px;
		}
	}
</style>
<template>
    <div class="index">
        <div class="container">
						<Row  class="search-show" v-if="screenWidth <= 700">
							<Col span="24">
								<Input id="search-form" :disabled="enterStatus" class="search-form" v-model="searchText" placeholder="Find a block, transaction, address or delegate" @on-enter="searchTextEnter()"></Input>
							</Col>
							<div class="message" v-if="errorShow">
								{{Message}}
							</div>
							<Spin fix v-if="searchLoading">
								<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
							</Spin>
						</Row>
						<h1>Latest Blocks<p></p></h1>
            <Table :columns="(screenWidth > 650) ? Blocks.thead : Blocks.thead1" :data="LatestBlocks" no-data-text=""></Table>
						<!-- <Row v-if="LatestBlocks != []">
							<Col span="24" style="text-align:center;padding: 10px">
								<router-link to="/blocks" class="seeBlocks">See all blocks</router-link>
							</Col>
						</Row> -->
            <h1 style="margin-top: 50px;">Latest Transactions</h1>
            <!-- <Table :columns="(screenWidth > 998 ) ? Transactions.thead : ((screenWidth > 600 ? Transactions.thead1 : Transactions.thead2)) " :data="LatestTransactions" no-data-text=""></Table> -->
            <Table :columns="(screenWidth > 650) ? Transactions.thead : Transactions.thead3" :data="LatestTransactions" no-data-text=""></Table>
            
        </div>
    </div>
</template>
<script>
	import {mapState} from "vuex";
	import config from "../config/config";
	import moment from "moment"

	export default {

		name: "index",
		components: {},
		computed: {
			screenWidth() {
				return this.$store.state.screen.screenWidth
			},
			errorShow() {
				return this.$store.state.error.errorShow
			},
			Message() {
				return this.$store.state.error.Message
			},
			LatestTransactions() {
				return this.$store.state.index.LatestTransactions
			},
			LatestBlocks() {
				return this.$store.state.index.LatestBlocks
			}
		},
		
		data() {
			return{
				searchText: '',
				searchLoading: false,
        enterStatus: false,
				st: '',
				Transactions:{
					thead:[
						{
							title: 'Transaction',
							key: 'Transaction',
							// width:'530px',
							render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.txhash
									},
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									},
								}, [
									h('router-link', {
										props: {
											to: {
												path: '/transinfo', query: { param: params.row.txhash }
											}
										}
									}, params.row.txhash)
								])
							}
						},
						{
							title: 'Time',
							key: 'Time',
							align: 'center',
							// width: '175px',
							render: (h, params) => {
									return h( "span", params.row.time ? params.row.time : 0)
							}
						},
					],
					thead3:[
						{
							title: 'Transaction',
							key: 'Transaction',
							render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.txhash
									},
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									},
								}, [
									h('router-link', {
										props: {
											to: {
												path: '/transinfo', query: { param: params.row.txhash }
											}
										}
									}, params.row.txhash)
								])
							}
						},
						{
							title: 'Time',
							key: 'Time',
							align: 'center',
							width: '170px',
							render: (h, params) => {
									return h( "span", params.row.time ? params.row.time : 0)
							}
						},
					],
					thead1:[
						{
							title: 'Transaction',
							key: 'Transaction',
							width:'200px',
							render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Hash
									},
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									},
								}, [
									h('router-link', {
										props: {
											to: {
												path: '/transinfo', query: { txhash: params.row.Hash }
											}
										}
									}, params.row.Hash)
								])
							}
						},
						{
							title: 'Time',
							key: 'Time',
							align: 'center',
							width: '175px',
							render: (h, params) => {
									return h( "span", params.row["Appeared in"] ? params.row["Appeared in"] : 0)
							}
						},
						{
							title: 'Total in',
							key: 'Total in',
							align: 'right',
							render: (h, params) => {
									return h( "span", params.row['Total in'] ? params.row['Total in'] : 0)
							}
						},
						{
							title: 'Total out',
							key: 'Total out',
							align: 'right',
							render: (h, params) => {
									return h( "span", params.row['Total out'] ? params.row['Total out'] : 0)
							}
						},
						{
							title: 'Fee',
							key: 'Transaction Fees',
							align: 'right',
							render: (h, params) => {
									return h( "span", params.row.Fee ? params.row.Fee : 0)
							}
						},
					],
					thead2:[
						{
							title: 'Transaction',
							key: 'Transaction',
							width:'200px',
							render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Hash
									},
									style: {
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									},
								}, [
									h('router-link', {
										props: {
											to: {
												path: '/transinfo', query: { txhash: params.row.Hash }
											}
										}
									}, params.row.Hash)
								])
							}
						},
						{
							title: 'Total in',
							key: 'Total in',
							align: 'right',
							render: (h, params) => {
									return h( "span", params.row['Total in'] ? params.row['Total in'] : 0)
							}
						},
						{
							title: 'Total out',
							key: 'Total out',
							align: 'right',
							render: (h, params) => {
									return h( "span", params.row['Total out'] ? params.row['Total out'] : 0)
							}
						},
					]
				},
				Blocks:{
					thead:[
						{
							title: 'Height',
							key: 'result.height',
							render: (h, params) => {
								return h('div', [
									h('router-link', {
										props: {
											to: {
												path: '/blockinfo', query: { param: params.row.height }
											}
										}
									}, params.row.height)
								])
							}
						},
						{
							title: 'Timestamp',
							key: 'Approx.Time',
							width:'180px',
							align: 'center',
							render: (h, params) => {
								return h( "span", params.row.time ? params.row.time : 0)
							}
						},
						{
							title: 'Transactions',
							key: 'Transactions',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.tx ? params.row.tx.length : 0)
							}
						},
						{
							title: 'Size',
							key: 'size',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.size ? params.row.size : 0)
							}
						},
						{
							title: 'Confirmations',
							key: 'confirmations',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.confirmations ? params.row.confirmations : 0)
							}
						},
						{
							title: 'Version',
							key: 'version',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.version ? params.row.version : 0)
							}
						},
					],
					thead1:[
						{
							title: 'Height',
							key: 'result.height',
							render: (h, params) => {
								return h('div', [
									h('router-link', {
										props: {
											to: {
												path: '/blockinfo', query: { param: params.row.height }
											}
										}
									}, params.row.height)
								])
							}
						},
						{
							title: 'Timestamp',
							key: 'Approx.Time',
							width:'180px',
							align: 'center',
							render: (h, params) => {
								return h( "span", params.row.time ? params.row.time : 0)
							}
						},
						{
							title: 'Transactions',
							key: 'Transactions',
							align: 'right',
							render: (h, params) => {
								return h( "span", params.row.tx ? params.row.tx.length : 0)
							}
						}
					],
				}
			}
		},
		filters: {
			dataFrm: function(el) {
				return moment(el).format("YYYY-MM-DD HH:mm:ss");
			}
		},
		created() {
			this.getIndexData();
			this.t();
	
		},
		
		beforeMount() {

		},

		mounted() {

		},
		beforerouteleave () {
			// console.log('beforerouteleave');
		},
		beforeDestroy () {
			// console.log('beforeDestroy');
		},
		destroyed () {
			// console.log('destroyed');
			window.clearInterval(this.st);
		},
		methods: {

			t () {
				this.st = window.setInterval( () => {
					this.getIndexData();
					// console.log('setInterval');
				},30000)
			},

			getIndexData () {

				let _this = this;
				let _$store = this.$store
				$.getJSON(config.api.dev + 'index3',function(data,status){
						// console.log(data);
						if (data.error) {
							_$store.commit('errorMessage', { status: true , msg: data.msg});
							setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
						} else {
							_this.$store.commit('getindexData', data);
						}
				});
			},

			searchTextEnter() {
        var _this = this;
        var _$store = this.$store;
        this.searchLoading = true;
        this.enterStatus = true;

        $.getJSON( config.api.dev + 'search3', { 'param': this.searchText }, function( data, status) {
          if (data.error) {
            // console.log("错误")
            // console.log(data);
            _$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000);
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;

          }else if (data.addr) {
            // console.log("地址")
            // console.log(data);
            _this.$store.commit('getaddressbalance', data);
            _this.$router.push({path: '/addrinfo', query: {param: data.addr,from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;

          }else if (data.result) {
            // console.log("交易")
            // console.log(data);
            _this.$store.commit('gettransactionData', data);
            _this.$router.push({path: '/transinfo', query: {param: _this.searchText,from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;

          }else if (data[0].result) {
            // console.log("块")
            // console.log(data);
            _this.$store.commit('getblockData', data);
            _this.$router.push({path: '/blockinfo', query: {param: _this.searchText,from: 'search'}});
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;

          } else {
            _this.searchText = '';
            _this.searchLoading = false;
            _this.enterStatus = false;

          }
        })
      }

		},
		watch: {

		}
	}
</script>
