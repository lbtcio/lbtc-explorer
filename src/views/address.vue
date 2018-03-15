<style lang="less" scoped>
  @import "../styles/common.css";
  .address{
    // width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
			margin-right: auto;
      margin-left: auto;
      padding: 0 15px;
    }
    .border-bottom{
      border-bottom: 1px solid #e4e0e0;
    }
    .Summary-content{
      .ivu-col{
        height: 40px;
        line-height: 40px;
      }
    }
    h2{
      font-size: 32px;
      margin: 20px 0 15px 0;
      font-weight:400;
      span{
        padding-left: 16px;
        font-size: 20px;
      }
    }
    //过渡
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    small{
      font-size: 70%;
    }
    .address-border{
      padding: 10px;
      background-color: #eceff1;
      border: 1px solid #cfd8dc;
      p{
        line-height: 30px;
        width: 100%;
        word-break:break-word;
      }
    }
    .tag-container{
      overflow: hidden;
      .tag-block{
        margin: 10px;
        float: left;
      }
    }
    .Delegate-content{
      .ivu-row{
        border-bottom: 1px solid #e4e0e0;
      }
    }  
    .details{
      background-color: #eceff1;
      border-radius: 2px;
      margin: 20px 0 10px;
      padding: 15px;
      border: 1px solid #cfd8dc;
      .ivu-row{
        border-bottom: none;
        // margin: 10px 0;
      }
      .ivu-col{
        height: auto;
        line-height: 40px;
      }
      .panel{
        background-color: #fff;
        margin: 5px 0;
        padding: 0 15px;
        border: 1px solid #ddd;
      }
      .btn{
        border-radius: .25em;
        font-weight: 100;
        color: #fff;
        font-size: 13px;
        text-align: center;
      }
      .btnArr{
        .ivu-col{
          margin: 10px 0 10px 0;
        }
      }
    }
    .ellipsis{
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .details-header{
      // padding: 8px 0;
      // text-align: right;
    }
  }
</style>

