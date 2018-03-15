<style lang="less" scoped>
  @import "../styles/common.css";
  .block{
    // width: 1170px;
		margin: 100px 0 60px 0;
		font-size: 14px;
		.container{
			margin-right: auto;
      margin-left: auto;
      padding: 0 15px;
    }
    .Summary-content{
      .ivu-row{
        border-bottom: 1px solid #e4e0e0;
      }
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
        font-size: 16px;
        color: #726c6c;
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
    .tag-block{
      margin: 10px;
    }
    
    // .Transactions-content{
    //   .ivu-row{
    //     // border-bottom: none;
    //     // margin: 10px 0;
    //   }
    // }
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
        // height: 40px;
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
      .alert-warning{
        // border-bottom: none;
        color: #454545;
        background-color: #dcd6cf;
        padding: 15px;
        // border: 1px solid #454545;
        border-radius: 4px;
        margin-bottom: 20px;
        // border-bottom: 1px solid #e4e0e0;
      }
    }
    .ellipsis{
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
    }
    .h2-loading{
      position: relative;
      height: 24px;
      width: 24px;
      display: inline-block;
    }
  }
</style>

<template>
  <div class="block">
    <div class="container">
      <h2>Block&nbsp;&nbsp;<span>{{blockinfo.height ? blockinfo.height : 0}}</span></h2>
      <div class="address-border">
        <p><strong>Block Hash: </strong>{{blockinfo.hash ? blockinfo.hash : 0}}</p>
      </div>
      <div class="Summary-content">
        <h2>Summary<span></span></h2>
        <Row>
          <Col span="12"><strong>Transactions:</strong></Col>
          <Col span="12" style="text-align: right;">{{blockinfo.tx ? blockinfo.tx.length : 0}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Time:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{blockinfo.time ? blockinfo.time : 0}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Transaction Merkle Root:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{blockinfo.merkleroot ? blockinfo.merkleroot :0}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Previous Block Hash:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/blockinfo',query: {param: blockinfo.previousblockhash,}}"  class="ellipsis">{{blockinfo.previousblockhash}}</router-link>          
          </Col>
        </Row>
        <Row>
          <Col span="12"><strong>Next Block Hash:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/blockinfo',query: {param: blockinfo.nextblockhash}}"  class="ellipsis">{{blockinfo.nextblockhash}}</router-link>                    
          </Col>
        </Row>
     
      </div>

      <div class="Delegate-content" v-if="Delegate">
        <h2>Delegate<span></span></h2>
        <Row>
          <Col span="12"><strong>Name:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.Name}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Uptime:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.Uptime}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Rank / Status:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.RankStatus}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Approval:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.Approval}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Forged:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.Forged}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Blocks:</strong></Col>
          <Col span="12" style="text-align: right;">{{Delegate.Blocks}}</Col>
        </Row>
      </div>

      <div class="Transactions-content">
        <h2>Transactions
          <div class="h2-loading" style="position: relative;" v-if="h2Loading">
            <Spin fix>
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
          </div>
        </h2>
        <Row class="loading" v-if="loading">
          Loading Transactions……
        </Row>
        <Row class="alert-warning" v-if="noData">
          There are no transactions involving this block.
        </Row>
        <div class="details" v-if="haveData" v-for="item in blockTable" :key="item.result.hash">

          <div class="blockTableItem">

            <Row>
              <Col span="24" class="ellipsis">
                <router-link :to="{path:'/transinfo',query: {param: item.result.hash}}"  class="ellipsis">{{item.result.hash}}</router-link>
              </Col>
            </Row>

            <Row>
              <Col :xs="24" :md="11" style="min-height:40px">
                <Row v-if="item.result.vin[0].coinbase" class="panel">
                  <Col span="24">CoinBase</Col>
                </Row>
                <Row v-if="!item.result.vin[0].coinbase" v-for="item1 in item.result.vin" :key="item1.txid" class="panel">
                  <Col span="18" class="ellipsis">
                    <router-link :to="{path:'/addrinfo',query: {param: item1.addr}}">{{item1.addr}}</router-link>
                  </Col>
                  <Col span="6" style="text-align: right;">{{item1.value}}</Col>
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
                <Row v-for="item2 in item.result.vout" :key="item2.scriptPubKey.asm" class="panel">
                  <Col span="18" class="ellipsis" v-if="!item2.scriptPubKey.addresses">
                    Unknown
                  </Col>
                  <Col span="18" class="ellipsis" v-if="item2.scriptPubKey.addresses">
                    <router-link :to="{path:'/addrinfo',query: {param: item2.scriptPubKey.addresses[0]}}">{{item2.scriptPubKey.addresses[0]}}</router-link>
                  </Col>
                  <Col span="6" style="text-align: right;">{{item2.value}}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>

        <Row>
          <div class="page" @click="previousPage($event)" v-if="page > 1 && haveData">
            Previous page
          </div>
          <div class="page" @click="nextPage($event)" v-if="Math.ceil(totalpage/20) > 1 && page < Math.ceil(totalpage/20) && haveData">
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
    name: "block",
    components: {},
    data () {
      return {
        block: '',
        VotesStatus: false,
        VotersStatus: false,
        previousFullPath: '',
        // blockinfo: {},
        page: 1,
        // blockTable: '',
        h2Loading: false,
        loading: true,
        noData: false,
        haveData: false,
        // msg: '',
        Delegate:'',
        Votes:null,
        Voters:null,
      };
    },
    computed: {
      totalpage() {
        return this.$store.state.block.totalpage;
      },
      blockinfo() {
        return this.$store.state.block.blockinfo;
      },
      blockTable() {
        return this.$store.state.block.blockTable;
      },
    },
    created () {

      this.block = this.$route.query.param;

      if (this.$route.query.from) {

        // console.log("搜索");
        this.loading = false;
        this.noData = false;
        this.haveData = true;

        if (this.blockinfo.height) {
          // console.log('8888')
        }else{
          this.getBlockInfo('search3', { 'param': this.block });
          // console.log('9999')
        }

      }else {
        // console.log("直接请求")
        if ( this.block.length == 64 ) {
          this.getBlockInfo('getblockbyhash', { 'param': this.block });
        } else {
          this.getBlockInfo('getblockinfo', { 'param': this.block });
        }

      }

    },
    mounted () {

    },
    methods: {

      getBlockInfo ( type, getData) {
        var _this = this;
        $.getJSON(config.api.dev + type, getData, function(data,status){
          _this.loading = true;
          _this.noData = false;
          _this.haveData = false;
          if (data.error) {
            // console.log(data.error);
            _this.$store.commit('errorMessage', { status: true , msg: data.error.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000)
            _this.loading = false;
            _this.noData = true;
            _this.haveData = false;
          }else{
            // console.log(data);
            _this.$store.commit('getblockData', data);
            _this.loading = false;
            _this.noData = false;
            _this.haveData = true;
          }
        });
      },

      nextPage() {
        this.block = this.$route.query.param;
        if (this.page < Math.ceil(this.totalpage/20) && Math.ceil(this.totalpage/20) > 1) {
          window.scrollTo(0, 0);
          this.h2Loading = true;
          this.page = this.page + 1;
          var _this = this;
          var type = '';
          if ( this.block.length == 64 ) {
            type = 'getblockbyhash'
          } else {
            type = 'getblockinfo'
          }
          //http://47.75.2.152:80/getblockbyhash?param=000000000000000000178c2a954e95bc58d1ea6a3a8ddcf968d52a4cecfcc74a&page=2
          $.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
            _this.loading = true;
            _this.noData = false;
            _this.haveData = false;
            if (data.error) {
              _this.loading = false;
              _this.noData = true;
              _this.haveData = false;
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000)
              _this.h2Loading = false;
              _this.page = _this.page - 1;
            } else {
              _this.loading = false;
              _this.noData = false;
              _this.haveData = true;
              _this.$store.commit('getblockData', data);
              _this.h2Loading = false;
            }
          })

        }
      },

      previousPage() {
        this.block = this.$route.query.param;
        if (this.page > 1) {
          window.scrollTo(0, 0);
          this.h2Loading = true;
          this.page = this.page - 1;
          var _this = this;
          var type = '';
          if ( this.block.length == 64 ) {
            type = 'getblockbyhash'
          } else {
            type = 'getblockinfo'
          }
          // this.getBlockInfo('getblockinfo', { 'param': this.block });
          $.getJSON(config.api.dev + type ,{ 'param': this.block, page: this.page}, function( data, status) {
            _this.loading = true;
            _this.noData = false;
            _this.haveData = false;
            if (data.error) {
              _this.loading = false;
              _this.noData = true;
              _this.haveData = false;
              _this.$store.commit('errorMessage', { status: true , msg: data.msg});
              setTimeout(() =>_$store.commit('errorMessage', { status: false , msg: ''}),3000);
               _this.h2Loading = false;
              _this.page = _this.page + 1;
            } else {
              _this.loading = false;
              _this.noData = false;
              _this.haveData = true;
              // console.log(this.page);
              // console.log(data);
              _this.$store.commit('getblockData', data);
              _this.h2Loading = false;
            } 
          })
        }
      }
      
    },
    watch: {
      '$route' (to, from) {
        // console.log(from)
        // console.log(to)
        // console.log(to.query.param.length ==64 )

        if (this.blockinfo.height && from.meta == to.meta && this.blockinfo.height != to.query.param) {
          if ( to.query.param.length == 64 ) {
            this.getBlockInfo('getblockbyhash', { 'param': to.query.param });
          } else {
            this.getBlockInfo('getblockinfo', { 'param': to.query.param });
          }
          // console.log('houtui');
        }
      }
    }


  }
</script>