<style lang="less" scoped>
  @import "../styles/common.css";
  .transaction{
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
        padding-left: 14px;
        color: #726c6c;
      }
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
  }
</style>

<template>
  <div class="transaction">
    <div class="container">
      <h2>Transaction&nbsp;&nbsp;&nbsp;</h2>
      <div class="address-border">
        <p><strong>Transaction ID: </strong>{{txinfo.hash}}</p>
      </div>
      <div class="Summary-content">

        <h2>Summary</h2>
        <!-- <Row>
          <Col span="12"><strong>Block:</strong></Col>
          <Col span="12" style="text-align: right;">{{ txinfo.BlockHeight ? txinfo.BlockHeight : 0}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Time:</strong></Col>
          <Col span="12" style="text-align: right;">{{ txinfo.Time ? txinfo.Time : 0 }}</Col>
        </Row> -->
        <Row>
          <Col span="12"><strong>Number of inputs:</strong></Col>
          <Col span="12" style="text-align: right;">{{vinlen}}</Col>
        </Row>
        
        <Row>
          <Col span="12"><strong>Number of outputs:</strong></Col>
          <Col span="12" style="text-align: right;">{{voutlen}}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Size:</strong></Col>
          <Col span="12" style="text-align: right;">{{txinfo.size ? txinfo.size : 0 }}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Total in:</strong></Col>
          <Col span="12" style="text-align: right;">{{total.totalin ? total.totalin : 0 }}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Total out:</strong></Col>
          <Col span="12" style="text-align: right;">{{total.totalout ? total.totalout : 0 }}</Col>
        </Row>
        <Row>
          <Col span="12"><strong>Status:</strong></Col>
          <Col span="12" style="text-align: right;">{{txinfo.confirmations ? 'Confirmed' : 'Unconfirmed' }}</Col>
        </Row>
      </div>

      <div class="Transactions-content">
        <h2>Details</h2>
        <Row class="alert-warning" v-if="noData">
          There are no transaction.
        </Row>
        <div class="details" v-if="haveData">
          <Row>
            <Col span="24" class="ellipsis">
              <span class="ellipsis">{{txinfo.hash}}</span>
            </Col>
          </Row>
          <Row>
            <Col :xs="24" :md="11" style="min-height:40px">
              <Row v-if="item.coinbase" v-for="item in txinfo.vin" :key="JSON.stringify(item)" :DATA="JSON.stringify(item)" class="panel">
                <Col span="24">CoinBase</Col>
              </Row>
              <Row v-if="item.addr" v-for="item in txinfo.vin" :key="JSON.stringify(item)" :DATA="JSON.stringify(item)" class="panel">
                <Col :data="item.addr" span="18" class="ellipsis">
                  <router-link :data="item.addr" :to="{path:'/addrinfo',query: {param: item.addr}}">{{item.addr}}</router-link>
                </Col>
                <Col span="6" style="text-align: right;">{{item.value}}</Col>
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
              <Row v-for="item in txinfo.vout" :key="item.addr"  class="panel">
                <Col span="18" class="ellipsis" v-if="!item.scriptPubKey.addresses">
                  Unknown
                </Col>
                <Col span="18" class="ellipsis" v-if="item.scriptPubKey.addresses">
                  <router-link :to="{path:'/addrinfo',query: {param: item.scriptPubKey.addresses[0]}}">{{item.scriptPubKey.addresses[0]}}</router-link>
                </Col>
                <Col span="6" style="text-align: right;">{{item.value}}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
  import config from "../config/config";
  import moment from "moment"

  export default {
    name: "transaction",
    components: {
    },
    data () {
      return {
        txhash: '',
        noData: false,
        haveData: false,
        // txinfo: {},
        // BlockHeight: '',
        // Time: '',
        // txTable:{}
      }
    },
    computed: {
      vinlen() {
        var result = this.$store.state.transaction.txinfo;
        var count = 0;
        if (result.vin) {
          result.vin.forEach((item, index) => {
            if (item.addr || item.coinbase) {
              count ++
            }
          });
        }
        return count
      },
      voutlen() {
        var result = this.$store.state.transaction.txinfo;
        var count = 0;
        if (result.vout) {
          result.vout.forEach((item, index) => {
            // if (item.scriptPubKey.addresses) {
              count ++
            // }
          });
        }
        return count
      },
      txinfo() {
        return this.$store.state.transaction.txinfo;
      },
      total() {
        return this.$store.state.transaction.total;
      },
    },
    filters: {
      dataFrm: function(el) {
        return moment(el).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    created () {
      this.txhash = this.$route.query.param;

      if (this.$route.query.from) {

        // console.log('trans search')
        this.noData = false;
        this.haveData = true;
        // console.log(this.txinfo.hash);
        if (this.txinfo.hash) {
          // console.log('8888')
          // console.log(this.txinfo)
        }else{
          // console.log('9999')
          // console.log(this.txinfo);
          this.getTransactionData('search3', {'param': this.txhash});
        }
        
      }else{
        // console.log("直接请求")
        this.getTransactionData('gettxinfo', {'param': this.txhash});
      }
      
    },
    mounted () {

    },
    methods: {
      getTransactionData(type, getData) {
        var _this = this;
        $.getJSON(config.api.dev + type, getData , function(data,status){

          // console.log(data.result)

          if (data.error) {
            // console.log("222222")
            _this.$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000);
            _this.noData = true;
            _this.haveData = false;

          }else{
            // console.log('33333333')
            _this.$store.commit('gettransactionData', data);
            _this.noData = false;
            _this.haveData = true;

          }
        });
      }
    },
    watch: {
      '$route' (to, from) {
        if (this.txinfo.hash && from.meta == to.meta && this.txinfo.hash != to.query.param) {
          // console.log('houtui');
          this.getTransactionData('gettxinfo', {'param': to.query.param});
        }
      }
    }
  }
</script>