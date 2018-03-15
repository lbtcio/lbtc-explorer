<style lang="less" scoped>
  @import "../styles/common.css";
	.monitor{
		// width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
			margin-right: auto;
			margin-left: auto;
			padding: 0 15px;
			.ivu-table-cell{
				padding-left: 12px;
				padding-right: 12px;
			}
			.ivu-table-tbody{
				a{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.ivu-table-cell{
					padding-left: 12px;
					padding-right: 12px;
				}
			}
		}
		h1{
        font-size: 36px;
        margin: 20px 0 15px 0;
        font-weight:400;
    }
    .ellipsis{
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hr{
      height: 1px;
      border-top: 1px solid #ddd;
      margin-bottom: 12px;
    }
    .monitor-1-item{
      padding: 10px;
    }
    .small-title{
      // background-color: red;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 1px;
      margin: 0 0 10px;
      text-transform: uppercase;
      padding-top: 6px;
      opacity: .7;
    }
    .tabItem{
      color: #4e5558;
      background-color: #fff;
      border-radius: 4px;
      padding: 10px 15px;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .tabItemAction{
      color: #fff;
      background-color: #4e5558;
		}
		.boxBlock{
			border-radius: 3px;
			color: white;
		}
		.Update-to-date{
			background-color: #4e5558;
			text-align: center;
			color: white;
			border-radius: 3px;
			font-size: 12px;
		}
		th .ivu-table-cell{
      padding-left: 12px;
      padding-right: 12px;
		}
		.fix{
			height: 100px;
		}
	}
</style>

<template>
  <div class="monitor">
    <div class="container">
      <h1>Delegate Monitor</h1>
      <div class="hr"></div>

      <Row style="padding: 20px 0;">

        <Row v-if="showStatus">
          <Col :xs="24" :md="24" style="padding:5px 12px">
							<Row>
          				<Table :columns="(screenWidth > 780)? ActiveDelegates.thead : ActiveDelegates.thead1" :data="listwitnesses" no-data-text=""></Table>								
							</Row>
							<Row class="fix" v-show="fixStatus">
								<Spin fix>
                	<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
							</Row>
							<!-- <Row>
								<div class="page" @click="previousPage($event)" v-if="page > 0">
									Previous page
								</div>
								<div class="page" @click="nextPage($event)" v-if="listwitnesses1.length > 0 && page < listwitnesses1.length - 1">
									Next page
								</div>
							</Row> -->
          </Col>
        </Row>
			<!-- 
				<Row style="" v-if="showStatus1">
          <Col :xs="24" :md="24" style="padding:5px 12px">
							<p class="small-title">STANDBY DELEGATES</p>
							<Row>
									<p class="mtb10 Update-to-date"><span>201</span> / <span>201</span>  Update-to-date</p>
							</Row>
              <Row>
          				<Table :columns="(screenWidth > 780)? ActiveDelegates.thead : ActiveDelegates.thead1" :data="listwitnesses2[page]" no-data-text=""></Table>
							</Row>
							<Row>
								<div class="page" @click="previousPage($event)" v-if="page > 0">
									Previous page
								</div>
								<div class="page" @click="nextPage($event)" v-if="listwitnesses2.length > 0 && page < listwitnesses2.length - 1">
									Next page
								</div>
							</Row>
          </Col>
        </Row>
			-->
      </Row>
      
    </div>
  </div>
</template>

<script>
	import config from "../config/config";

  export default {
    name: "monitor",
    components: {},
    data () {
      return {
        showStatus: true,
				showStatus1: false,
				page: 1,
				st: '',
        latestVotes: {
          thead: [
            {
              title: 'Voter',
              key: 'Voter',
              // width:'250px',
              render: (h, params) => {
                  return h('div', {
                      attrs: {
												title: params.row.Voter
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
													path: '/addrinfo', query: { addr: params.row.Voter }
												}
											}
										}, params.row.Voter)
                  ])
              }
            },
            {
              title: 'Transaction',
              key: 'Transaction',
              // width:'250px',
              render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Transaction
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
												path: '/transinfo', query: { txhash: params.row.Transaction }
											}
										}
									}, params.row.Transaction)
								])
              }
            },
            {
							title: 'Timestamp',
							key: 'Timestamp',
							// width:'180px',
							align: 'center',
							render: (h, params) => {
									return h( "span", params.row["Timestamp"]? params.row["Timestamp"] : 0)
							}
            },

          ],
          thead1: [
            {
              title: 'Voter',
              key: 'Voter',
              // width:'250px',
              render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Voter
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
												path: '/addrinfo', query: { addr: params.row.Voter }
											}
										}
									}, params.row.Voter)
								])
              }
            },
            {
							title: 'Timestamp',
							key: 'Timestamp',
							width:'180px',
							align: 'center',
							render: (h, params) => {
									return h( "span", params.row["Timestamp"]? params.row["Timestamp"] : 0)
							}
            },
          ],
          latestVotesList: []
        },
        newestDelegates: {
          thead: [
            {
              title: 'Delegate',
              key: 'Voter',
              // width:'250px',
              render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Voter
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
												path: '/addrinfo', query: { addr: params.row.Voter }
											}
										}
									}, params.row.Voter)
								])
              }
            },
            {
              title: 'Transaction',
              key: 'Transaction',
              // width:'250px',
              render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Transaction
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
												path: '/transinfo', query: { txhash: params.row.Transaction }
											}
										}
									}, params.row.Transaction)
								])
              }
            },
            {
							title: 'Timestamp',
							key: 'Timestamp',
							// width:'180px',
							align: 'center',
							render: (h, params) => {
									return h( "span", params.row["Timestamp"]? params.row["Timestamp"] : 0)
							}
            },
          ],
          thead1: [
            {
              title: 'Delegate',
              key: 'Voter',
              // width:'250px',
              render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.Voter
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
												path: '/addrinfo', query: { addr: params.row.Voter }
											}
										}
									}, params.row.Voter)
								])
              }
            },
            {
							title: 'Timestamp',
							key: 'Timestamp',
							// width:'180px',
							align: 'center',
							render: (h, params) => {
								return h( "span", params.row["Timestamp"]? params.row["Timestamp"] : 0)
							}
            },
          ],
          newestDelegatesList: []
				},

				ActiveDelegates: {
					thead: [
						{
							title: 'Rank',
							key: 'index',
							width: 90,
							align: 'center',
							sortable: true
						},
						{
              title: 'Name',
              key: 'name',
              sortable: true,
              render: (h, params) => {
                  return h('div', {
										attrs: {
											title: params.row.address
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
												path: '/addrinfo', query: { param: params.row.address,  fromdm: 'fromdm' }
											}
										}
									}, params.row.name)
								])
              }
						},
						{
							title: 'Address',
							key: 'address ',
							sortable: true,
							render: (h, params) => {
								return h('div', {
									attrs: {
										title: params.row.address
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
												path: '/addrinfo', query: { param: params.row.address,  fromdm: 'fromdm' }
											}
										}
									}, params.row.address)
								])
              }
						},
						{
							title: 'Votes',
							key:'count',
							sortable: true
						},
					],
					thead1: [
						{
							title: 'Rank',
							key: 'index',
							width: 90,
							align: 'center',
							sortable: true
						},
						{
              title: 'Name',
              key: 'name',
              sortable: true,
              render: (h, params) => {
								return h('div', {
										attrs: {
												title: params.row.address
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
													path: '/addrinfo', query: { param: params.row.address,  fromdm: 'fromdm' }
											}
										}
									}, params.row.name)
								])
              }
						},
						{
							title: 'Votes',
							key:'count',
							sortable: true,
						},
					]
				},
				fixStatus: false,
				sw: true,
				listwitnesses: [],
				listwitnesses1: [],
				listwitnesses2: []
      };
    },
    computed: {
      screenWidth() {
        return this.$store.state.screen.screenWidth
      },
    },
    created () {

			this.getDelegatesData();
			this.t();
			var _this = this;
			window.addEventListener('scroll',function(){  

				var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动高度
				var innerHeight = window.innerHeight;// 文档高度
				var offsetHeight = document.body.offsetHeight;// body高度
				var scrollHeight = document.documentElement.scrollHeight;//浏览器所有内容高度
				// 判断是否滚动到底部  
				if( innerHeight + scrollTop >= (offsetHeight - 30 )) {
					// 如果开关打开则加载数据
					// console.log(Math.ceil(_this.listwitnesses1.length / 100))
					if(_this.sw==true){
						// 将开关关闭  
						_this.sw = false;
						// console.log( '添加数据' );

						if (_this.page > 0 && _this.page < Math.ceil(_this.listwitnesses1.length / 100)) {
								_this.fixStatus = true;
								_this.page = _this.page + 1;
								_this.listwitnesses = _this.listwitnesses1.slice(0, _this.page*100);
								// 数据更新完毕，将开关打开
								_this.fixStatus = false;
								_this.sw = true;
						}
					}
				}
			});

    },
    mounted () {

		},
		destroyed () {
			// console.log('destroyed');
			window.clearInterval(this.st);
		},
    methods: {

			t () {
				this.st = window.setInterval( () => {
					this.getDelegatesData();
				},30000)
			},

			getDelegatesData () {

				var _this = this;
				$.getJSON(config.api.dev + 'getactive', function(data,status) {

					if (data.error) {
						_this.listwitnesses1 = [];						
					}else {
						//排序
						var result = [];
						var result1 = data.sort(_this.compare("count"));
								result1.forEach((item, index) => {
									item.index = 1 + index
								});

						// for(let i = 0 ,len = result1.length ;i < len;i +=100){
						// 	result.push( result1.slice(i, i+100) );
						// };
						_this.fixStatus = false;
						_this.listwitnesses1 = result1;
						_this.listwitnesses = _this.listwitnesses1.slice(0, _this.page * 100);
					}
					
				});
				
			},

			compare (property) {
				return function(obj1,obj2){
						var value1 = obj1[property];
						var value2 = obj2[property];
						// return value1 - value2;			// 升序
						return value2 - value1;					// 降序
				}
    	},

			nextPage() {
				// console.log('下一页');
				if (this.listwitnesses1.length > 0 && this.page < this.listwitnesses1.length) {
					window.scrollTo(0, 0);
					this.page = this.page + 1;
				}else{
					return
				}
        
      },
      
      previousPage() {
        // console.log('上一页')
        if (this.page > 0) {
					window.scrollTo(0, 0);
          this.page = this.page - 1;
        }else {
          return;
        }
      },

      switchShowStatus(e) {
        if (e == 1) {
          if (this.showStatus == false) {
            this.showStatus = true;
            this.showStatus1 = false;
          }else{
            return
          }
        }else if (e == 2) {
          if (this.showStatus1 == false) {
            this.showStatus1 = true;
            this.showStatus = false;            
          }else{
            return
          }
        }
      }
    },
    watch: {
			
    }
  }
</script>