<template>
  <div class="address">
    <div class="container">
      <!-- <h2>Address&nbsp;&nbsp;{{msg}}</h2> -->
      <h2>Address</h2>
      <div class="address-border">
        <p><strong>Address: </strong>{{addrinfo.addr}}</p>
      </div>
      <div class="Summary-content">
        <h2>Summary<span></span></h2>
        <Row :gutter="20">
          <Col :xs="24" :sm="24" :md="20" :lg="20" style="height:100%">
            <Row class="border-bottom">
              <Col span="12"><strong>Balance:</strong></Col>
              <Col span="12" style="text-align: right;">{{addrinfo.Balance ? addrinfo.Balance : '0'}}</Col>
            </Row>
            <Row class="border-bottom">
              <Col span="12"><strong>Received:</strong></Col>
              <Col span="12" style="text-align: right;">{{addrinfo.Received ? addrinfo.Received : '0'}}</Col>
            </Row>
            <Row class="border-bottom">
              <Col span="12"><strong>Sent:</strong></Col>
              <Col span="12" style="text-align: right;">{{addrinfo.Sent ? addrinfo.Sent : '0'}}</Col>
            </Row>
            <Row class="border-bottom">
              <Col span="12"><strong>Transactions in:</strong></Col>
              <Col span="12" style="text-align: right;">{{addrinfo['Transactions in'] ? addrinfo['Transactions in'] : '0'}}</Col>
            </Row>
            <Row class="border-bottom">
              <Col span="12"><strong>Transactions out:</strong></Col>
              <Col span="12" style="text-align: right;">{{addrinfo['Transactions out'] ? addrinfo['Transactions out'] : '0'}}</Col>
            </Row>
          </Col>
          <Col :xs="24" :sm="24" :md="4" :lg="4" style="height:100%;text-align:center">
            <img :src="'http://qr.liantu.com/api.php?text=' + address" alt="" srcset="" style="max-width:180px">
            
          </Col>
        </Row>
      </div>

      <div class="Votes-content" v-if="Votes.length > 0">
        <h2 @click="VotesStatus = !VotesStatus" style="cursor:pointer;"><small v-if="!VotesStatus"><Icon type="plus-round"></Icon></small><small v-if="VotesStatus"><Icon type="minus-round"></Icon></small>Votes<span>{{Votes.length}}</span></h2>
        <!-- <transition name="fade"> -->
        <div class="tag-container" v-if="VotesStatus">
          <router-link v-for="item in Votes" :to="{path:'/addrinfo',query: {addr: item.witness}}" :key="item.id" class="tag-block">{{item.witness}}</router-link>
        </div>
        <!-- </transition> -->
      </div>

      <div class="Voters-content" v-if="Voters.length > 0">
        <h2 @click="VotersStatus = !VotersStatus" style="cursor:pointer;"><small v-if="!VotersStatus"><Icon type="plus-round"></Icon></small><small v-if="VotersStatus"><Icon type="minus-round"></Icon></small>Voters<span>{{Voters.length}}</span></h2>
        <!-- <transition name="fade"> -->
        <div class="tag-container" v-if="VotersStatus">
          <router-link v-for="item in Voters" :to="{path:'/addrinfo',query: {addr: item}}" :key="item" class="tag-block">{{item}}</router-link>
        </div>
        <!-- </transition> -->
      </div>

      <div class="Transactions-content">
        <h2>Transactions</h2>
        <Row class="loading" v-if="loading">
          Loading Transactions……
        </Row>
        <Row class="alert-warning" v-if="noData">
          <span>There are no transactions involving this address.</span>
        </Row>
        <div class="details" v-if="haveData" v-for="item in addrTable" :key="JSON.stringify(item.txinfo)">

            <Row class="details-header">
              <Col :xs="24" :md="13" class="ellipsis">
                <router-link :to="{path:'/transinfo',query: {txhash: item.tx}}" :title="item.tx" class="ellipsis">{{item.tx}}</router-link>
              </Col>
              <Col :xs="24" :md="11" class="ellipsis" style="text-align: right;">
                <!-- <Col span="12" class="ellipsis">
                  <strong>Block : </strong>{{item.block}}
                </Col> -->
                <!-- <Col span="8" class="ellipsis">
                  <strong>Balance : </strong>{{item.balance ? Number(item.balance).toFixed(2) : 0}}
                </Col> -->
                <!-- <Col span="12" class="ellipsis" :title="item.time" style="text-align: right;">
                  <strong>Time : </strong>{{item.time}}
                </Col> -->
                {{item.time}}
              </Col>
            </Row>
            <Row>
              <Col :xs="24" :md="11" style="min-height:40px">
                <Row v-for="item1 in item.Inputs" :key="item['ScriptSig']" class="panel">
                  <Col span="18" class="ellipsis">
                    <span v-if="item1['From address'].length < 15 || item1['From address'] == address" >{{item1['From address']}}</span>

                    <router-link v-if="item1['From address'].length >= 15 && item1['From address'] != address" :to="{path:'/addrinfo',query: {addr: item1['From address']}}" :title="item1['From address']">{{item1['From address']}}</router-link>
                  </Col>
                  <Col span="6" class="ellipsis" style="text-align: right;">{{item1['Amount']}}</Col>
                </Row>
              </Col>
              <Col :xs="0" :md="2" style="text-align: center;">
                <Row style="margin:5px 0">
                  <div><Icon type="arrow-right-a"></Icon></div>
                </Row>
              </Col>
              <Col :xs="24" :md="0" style="text-align: center;">
                <Row style="margin:5px 0">
                  <div><Icon type="arrow-down-a"></Icon></div>
                </Row>
              </Col>
              <Col :xs="24" :md="11" style="min-height:40px">
                <Row v-for="item2 in item.Outputs" :key="item2['ScriptPubKey']"  class="panel">
                  <Col span="18" class="ellipsis">
                    <span v-if="item2['To address'] == address || item2['To address'].length < 15 ">{{item2['To address']}}</span>

                    <router-link v-if="item2['To address'].length >= 15 && item2['To address'] != address" :to="{path:'/addrinfo',query: {addr: item2['To address']}}" :title="item2['To address']">{{item2['To address']}}</router-link>
                  </Col>
                  <Col span="6" class="ellipsis" style="text-align: right;">{{item2['Amount']}}</Col>
                </Row>
              </Col>
            </Row>
            <!-- <Row  :gutter="20" class="btnArr">
              <Col :sm="24" :md="4"><div class="btn" style="background-color: #6c7b84;">Block:{{item.block}}</div></Col>
              <Col :sm="24" :md="4"><div class="btn" style="background-color: #454c50;">Amount:{{item.amount}}</div></Col>
              <Col :sm="24" :md="4"><div class="btn" style="background-color: #377096;">Balance:{{item.balance}}</div></Col>
            </Row> -->

        </div>
        <Row>
          <!-- <div class="page" @click="nextPage($event)" v-if="Math.ceil(totalpage/20) > 1 && page < Math.ceil(totalpage/20)"> -->
          <div class="page" @click="previousPage($event)" v-if="page > 1 && haveData">
            Previous page
          </div>
          <div class="page" @click="nextPage($event)" v-if="totalpage > 1 && page < totalpage && haveData">
            Next page
          </div>
          
        </Row>
      </div>
        
    </div>
  </div>
