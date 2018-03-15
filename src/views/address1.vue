<style lang="less" scoped>
  @import "../styles/common.css";
  .address{
    // width: 1170px;
		margin: 100px 0 80px 0;
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
        margin: 2px 0;
        float: left;
        .point{
          margin: 0 1px;
          font-size: 22px;
          height: 16px;
          line-height: 16px;
          position: relative;
          bottom: -4px;
          left: -2px;
        }
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
    .Icon{
      display: inline-block;
    }
  }
</style>

<template>
  <div class="address">
    <div class="container">
      <!-- <h2>Address&nbsp;&nbsp;{{msg}}</h2> -->
      <h2>Address</h2>
      <Row :gutter="20" style="min-height:190px;">
        <Col :xs="24" :sm="24" :md="20" :lg="20" style="height:100%;padding-top:12px;padding-bottom:12px;">
          <Row>
            <div class="address-border">
              <p><strong>Address: </strong>{{address}}</p>
            </div>
          </Row>
          <Row>
            <div class="address-border" style="margin-top:10px">
              <p><strong>Balance: </strong>{{ getaddressbalance.result ? getaddressbalance.result / 100000000 : 0}}</p>
            </div>
          </Row>
        </Col>
        <Col :xs="24" :sm="24" :md="4" :lg="4" style="height:100%;text-align:center">
          <img :src="'http://qr.liantu.com/api.php?text=' + address" alt="" srcset="" style="max-width:180px">
        </Col>
      </Row>

      <div class="Votes-content" v-if="Votes.length <= 0">
        <h2 style="cursor:pointer;">
          <div class="Icon">
            <small><Icon type="minus-round"></Icon></small>
          </div>
          Votes
          <span>{{Votes.length}}</span>
        </h2>
      </div>

      <div class="Votes-content" v-if="Votes.length > 0">
        <h2 @click="VotesStatus = !VotesStatus" style="cursor:pointer;">
          <div class="Icon">
            <small v-if="!VotesStatus"><Icon type="plus-round"></Icon></small>
            <small v-if="VotesStatus"><Icon type="minus-round"></Icon></small>
          </div>
          Votes
          <span>{{Votes.length}}</span>
        </h2>
        <div class="tag-container" v-if="VotesStatus">
          <div class="tag-block" v-for="(item, index) in Votes">
            <span v-if="item.address == getaddressbalance.addr">{{item.name ? item.name : item.address}}</span>
            <router-link v-if="item.address != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.address}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
            <span class="point" v-if="index != (Votes.length - 1)">·</span>
          </div>
        </div>
      </div>

      <div class="Voters-content" v-if="Voters.length <= 0" style="margin-top: 40px;">
        <h2 style="cursor:pointer;">
          <div class="Icon">
            <small><Icon type="minus-round"></Icon></small>
          </div>
          Voters
          <span>{{Voters.length}}</span>
        </h2>
      </div>

      <div class="Voters-content" v-if="Voters.length > 0" style="margin-top: 40px;">
        <h2 @click="VotersStatus = !VotersStatus" style="cursor:pointer;">
          <div class="Icon">
            <small v-if="!VotersStatus"><Icon type="plus-round"></Icon></small>
            <small v-if="VotersStatus"><Icon type="minus-round"></Icon></small>
          </div>
          Voters
          <span>{{Voters.length}}</span>
        </h2>
        <div class="tag-container" v-if="VotersStatus">
          <div class="tag-block" v-for="(item, index) in Voters">
            <span v-if="item.address == getaddressbalance.addr">{{item.name ? item.name : item.address}}</span>
            <router-link  v-if="item.address != getaddressbalance.addr" :to="{path:'/addrinfo',query: {param: item.address}}" :key="item.address">{{item.name ? item.name : item.address}}</router-link>
            <span  class="point" v-if="index != (Voters.length - 1)">·</span>
          </div>
        </div>
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
        previousFullPath: '',
        page: 1,
        Delegate:'',
        Votes:[],
        Voters:[],
      }
    },
    computed: {
      getaddressbalance() {
        var result = this.$store.state.getaddressbalance;
        return result;
      },
    },
    created () {
      
      this.address = this.$route.query.param;
      if (this.$route.query.from ) {
        // console.log('search')
        var _this = this;
        this.loading = false;
        this.noData = false;
        this.haveData = true;
        if (this.getaddressbalance.result) {
          // console.log("1111111111")
          if (this.VotesStatus || this.VotersStatus) {
            this.VotesStatus = false;
            this.VotersStatus = false;
          }

          $.getJSON(config.api.dev + 'getlistdelegates', function (data, status) {

            $.getJSON(config.api.dev + 'getvotebyaddress', { 'param': _this.address }, function(data1,status1) {
              if (data1.error) {
                _this.Votes = [];
                return
              }else {
                if (data1.votes.length > 0) {
                  _this.Votes = [];
                  var arr = [];
                  data1.votes.forEach((item, index) => {
                    var obj = { address: '', name: ''};
                    obj.address = item;
                    for (let index = 0; index < data.length; index++) {
                      if (item == data[index].address) {
                        obj.name = data[index].name;
                        break;
                      }
                    }
                    arr.push(obj);
                  });
                  // console.log(arr);
                  _this.Votes = arr;
                }else{
                  _this.Votes = [];
                }
              }
            });
            $.getJSON(config.api.dev + 'getvotersbywitness', { 'param': _this.address }, function(data2,status2) {
              if (data2.error) {
                _this.Voters = [];
                return
              }else {
                if (data2.result.length > 0) {
                  _this.Voters = [];
                  var arr = [];
                  data2.result.forEach((item, index) => {
                    var obj = { address: '', name: ''};
                    obj.address = item;
                    for (let index = 0; index < data.length; index++) {
                      if (item == data[index].address) {
                        obj.name = data[index].name;
                        break;
                      }
                    }
                    arr.push(obj);
                  });
                  // console.log(arr);
                  _this.Voters = arr;
                  // console.log(_this.Voters)
                }else{
                  _this.Voters = [];
                }
              }
            });

          })

        }else{
          // console.log('222222')
          this.getTransinfo('search3', { 'param': this.address }, { 'param': this.address });
        }
      }else if (this.$route.query.fromdm) {
        // console.log('from delegate-monitor');
        this.getTransinfo('getaddressbalance', { 'param': this.address }, { 'param': this.address });
      }else {
        // console.log('address info')
        this.getTransinfo('getaddressbalance', { 'param': this.address }, { 'param': this.address });
      }

    },
    mounted () {

      
      
    },
    methods: {

      getTransinfo(type, getData, argu) {
        
        // this.$Loading.start();
        var _this = this;

        $.getJSON(config.api.dev + type, getData ,function(data,status){

          // console.log(data)

          if (data.error) {
            _this.loading = false;
            _this.noData = true;
            _this.haveData = false;
            _this.$store.commit('errorMessage', { status: true , msg: data.msg});
            setTimeout(() =>_this.$store.commit('errorMessage', { status: false , msg: ''}),3000)
          }else{
            _this.loading = false;
            _this.noData = false;
            _this.haveData = true;
            _this.$store.commit('getaddressbalance', data);
          }

        });

        if (this.VotesStatus || this.VotersStatus) {
          this.VotesStatus = false;
          this.VotersStatus = false;
        }

        $.getJSON(config.api.dev + 'getlistdelegates', function (data, status) {

          // console.log(data);
          
          $.getJSON(config.api.dev + 'getvotebyaddress', argu, function(data1,status1) {
            if (data1.error) {
              _this.Votes = [];
            }else {
              if (data1.votes.length > 0) {
                _this.Votes = [];
                var arr = [];
                data1.votes.forEach((item, index) => {
                  var obj = { address: '', name: ''};
                  obj.address = item;
                  for (let index = 0; index < data.length; index++) {
                    if (item == data[index].address) {
                      obj.name = data[index].name;
                      break;
                    }
                  }
                  arr.push(obj);
                });
                // console.log(arr);
                _this.Votes = arr;
              }else{
                _this.Votes = [];
              }
            }
          });
          
          $.getJSON(config.api.dev + 'getvotersbywitness', argu, function(data2,status2) {
  
            if (data2.error) {
              _this.Voters = [];
            }else {
              if (data2.result.length > 0) {
                _this.Voters = [];
                var arr = [];
                data2.result.forEach((item, index) => {
                  var obj = { address: '', name: ''};
                  obj.address = item;
                  for (let index = 0; index < data.length; index++) {
                    if (item == data[index].address) {
                      obj.name = data[index].name;
                      break;
                    }
                  }
                  arr.push(obj);
                });
                // console.log(arr);
                _this.Voters = arr;

              }else{
                _this.Voters = [];
              }
            }
          });
        })
      },

      nextPage() {
        if ( this.totalpage > 1 && this.page < this.totalpage ) {
          window.scrollTo(0, 60);
          this.page = this.page + 1;
          var _this = this;
          $.getJSON(config.api.dev + 'getaddressbalance', { 'addr': this.address, 'page': _this.page} ,function(data,status){
            
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
              _this.$store.commit('getaddressbalance', data);
            }

          })
        }else{
          return
        }
        
      },
      
      previousPage() {
        if (this.page > 1) {
          window.scrollTo(0, 60);
          this.page = this.page - 1;
          var _this = this;
          $.getJSON(config.api.dev + 'getaddressbalance', { 'addr': this.address, 'page': _this.page} ,function(data,status){
            
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
              _this.$store.commit('getaddressbalance', data);

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
        var _this = this;
        this.address = this.$route.query.param;

        if (this.getaddressbalance.addr && from.meta == to.meta && this.getaddressbalance.addr != to.query.param) {
          this.getTransinfo('getaddressbalance', { 'param': to.query.param }, { 'param': to.query.param });
          // console.log('houtui');
        }

        if (this.previousFullPath != from.fullPath && this.$route.query.from && this.getaddressbalance.addr == to.query.param ) {
          // console.log('watch search addr')
          if (this.VotesStatus || this.VotersStatus) {
            this.VotesStatus = false;
            this.VotersStatus = false;
          }
          $.getJSON(config.api.dev + 'getlistdelegates', function (data, status) {

            $.getJSON(config.api.dev + 'getvotebyaddress', { 'param': _this.address }, function(data1,status1) {
              if (data1.error) {
                _this.Votes = [];
                return
              }else {
                if (data1.votes.length > 0) {
                  _this.Votes = [];
                  var arr = [];
                  data1.votes.forEach((item, index) => {
                    var obj = { address: '', name: ''};
                    obj.address = item;
                    for (let index = 0; index < data.length; index++) {
                      if (item == data[index].address) {
                        obj.name = data[index].name;
                        break;
                      }
                    }
                    arr.push(obj);
                  });
                  // console.log(arr);
                  _this.Votes = arr;
                }else{
                  _this.Votes = [];
                }
              }
            });
            $.getJSON(config.api.dev + 'getvotersbywitness', { 'param': _this.address }, function(data2,status2) {
              if (data2.error) {
                _this.Voters = [];
                return
              }else {
                if (data2.result.length > 0) {
                  _this.Voters = [];
                  var arr = [];
                  data2.result.forEach((item, index) => {
                    var obj = { address: '', name: ''};
                    obj.address = item;
                    for (let index = 0; index < data.length; index++) {
                      if (item == data[index].address) {
                        obj.name = data[index].name;
                        break;
                      }
                    }
                    arr.push(obj);
                  });
                  // console.log(arr);
                  _this.Voters = arr;
                  // console.log(_this.Voters)
                }else{
                  _this.Voters = [];
                }
              }
            });

          })
        }
        this.previousFullPath = from.fullPath;
      }
    }
  }
</script>