<style lang="less" scoped>
@import "../styles/common.css";
.nav {
  z-index: 100;
  height: 80px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #3d3d3d;
  .container {
    // width: 1170px;
    height: 80px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    .logo {
      height: 80px;
      width: 240px;
      padding: 5px;
      float: left;
      img {
        height: 100%;
      }
    }
    .search {
      position: relative;
      float: left;
      border-color: #e7e7e7;
      margin-top: 23px;
      margin-left: 15px;
      .message{
        position: absolute;
        top: 37px;
        // height: 36px;
        width: 300px;
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
        border-radius: 4px!important;
      }
      .ivu-spin-fix .ivu-spin-main {
        top: 53%!important;
        left: 94%!important;
      }
    }
    .status {
      float: left;
      background-color: #585858;
      border-radius: 3px;
      margin-left: 10px;
      margin-top: 12px;
      min-width: 330px;
      min-height: 29px;
      font-size: 12px;
      color: #eee;
      text-align: center;
      padding-top: 10px;
      p {
        margin: 0 0 10px;
      }
    }
    .button-nav {
      display: none;
    }
    .dropdown-nav{
      position: absolute;
      right: 0;
      top: 0;
    }
    .dropdown-a {
      display: inline-block;
      color: #fff;
      height: 80px;
      line-height: 80px;
      width: 80px;
      font-size: 16px;
      text-align: center;
      &:hover {
        background-color: #585858;
      }
    }
  }
  .ivu-dropdown-item{
    font-size: 14px!important;
  }
}

</style>

<template>
  <div class="nav">
    <!-- <div class="wrap-outer"> -->

      <div class="container">
        <div class="header-nav">
          <router-link  class="logo" :to="{ path: '/' }"><img src="../images/logo.png" alt="" srcset=""></router-link>
          <div class="search" v-if="screenWidth > 700">
            <Input id="search-form" :disabled="enterStatus" v-model="searchText" class="search-form" size="large" placeholder="Find a block, transaction, address or delegate" style="width: 300px" @on-enter="searchTextEnter()"></Input>
            <div class="message" v-if="errorShow">
              {{Message}}
            </div>
            <Spin fix v-if="searchLoading">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
          </div>

          <!-- <div class="status" v-if="screenWidth > 1200 ">
            <span>Height: 893317</span><span>· Supply: 104,466,530</span><span>· Nethash: Mainnet</span>
            <p>OXY/BTC: 0.00001167 · OXY/USD: 0.2022</p>
          </div> -->

          <div class="dropdown-nav">

            <Dropdown trigger="click" @on-click='onchang($event)' placement="bottom-end">
              <a href="javascript:void(0)" class="dropdown-a">
                Tools
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list" on-click='onchang($event)'>
                <DropdownItem name='/'>Block Explorer</DropdownItem>
                <DropdownItem name='/delegateMonitor'>Delegate Monitor</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>
        </div>
      </div>
      <BackTop :bottom="50"></BackTop>
    <!-- </div> -->
  </div>

    
</template>

<script>
  import config from "../config/config";

  export default {
    name: 'HeaderNav',
    components: {},
    computed: {
        errorShow() {
          return this.$store.state.error.errorShow
        },
        Message() {
          return this.$store.state.error.Message
        }
    },
    data() {
      return {
        screenWidth: document.body.clientWidth,
        searchText: '',
        flag: true,
        searchLoading: false,
        enterStatus: false
      }
    },
    created() {

      //监控窗口大小
      const that = this
      window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
            this.$store.commit('screenSize', that.screenWidth);
        })()
      }
      
    },
    mounted() {

    },
    methods: {
      onchang(e) {
        this.$router.push({path:e})
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

      screenWidth (val) {
          if (!this.timer) {
              this.screenWidth = val;
              this.timer = true
              let that = this
              setTimeout(function () {
                  that.timer = false
              }, 400)
          }
      }
      
    }
  };
</script>