</template>

<script>
  import config from "../config/config";

  export default {
    name: "address",
    components: {},
    data () {
      return {
        address: '',
        VotesStatus: false,
        VotersStatus: false,
        loading: true,
        noData: false,
        haveData: false,
        // errorMsg: '',
        // msg: '',
        previousFullPath: '',
        // addrinfo: '',
        // addrTable: '',
        page: 1,
        // totalpage: '',
        // transTable: [],
        Delegate:'',
        Votes:[],
        Voters:[],
      }
    },
    computed: {
      addrinfo() {
        var result = this.$store.state.address.addrinfo;
        return result;
      },
      addrTable() {
        var result = this.$store.state.address.addrTable;
        return result;
      },
      totalpage() {
        var result = this.$store.state.address.totalpage;
        return result;
      },
    },
    created () {
      
      

    },
    mounted () {

      this.address = this.$route.query.addr;

      // console.log(this.$route)

      if (this.$route.query.from ) {

        // console.log('address search')

        var _this = this;
        // this.msg = '';
        // this.errorMsg = '';
        this.loading = false;
        this.noData = false;
        this.haveData = true;
        if (this.addrinfo.addr) {

          // console.log('8888')
          // console.log(this.addrinfo.addr);

          $.getJSON(config.api.dev + 'getvotersbywitness', { 'param': this.address }, function(data1,status1) {
            if (data1.error) {
              return
            }else {
              if (data1.result.length > 0) {
                _this.Voters = data1.result
              }
            }
          });
          $.getJSON(config.api.dev + 'getvotebyaddress', { 'param': this.address }, function(data2,status2) {
            if (data2.error) {
              return
            }else {
              if (data2.result.length > 0) {
                _this.Votes = data2.result
              }
            }
          });
        }else{

          // console.log('9999')
          
          this.getTransinfo('search3', { 'param': this.address }, { 'param': this.address });
        }

      }else if (this.$route.query.fromdm) {

        // console.log('from delegate-monitor');

        this.getTransinfo('search3', { 'param': this.address }, { 'param': this.address });

      }else {

        // console.log('adderss info')

        this.getTransinfo('addrinfo2', { 'addr': this.address }, { 'param': this.address });

      }
      
    },
    methods: {

      getTransinfo(type, getData, argu) {
        
        // this.$Loading.start();
        var _this = this;

        $.getJSON(config.api.dev + type, getData ,function(data,status){

          if (data.error) {
            _this.$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000)

            _this.loading = false;
            _this.noData = true;
            _this.haveData = false;
          }else{
            // _this.msg = '';
            // _this.errorMsg = '';
            _this.loading = false;
            _this.noData = false;
            _this.haveData = true;

            _this.$store.commit('getaddressData', data);

            // _this.totalpage = data.totalpage;
            // _this.addrinfo = data.addrinfo;
            // _this.transTable = data.addrTable;

            //console.log(window.Math.ceil(_this.totalpage/20));
            // _this.addrTable = data.addrTable;

            // console.log(data);

            // var result = [];
						// for(let i = 0 ,len = data.addrTable.length ;i < len;i +=20){
						// 	result.push( data.addrTable.slice(i, i+20) );
						// };
						// _this.transTable = result;

            // console.log(_this.addrinfo);
            // console.log(_this.addrTable);
            // console.log(_this.transTable);
          }

        });

        // $.getJSON(config.api.dev + 'getvotersbywitness', { 'param': getData}, function(data1,status1) {
        $.getJSON(config.api.dev + 'getvotersbywitness', argu, function(data1,status1) {

          if (data1.error) {
            // _this.$Message.error(data1.msg);
            // console.log(data1.msg);
            return
          }else {
            if (data1.result.length > 0) {
              _this.Voters = data1.result
            }
          }
        });

        // $.getJSON(config.api.dev + 'getvotebyaddress', { 'param': getData}, function(data2,status2) {
        $.getJSON(config.api.dev + 'getvotebyaddress', argu, function(data2,status2) {

          if (data2.error) {
            // _this.$Message.error(data2.msg);
            // console.log(data2.msg);
            return
          }else {
            if (data2.result.length > 0) {
              _this.Votes = data2.result
            }
          }
        });

      },

      nextPage() {
				// console.log('下一页');
        if ( this.totalpage > 1 && this.page < this.totalpage ) {
          // this.$Loading.start();
          window.scrollTo(0, 60);
          this.page = this.page + 1;
          var _this = this;
          $.getJSON(config.api.dev + 'addrinfo2', { 'addr': this.address, 'page': _this.page} ,function(data,status){
            
            _this.loading = true;
            _this.noData = false;
            _this.haveData = false;

            if (data.error) {
              _this.loading = false;
              _this.noData = true;
              _this.haveData = false;
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
              this.page = this.page - 1;
            }else{
              _this.loading = false;
              _this.noData = false;
              _this.haveData = true;
              // _this.transTable = data.addrTable;
              _this.$store.commit('getaddressData', data);
            }

          })
        }else{
          return
        }
        
      },
      
      previousPage() {
        // console.log('上一页')
        if (this.page > 1) {
          // this.transTable = [];
          window.scrollTo(0, 60);
          this.page = this.page - 1;
          var _this = this;
          $.getJSON(config.api.dev + 'addrinfo2', { 'addr': this.address, 'page': _this.page} ,function(data,status){
            
            _this.loading = true;
            _this.noData = false;
            _this.haveData = false;

            if (data.error) {
              _this.loading = false;
              _this.noData = true;
              _this.haveData = false;
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
              this.page = this.page + 1;
            }else{
              _this.loading = false;
              _this.noData = false;
              _this.haveData = true;
              // _this.transTable = data.addrTable;
              _this.$store.commit('getaddressData', data);

            }

          })
        }else {
          return;
        }
      },

    },
    activated() {
      // console.log('aaaa')
    },
    deactivated() {
      // console.log('bbbb')
    },
    watch: {
      '$route' (to, from) {

        // console.log(to)
        // console.log(from)
        // console.log('addr router')

        var _this = this;
        this.address = this.$route.query.addr;

        if (this.previousFullPath != from.fullPath && this.$route.query.from && this.addrinfo.addr == to.query.addr ) {
          // console.log('watch search addr')
          $.getJSON(config.api.dev + 'getvotersbywitness', { 'param': this.address }, function(data1,status1) {
            if (data1.error) {
              return
            }else {
              if (data1.result.length > 0) {
                _this.Voters = data1.result
              }
            }
          });
          $.getJSON(config.api.dev + 'getvotebyaddress', { 'param': this.address }, function(data2,status2) {
            if (data2.error) {
              return
            }else {
              if (data2.result.length > 0) {
                _this.Votes = data2.result
              }
            }
          });
        }
        this.previousFullPath = from.fullPath;

        if (this.addrinfo.addr && from.meta.title == to.meta.title && this.addrinfo.addr != to.query.addr) {
          this.getTransinfo('addrinfo2', { 'addr': to.query.addr }, { 'param': to.query.addr });
          // console.log('houtui');
        }

      }
    }
  }
</script>