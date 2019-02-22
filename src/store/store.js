import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment"


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
    error: {
      errorShow: false,
      Message: 'Error'
    },
    screen: {
      screenWidth: document.body.clientWidth
    },
    totallbtc: {
      height: 0,
      total: 0
    },
    index: {
      flag : 1,
      loading: true,
      LatestBlocks: [],
      LatestTransactions: []
    },
    //block info
    block: {
      blockinfo: {},
      blockTable: {},
      loading: true,
      totalpage: 0
    },
    //blocks
    blocks: [],
    //address
    address: {
      addrinfo: {},
      addrTable: [],
      loading: true,
      totalpage: 0
    },
    //transction info
    transaction: {
      txinfo: {},
      loading: true,
      total: {
        totalin : 0,
        totalout : 0
      }
    },
    //address1
    address1: {
      getaddressbalance:{},
      loading: true,
    },
    //Voters
    voters:{},
    //Votes
    votes:{}

	},
	getters: {

  },
  actions: {

  },
	mutations: {
    //错误信息
    errorMessage(state, data) {
      state.error.errorShow = data.status;
      state.error.Message = data.msg;
    },

    //例子 计数
    addCount(state, data) {
			state.index.flag = data + 1
    },

    //屏幕大小
    screenSize(state, data) {
      state.screen.screenWidth = data;
    },

    //index 数据
    getindexData(state, data) {
      var LatestTransactions = [];
      var result = [];
      // console.log(result)
      data.forEach(( item, index) => {
        item.result.time = moment(item.result.time*1000).format("YYYY-MM-DD HH:mm:ss");
        item.result.txs = item.result.tx.length
        // this.$set(item.result, 'txs', item.result.tx.length);
        result.push(item.result);
        if (item.result.tx) {
          item.result.tx.forEach(( item1, index) => {
            var transItem = {};
            transItem.txhash = item1;
            transItem.time = item.result.time;
            LatestTransactions.push(transItem);
          });
        };
      });
      // console.log(result);
      // console.log(LatestTransactions);
      state.index.LatestBlocks = result;
      state.index.LatestTransactions = LatestTransactions;
      state.index.loading = false
    },

    gettotallbtc(state, data) {
      state.totallbtc.height = data.height;
      state.totallbtc.total = data.total;
    },

    //blocks
    getblocksData(state, data) {
      data.forEach(( item, index) => {
        item.result.time = moment(item.result.time*1000).format("YYYY-MM-DD HH:mm:ss");
      });
      state.blocks = data;
    },

    //block 数据
    getblockData(state, data) {
      var result = data[0].result
      result.time = moment(result.time*1000).format("YYYY-MM-DD HH:mm:ss");
      state.block.blockinfo = result
      state.block.blockTable = data[1]
      state.block.totalpage = Math.ceil(result.tx.length/20)
      state.block.loading = false
    },

    //transaction 数据
    gettransactionData(state, data) {
      var totalin = 0;
      var totalout = 0;
      if (data.result.time) {
        data.result.time = moment(data.result.time*1000).format("YYYY-MM-DD HH:mm:ss");
      }
      data.result.vin.forEach((item, index) => {
        if (item.value) {
          totalin = totalin + item.value * 100000000;
        }
      });
      data.result.vout.forEach((item, index) => {
        if (item.value) {
          totalout = totalout + item.value * 100000000;
        }
      });
      state.transaction.txinfo = data.result
      state.transaction.total.totalin = totalin / 100000000;
      state.transaction.total.totalout = totalout / 100000000;
      state.transaction.loading = false
    },

    //address 数据
    getaddressData(state, data) {
      state.address.addrinfo = data.addrinfo
      state.address.addrTable = data.addrTable
      state.address.totalpage = data.totalpage
      state.address.loading = false
    },

    //addres simple 数据
    getaddress1data(state, data) {
      state.address1.getaddressbalance = data
      state.address1.loading = false
    },

    //Voters
    getvoters(state, data) {
      state.voters = data.result
    },
    //Votes
    getvotes(state, data) {
      state.votes = data.result
    }

	}
})

export default store