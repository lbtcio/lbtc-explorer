<style lang="less" scoped>
	@import "../styles/common.css";
	.index{
		margin-bottom: 60px;
		a {
			&:hover {
				text-decoration:underline
			}
		}
	}
</style>
<template>
    <div class="index">

			<loader v-if="loading"></loader>

			<div class="container" v-if="!loading">

					<h2 class="pt25">Latest Blocks<p></p></h2>
					<div class="table-container">
						<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%" style="overflow:auto">
							<thead>
								<tr>
									<th>Height</th>
									<th style="min-width:200px">Timestamp</th>
									<th>Transactions</th>
									<th>Size</th>
									<th>Confirmations</th>
									<th>Version</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in LatestBlocks">
									<td>
										<router-link :to="{path:'/blockinfo',query: {param: item.height,}}"  class="ellipsis">{{item.height}}</router-link>          									
									</td>
									<td>{{item.time ? item.time : "--"}}</td>
									<td>{{item.tx ? item.txs : "--"}}</td>
									<td>{{item.size ? item.size : "--"}}</td>
									<td>{{index + 1}}</td>
									<td>{{item.version ? item.version : "--"}}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h2 style="margin-top: 50px;">Latest Transactions</h2>
					<div class="table-container">
						<table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%" style="word-wrap:break-word;">
							<thead>
								<tr>
									<th style="text-align: left">Transaction</th>
									<th style="min-width:200px">Timestamp</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in LatestTransactions">
									<td style="text-align: left">
										<router-link :to="{path:'/transinfo',query: {param: item.txhash,}}"  class="ellipsis">{{item.txhash}}</router-link>          									
									</td>
									<td>{{item.time ? item.time : "--"}}</td>
								</tr>
							</tbody>
						</table>
					</div>

			</div>

    </div>
</template>
<script>
	import {mapState} from "vuex";
	import config from "../config/config";
  import Loader from "./loader.vue";
	import moment from "moment";

	export default {

		name: "index",
		components: {
			Loader
		},
		computed: {
			loading() {
        return this.$store.state.index.loading;
      },
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
				
			}
		},
		filters: {
			dataFrm: function(el) {
				return moment(el * 1000).format("YYYY-MM-DD HH:mm:ss");
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
		},
		beforeDestroy () {
		},
		destroyed () {
			window.clearInterval(this.st);
		},
		methods: {

			t () {
				this.st = window.setInterval( () => {
					this.getIndexData();
				},15000)
			},

			getIndexData () {

				let _this = this;
				let _$store = this.$store
				$.getJSON(config.api.dev + 'index3',function(data,status){
					if (data.error) {
						_$store.commit('errorMessage', { status: true , msg: data.msg});
						setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
					} else {
						_this.$store.commit('getindexData', data);
					}
				});
			},


		},
		watch: {

		}
	}
</script>
