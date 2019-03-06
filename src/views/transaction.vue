<style lang="less" scoped>
  @import "../styles/common.css";
  .Transaction{
    margin-bottom: 60px;
    a {
      &:hover {
				text-decoration:underline
			}
		}
  }
</style>

<template>
  <div class="Transaction">

    <loader v-if="loading"></loader>

    <div class="container" v-if="!loading">
      <div class="info mb40">
        <h2 class="pt25">Transaction&nbsp;&nbsp;&nbsp;</h2>
        <p class="ellipsis" :title="txinfo.txid"><strong>Transaction ID: </strong>{{txinfo.txid}}</p>
      </div>

      <div class="summary mb40">
        <h2>Summary</h2>
        <Row>
          <Col span="12" class="ellipsis">Time:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{ txinfo.time ? txinfo.time : '' }}</Col>
        </Row>
        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Number of inputs:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{vinlen}}</Col>
        </Row>
        
        <Row>
          <Col span="12" class="ellipsis">Number of outputs:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{voutlen}}</Col>
        </Row>

        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Size:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{txinfo.size ? txinfo.size : 0 }}</Col>
        </Row>

        <Row>
          <Col span="12" class="ellipsis">Total in:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{total.totalin ? total.totalin : 0 }}</Col>
        </Row>

        <Row class="backgroundColor">
          <Col span="12" class="ellipsis">Total out:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{total.totalout ? total.totalout : 0 }}</Col>
        </Row>

        <Row>
          <Col span="12" class="ellipsis">Status:</Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{txinfo.confirmations ? 'Confirmed' : 'Unconfirmed' }}</Col>
        </Row>
      </div>

      <div class="transactions mb40">
        <h2>Details</h2>
        <!-- <Row class="alert-warning" v-if="noData">
          There are no transaction.
        </Row> -->
        <div class="transaction">
          <Row class="transactionTitle">
            <Col span="24" class="ellipsis">
              <span class="ellipsis" :title="txinfo.txid">{{txinfo.txid}}</span>
            </Col>
          </Row>

          <Row style="margin: 10px 0 20px 0">
            <Col :xs="24" :md="11" style="min-height:40px">
              <Row v-if="item.coinbase" v-for="item in txinfo.vin" :key="JSON.stringify(item)" :DATA="JSON.stringify(item)" class="panel">
                <Col span="24">CoinBase</Col>
              </Row>
              <Row v-if="item.addr" v-for="item in txinfo.vin" :key="JSON.stringify(item)" :DATA="JSON.stringify(item)" class="panel">
                <Col :data="item.addr" span="18" class="ellipsis">
                  <router-link v-if="item.addr != byAddr" :data="item.addr" :to="{path:'/addrinfo',query: {param: item.addr}}" :title="item.addr">{{item.addr}}</router-link>
                  <span v-if="item.addr == byAddr">{{item.addr}}</span>
                </Col>
                <Col span="6" style="text-align: right;" class="ellipsis" :title="item.value">{{item.value}}</Col>
              </Row>
              
            </Col>

            <Col :xs="0" :md="2" style="text-align: center;">
              <Row class="panel" style="margin:5px 0">
                <div><Icon type="arrow-right-a"></Icon></div>
              </Row>
            </Col>
            <Col :xs="24" :md="0" style="text-align: center;">
              <Row class="panel" style="margin:5px 0">
                <div><Icon type="arrow-down-a"></Icon></div>
              </Row>
            </Col>

            <Col :xs="24" :md="11" style="min-height:40px">
              <Row v-for="item in txinfo.vout" :key="item.addr" class="panel">
                <Col span="18" class="ellipsis" v-if="!item.scriptPubKey.addresses">
                  Unknown
                </Col>
                <Col span="18" class="ellipsis" v-if="item.scriptPubKey.addresses">
                  <router-link v-if="item.scriptPubKey.addresses[0] != byAddr" :to="{path:'/addrinfo',query: {param: item.scriptPubKey.addresses[0]}}" class="ellipsis" :title="item.scriptPubKey.addresses[0]">{{item.scriptPubKey.addresses[0]}}</router-link>
                  <span v-if="item.scriptPubKey.addresses[0] == byAddr">{{item.scriptPubKey.addresses[0]}}</span>
                </Col>
                <Col span="6" style="text-align: right;" class="ellipsis" :title="item.value">{{item.value}}</Col>
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
  import Loader from "./loader.vue";
  import moment from "moment"

  export default {
    name: "transaction",
    components: {
      Loader
    },
    data () {
      return {
        txhash: '',
        byAddr: '',
        noData: false,
        haveData: false,
        // txinfo: {},
        // BlockHeight: '',
        // Time: '',
        // txTable:{}
      }
    },
    computed: {
      loading() {
        return this.$store.state.transaction.loading;
      },
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
      this.byAddr = this.$route.query.byAddr;

      if (this.$route.query.from) {
        this.noData = false;
        this.haveData = true;
        if (this.txinfo.txid) {
          
        }else{
          this.getTransactionData('search3', {'param': this.txhash});
        }
      }else{
        this.getTransactionData('gettxinfo', {'param': this.txhash});
      }
      
    },
    mounted () {

    },
    methods: {
      getTransactionData(type, getData) {
        var _this = this;
        $.getJSON(config.api.dev + type, getData , function(data,status){

          if (data.error) {
            _this.$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000);
            _this.$router.push({path: '/'});
            _this.noData = true;
            _this.haveData = false;

          }else{
            _this.$store.commit('gettransactionData', data);
            _this.noData = false;
            _this.haveData = true;

          }
        });
      }
    },
    watch: {
      '$route' (to, from) {
        if (this.txinfo.txid && from.meta == to.meta && this.txinfo.txid != to.query.param) {
          this.getTransactionData('gettxinfo', {'param': to.query.param});
        }
      }
    }
  }
</script>